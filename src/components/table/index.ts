export { DataTable, type DataTableProps } from './data-table'
export * as Table from './table'
export { createColumnHelper, dataTableFeatures, type DataTableFeatures } from './features'
export type { PaginationState, RowData, SortingState } from '@tanstack/react-table'

import type {
    ColumnDef as TableColumnDef,
    Row as TableRow,
    RowData,
    Table as TableInstance,
} from '@tanstack/react-table'
import type { DataTableFeatures } from './features'

export type ColumnDef<TData extends RowData, TValue = unknown> = TableColumnDef<
    DataTableFeatures,
    TData,
    TValue
>
export type Row<TData extends RowData> = TableRow<DataTableFeatures, TData>
export type TanStackTable<TData extends RowData> = TableInstance<DataTableFeatures, TData>
