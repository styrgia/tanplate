import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { DataTable, createColumnHelper } from '.'

type Product = {
    id: string
    name: string
    stock: number
}

const columnHelper = createColumnHelper<Product>()

const columns = columnHelper.columns([
    columnHelper.accessor('name', {
        header: 'Product',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('stock', {
        header: 'Stock',
        cell: (info) => info.getValue(),
    }),
])

const products = [
    { id: 'coffee', name: 'Coffee', stock: 4 },
    { id: 'tea', name: 'Tea', stock: 12 },
    { id: 'cocoa', name: 'Cocoa', stock: 2 },
]

test('renders column headers and row values', async () => {
    const screen = await render(<DataTable columns={columns} data={products} />)

    await expect.element(screen.getByRole('columnheader', { name: /Product/ })).toBeVisible()
    await expect.element(screen.getByRole('columnheader', { name: /Stock/ })).toBeVisible()
    await expect.element(screen.getByRole('cell', { name: 'Coffee' })).toBeVisible()
    await expect.element(screen.getByRole('cell', { name: '12' })).toBeVisible()
})

test('sorts rows with TanStack Table sorting state', async () => {
    const screen = await render(<DataTable columns={columns} data={products} />)
    const productHeader = screen.getByRole('button', { name: /sort by product/i })

    await productHeader.click()

    const rows = screen.getByRole('row')

    await expect.element(rows.nth(1).getByRole('cell').first()).toHaveTextContent('Cocoa')
    await expect.element(rows.nth(2).getByRole('cell').first()).toHaveTextContent('Coffee')
    await expect.element(rows.nth(3).getByRole('cell').first()).toHaveTextContent('Tea')

    await productHeader.click()

    await expect.element(rows.nth(1).getByRole('cell').first()).toHaveTextContent('Tea')
    await expect.element(rows.nth(2).getByRole('cell').first()).toHaveTextContent('Coffee')
    await expect.element(rows.nth(3).getByRole('cell').first()).toHaveTextContent('Cocoa')
})

test('paginates rows when pagination is enabled', async () => {
    const screen = await render(
        <DataTable
            columns={columns}
            data={products}
            enablePagination
            initialPageSize={2}
            pageSizeOptions={[2, 3]}
        />,
    )

    await expect.element(screen.getByRole('cell', { name: 'Coffee' })).toBeVisible()
    await expect.element(screen.getByRole('cell', { name: 'Tea' })).toBeVisible()
    await expect.element(screen.getByText('1-2 of 3')).toBeVisible()
    await expect.element(screen.getByText('Page 1 of 2')).toBeVisible()

    await screen.getByRole('button', { name: 'Next page' }).click()

    await expect.element(screen.getByRole('cell', { name: 'Cocoa' })).toBeVisible()
    await expect.element(screen.getByText('3-3 of 3')).toBeVisible()
    await expect.element(screen.getByText('Page 2 of 2')).toBeVisible()
})

test('renders an empty state across all visible columns', async () => {
    const screen = await render(
        <DataTable columns={columns} data={[]} emptyMessage="No products found" />,
    )

    await expect.element(screen.getByRole('cell', { name: 'No products found' })).toBeVisible()
})
