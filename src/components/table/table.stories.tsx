import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { DataTable, createColumnHelper } from '.'

type Product = {
    id: string
    name: string
    category: string
    stock: number
    status: 'Active' | 'Draft' | 'Archived'
}

const products: Product[] = [
    { id: 'aurora', name: 'Aurora Kettle', category: 'Kitchen', stock: 18, status: 'Active' },
    { id: 'basalt', name: 'Basalt Mug', category: 'Kitchen', stock: 7, status: 'Draft' },
    { id: 'cirrus', name: 'Cirrus Lamp', category: 'Home', stock: 31, status: 'Active' },
    { id: 'dune', name: 'Dune Throw', category: 'Home', stock: 4, status: 'Archived' },
    { id: 'ember', name: 'Ember Desk', category: 'Office', stock: 11, status: 'Active' },
    { id: 'fjord', name: 'Fjord Chair', category: 'Office', stock: 23, status: 'Draft' },
]

const columnHelper = createColumnHelper<Product>()

const columns = [
    columnHelper.accessor('name', {
        header: 'Product',
        cell: (info) => <span className="font-medium text-zinc-950">{info.getValue()}</span>,
    }),
    columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('stock', {
        header: 'Stock',
        cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => info.getValue(),
    }),
]

const meta = {
    title: 'Components/Table/DataTable',
    tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => <DataTable columns={columns} data={products} />,
}

export const Paginated: Story = {
    render: () => (
        <DataTable
            columns={columns}
            data={products}
            enablePagination
            initialPageSize={3}
            pageSizeOptions={[3, 6]}
        />
    ),
}

export const Empty: Story = {
    render: () => <DataTable columns={columns} data={[]} emptyMessage="No products found" />,
}
