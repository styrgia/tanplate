'use client'

import type { ComponentProps, ReactNode } from 'react'

import * as Slider from '#/components/ui/slider'
import { cn } from '#/components/ui/shared/classes'
import { useFieldContext } from '../../form-context'
import { asSliderValue, defaultSliderValueLabel, FieldShell, type FieldShellProps } from '../shared'

type SliderRootProps = ComponentProps<typeof Slider.Root>

export type SliderFieldProps = FieldShellProps &
    Omit<
        SliderRootProps,
        'children' | 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'
    > & {
        formatValue?: (value: number | readonly number[]) => ReactNode
        showValue?: boolean
        sliderClassName?: SliderRootProps['className']
        thumbLabel?: string
    }

export function SliderField({
    className,
    description,
    formatValue = defaultSliderValueLabel,
    label,
    onValueCommitted,
    showValue = true,
    sliderClassName,
    thumbLabel,
    ...sliderProps
}: SliderFieldProps) {
    const field = useFieldContext<unknown>()
    const value = asSliderValue(field.state.value)
    const thumbValues = Array.isArray(value) ? value : [value]

    return (
        <FieldShell className={className} description={description} field={field} label={label}>
            <Slider.Root
                {...sliderProps}
                className={cn('w-full', sliderClassName)}
                name={field.name}
                onValueChange={(nextValue) => field.handleChange(nextValue)}
                onValueCommitted={(nextValue, eventDetails) => {
                    onValueCommitted?.(nextValue, eventDetails)
                    field.handleBlur()
                }}
                value={value}
            >
                {showValue ? (
                    <Slider.Value>
                        {(_formattedValues, values) =>
                            formatValue(Array.isArray(value) ? values : (values.at(0) ?? value))
                        }
                    </Slider.Value>
                ) : null}
                <Slider.Control>
                    <Slider.Track>
                        <Slider.Indicator />
                        {thumbValues.map((thumbValue, index) => (
                            <Slider.Thumb
                                aria-label={thumbLabel ?? String(label)}
                                index={index}
                                key={String(thumbValue)}
                            />
                        ))}
                    </Slider.Track>
                </Slider.Control>
            </Slider.Root>
        </FieldShell>
    )
}
