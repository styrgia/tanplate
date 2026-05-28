import { forwardRef, type ComponentRef } from 'react'
import { Image as UnpicImage, type ImageProps as UnpicImageProps } from '@unpic/react'
import { cva } from 'class-variance-authority'

import { cn } from '../ui/shared/classes'

const imageVariants = cva('block')

export type ImageProps = UnpicImageProps

export const Image = forwardRef<ComponentRef<typeof UnpicImage>, ImageProps>(
    ({ className, ...props }, ref) => (
        <UnpicImage className={cn(imageVariants(), className)} ref={ref} {...props} />
    ),
)

Image.displayName = 'Image'
