import { QueryClient } from '@tanstack/react-query'
import { afterEach, expect, test, vi } from 'vitest'

import { getCatalogProduct, listCatalogProducts } from './generated/catalog/clients'
import { getCatalogProductQueryKey, getCatalogProductQueryOptions } from './generated/catalog/query'
import { createOrder } from './generated/orders/clients'
import { ParseError } from './generated/catalog/.kubb/standardSchema'

const product = { productId: 'starter-kit', name: 'Starter Kit', priceCents: 4900, inStock: true }
const baseURL = 'https://api.example.test'

afterEach(() => vi.unstubAllGlobals())

test('serializes path parameters and preserves the native response', async () => {
    const response = Response.json({ data: product })
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(response)
    vi.stubGlobal('fetch', fetch)

    const result = await getCatalogProduct({ path: { productId: 'starter kit' }, baseURL })

    const request = fetch.mock.calls[0]?.[0]
    expect(request).toBeInstanceOf(Request)
    if (!(request instanceof Request)) throw new Error('Expected a native Fetch request')
    expect(request.url).toBe(`${baseURL}/api/catalog/products/starter%20kit`)
    expect(result.data).toEqual({ data: product })
    expect(result.response).toBe(response)
})

test('rejects an invalid response body', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(Response.json({ data: [{ name: 'Incomplete' }] })),
    )

    await expect(listCatalogProducts({ baseURL })).rejects.toThrow(ParseError)
})

test('validates order requests before sending and serializes valid JSON', async () => {
    const order = {
        orderId: 'order-1',
        productId: product.productId,
        quantity: 2,
        status: 'PENDING',
    }
    const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValue(Response.json({ data: order }, { status: 201 }))
    vi.stubGlobal('fetch', fetch)

    await expect(
        createOrder({ body: { productId: product.productId, quantity: 0 }, baseURL }),
    ).rejects.toThrow('Validation failed')
    expect(fetch).not.toHaveBeenCalled()

    const body = { productId: product.productId, quantity: 2 }
    const result = await createOrder({ body, baseURL })

    expect(result.status).toBe(201)
    expect(result.data).toEqual({ data: order })
    const request = fetch.mock.calls[0]?.[0] as Request
    expect(request.method).toBe('POST')
    expect(await request.json()).toEqual(body)
})

test('returns documented HTTP errors and throws when requested', async () => {
    const error = { error: { code: 'NOT_FOUND', message: 'Product not found' } }
    vi.stubGlobal(
        'fetch',
        vi.fn().mockImplementation(async () => Response.json(error, { status: 404 })),
    )

    const result = await getCatalogProduct({ path: { productId: 'missing' }, baseURL })
    expect(result.status).toBe(404)
    expect(result.error).toEqual(error)
    await expect(
        getCatalogProduct({ path: { productId: 'missing' }, baseURL, throwOnError: true }),
    ).rejects.toThrow('failed with status 404')
})

test('query options keep path parameters distinct and propagate cancellation to Fetch', async () => {
    expect(getCatalogProductQueryKey({ path: { productId: 'one' } })).not.toEqual(
        getCatalogProductQueryKey({ path: { productId: 'two' } }),
    )
    let started: () => void
    const requestStarted = new Promise<void>((resolve) => {
        started = resolve
    })
    let request: Request | undefined
    vi.stubGlobal(
        'fetch',
        vi.fn().mockImplementation((input: Request) => {
            request = input
            started()
            return new Promise<Response>((_resolve, reject) => {
                input.signal.addEventListener('abort', () => reject(input.signal.reason), {
                    once: true,
                })
            })
        }),
    )
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const options = getCatalogProductQueryOptions({ path: { productId: 'one' } }, { baseURL })
    const result = queryClient.fetchQuery(options).catch((error: unknown) => error)

    try {
        await requestStarted
        await queryClient.cancelQueries({ queryKey: options.queryKey })
        await result
        expect(request?.signal.aborted).toBe(true)
    } finally {
        queryClient.clear()
    }
})
