import { useId, useMemo, useState, type ReactNode } from 'react'
import {
    flexRender,
    useTable,
    type Header,
    type PaginationState,
    type RowData,
    type SortingState,
    type Table as TanStackTable,
    type TableOptions,
} from '@tanstack/react-table'
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
} from 'lucide-react'

import { cn } from '../ui/shared/classes'
import * as Table from './table'
import { dataTableFeatures, type DataTableFeatures } from './features'

export type DataTableProps<TData extends RowData> = {
    columns: TableOptions<DataTableFeatures, TData>['columns']
    data: TData[]
    caption?: ReactNode
    className?: string
    emptyMessage?: ReactNode
    enablePagination?: boolean
    enableSorting?: boolean
    getRowId?: TableOptions<DataTableFeatures, TData>['getRowId']
    initialPageSize?: number
    initialSorting?: SortingState
    pageSizeOptions?: readonly number[]
    tableClassName?: string
}

const defaultPageSizeOptions = [10, 20, 50] as const
const defaultInitialSorting: SortingState = []

export function DataTable<TData extends RowData>({
    caption,
    className,
    columns,
    data,
    emptyMessage = 'No results.',
    enablePagination = false,
    enableSorting = true,
    getRowId,
    initialPageSize = 10,
    initialSorting = defaultInitialSorting,
    pageSizeOptions = defaultPageSizeOptions,
    tableClassName,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>(initialSorting)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize,
    })
    const normalizedPageSizeOptions = useMemo(
        () => normalizePageSizeOptions(pageSizeOptions, pagination.pageSize),
        [pageSizeOptions, pagination.pageSize],
    )

    const table = useTable({
        features: dataTableFeatures,
        columns,
        data,
        enableSorting,
        manualPagination: !enablePagination,
        getRowId,
        manualSorting: !enableSorting,
        onPaginationChange: enablePagination ? setPagination : undefined,
        onSortingChange: enableSorting ? setSorting : undefined,
        state: {
            pagination,
            sorting,
        },
    })
    const rows = table.getRowModel().rows
    const visibleColumnCount = table.getAllLeafColumns().length

    return (
        <div className={cn('space-y-3', className)}>
            <Table.Container>
                <Table.Root className={tableClassName}>
                    {caption ? <Table.Caption>{caption}</Table.Caption> : null}
                    <Table.Header>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Table.Head
                                        key={header.id}
                                        aria-label={
                                            header.isPlaceholder
                                                ? undefined
                                                : getHeaderLabel(header)
                                        }
                                        aria-sort={getAriaSort(header)}
                                        colSpan={header.colSpan}
                                        scope={header.colSpan > 1 ? 'colgroup' : 'col'}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <DataTableHeader header={header} />
                                        )}
                                    </Table.Head>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {rows.length > 0 ? (
                            rows.map((row) => (
                                <Table.Row key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Table.Cell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell
                                    className="h-24 text-center text-zinc-500"
                                    colSpan={visibleColumnCount}
                                >
                                    {emptyMessage}
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            </Table.Container>
            {enablePagination ? (
                <DataTablePagination table={table} pageSizeOptions={normalizedPageSizeOptions} />
            ) : null}
        </div>
    )
}

function DataTableHeader<TData extends RowData, TValue>({
    header,
}: {
    header: Header<DataTableFeatures, TData, TValue>
}) {
    const canSort = header.column.getCanSort()
    const sorted = header.column.getIsSorted()
    const label = getHeaderLabel(header)

    if (!canSort) {
        return (
            <div className="flex min-h-6 items-center gap-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
        )
    }

    return (
        <button
            aria-label={getSortButtonLabel(label, sorted)}
            className="
              inline-flex min-h-6 w-full items-center justify-between gap-2
              rounded-sm text-left transition outline-none
              hover:text-zinc-950
              focus-visible:ring-2 focus-visible:ring-emerald-600
              focus-visible:ring-offset-2
            "
            onClick={header.column.getToggleSortingHandler()}
            type="button"
        >
            <span className="min-w-0 truncate">
                {flexRender(header.column.columnDef.header, header.getContext())}
            </span>
            <SortIcon direction={sorted} />
        </button>
    )
}

function DataTablePagination<TData extends RowData>({
    pageSizeOptions,
    table,
}: {
    pageSizeOptions: readonly number[]
    table: TanStackTable<DataTableFeatures, TData>
}) {
    const pageSizeId = useId()
    const pageCount = Math.max(table.getPageCount(), 1)
    const pagination = table.store.state.pagination
    const totalRows = table.getPrePaginatedRowModel().rows.length
    const pageRows = table.getRowModel().rows.length
    const firstRow = totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1
    const lastRow = totalRows === 0 ? 0 : firstRow + pageRows - 1

    return (
        <div
            aria-label="Table pagination"
            className="
              flex flex-col gap-3 text-sm text-zinc-600
              sm:flex-row sm:items-center sm:justify-between
            "
        >
            <div className="font-medium text-zinc-700">
                {firstRow}-{lastRow} of {totalRows}
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <label className="font-medium" htmlFor={pageSizeId}>
                    Rows
                </label>
                <select
                    className="
                      h-9 rounded-md border border-zinc-300 bg-white px-2
                      text-sm font-medium text-zinc-950 transition outline-none
                      hover:bg-zinc-50
                      focus-visible:ring-2 focus-visible:ring-emerald-600
                      focus-visible:ring-offset-2
                    "
                    id={pageSizeId}
                    onChange={(event) => table.setPageSize(Number(event.target.value))}
                    value={pagination.pageSize}
                >
                    {pageSizeOptions.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                <div aria-live="polite" className="min-w-24 text-center font-medium text-zinc-700">
                    Page {pagination.pageIndex + 1} of {pageCount}
                </div>
                <PaginationButton
                    disabled={!table.getCanPreviousPage()}
                    label="First page"
                    onClick={() => table.setPageIndex(0)}
                >
                    <ChevronsLeft aria-hidden="true" className="size-4" />
                </PaginationButton>
                <PaginationButton
                    disabled={!table.getCanPreviousPage()}
                    label="Previous page"
                    onClick={() => table.previousPage()}
                >
                    <ChevronLeft aria-hidden="true" className="size-4" />
                </PaginationButton>
                <PaginationButton
                    disabled={!table.getCanNextPage()}
                    label="Next page"
                    onClick={() => table.nextPage()}
                >
                    <ChevronRight aria-hidden="true" className="size-4" />
                </PaginationButton>
                <PaginationButton
                    disabled={!table.getCanNextPage()}
                    label="Last page"
                    onClick={() => table.setPageIndex(pageCount - 1)}
                >
                    <ChevronsRight aria-hidden="true" className="size-4" />
                </PaginationButton>
            </div>
        </div>
    )
}

function PaginationButton({
    children,
    disabled,
    label,
    onClick,
}: {
    children: ReactNode
    disabled: boolean
    label: string
    onClick: () => void
}) {
    return (
        <button
            aria-label={label}
            className="
              inline-flex size-9 items-center justify-center rounded-md border
              border-zinc-300 bg-white text-zinc-700 transition
              hover:bg-zinc-50
              focus-visible:ring-2 focus-visible:ring-emerald-600
              focus-visible:ring-offset-2 focus-visible:outline-none
              active:bg-zinc-100
              disabled:cursor-not-allowed disabled:bg-zinc-100
              disabled:text-zinc-400
            "
            disabled={disabled}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    )
}

function SortIcon({ direction }: { direction: false | 'asc' | 'desc' }) {
    const iconClassName = 'size-3.5 shrink-0'

    if (direction === 'asc') {
        return <ChevronUp aria-hidden="true" className={iconClassName} />
    }

    if (direction === 'desc') {
        return <ChevronDown aria-hidden="true" className={iconClassName} />
    }

    return <ChevronsUpDown aria-hidden="true" className={cn(iconClassName, `text-zinc-400`)} />
}

function getAriaSort<TData extends RowData, TValue>(
    header: Header<DataTableFeatures, TData, TValue>,
) {
    const sorted = header.column.getIsSorted()

    if (sorted === 'asc') {
        return 'ascending'
    }

    if (sorted === 'desc') {
        return 'descending'
    }

    return undefined
}

function getHeaderLabel<TData extends RowData, TValue>(
    header: Header<DataTableFeatures, TData, TValue>,
) {
    const headerDef = header.column.columnDef.header

    if (typeof headerDef === 'string') {
        return headerDef
    }

    return header.column.id
}

function getSortButtonLabel(label: string, direction: false | 'asc' | 'desc') {
    if (direction === 'asc') {
        return `Sort by ${label} descending`
    }

    if (direction === 'desc') {
        return `Clear ${label} sorting`
    }

    return `Sort by ${label} ascending`
}

function normalizePageSizeOptions(options: readonly number[], currentPageSize: number) {
    const pageSizes = [...new Set([...options, currentPageSize])].filter(
        (pageSize) => Number.isInteger(pageSize) && pageSize > 0,
    )

    return pageSizes.reduce<number[]>((sortedPageSizes, pageSize) => {
        const insertIndex = sortedPageSizes.findIndex((value) => pageSize < value)

        if (insertIndex === -1) {
            sortedPageSizes.push(pageSize)
            return sortedPageSizes
        }

        sortedPageSizes.splice(insertIndex, 0, pageSize)
        return sortedPageSizes
    }, [])
}
