import {
    columnVisibilityFeature,
    createColumnHelper as createTableColumnHelper,
    createPaginatedRowModel,
    createSortedRowModel,
    rowPaginationFeature,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_datetime,
    sortFn_text,
    tableFeatures,
    type RowData,
} from '@tanstack/react-table'

export const dataTableFeatures = tableFeatures({
    columnVisibilityFeature,
    rowSortingFeature,
    rowPaginationFeature,
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    sortFns: {
        alphanumeric: sortFn_alphanumeric,
        datetime: sortFn_datetime,
        text: sortFn_text,
    },
})

export type DataTableFeatures = typeof dataTableFeatures

export function createColumnHelper<TData extends RowData>() {
    return createTableColumnHelper<DataTableFeatures, TData>()
}
