import { forwardRef, type ComponentRef } from 'react'
import { Image as UnpicImage, type ImageProps as UnpicImageProps } from '@unpic/react'

import { cn } from '../ui/shared/classes'

const defaultImageFallback = 'ipx' satisfies NonNullable<UnpicImageProps['fallback']>
const defaultImageOperations = {
    ipx: {
        q: 85,
        f: 'webp',
    },
} satisfies NonNullable<UnpicImageProps['operations']>

export type ImageProps = UnpicImageProps

export const Image = forwardRef<ComponentRef<typeof UnpicImage>, ImageProps>(
    ({ className, fallback = defaultImageFallback, operations, ...props }, ref) => (
        <UnpicImage
            className={cn('block', className)}
            fallback={fallback}
            operations={{
                ...defaultImageOperations,
                ...operations,
                ipx: {
                    ...defaultImageOperations.ipx,
                    ...operations?.ipx,
                },
            }}
            ref={ref}
            {...props}
        />
    ),
)

Image.displayName = 'Image'
