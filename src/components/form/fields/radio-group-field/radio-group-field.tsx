'use client'

import type { ComponentProps, ReactNode } from 'react'

import * as Radio from '#/components/ui/radio'
import { cn } from '#/components/ui/shared/classes'
import { useFieldContext } from '../../form-context'
import { FieldShell, type FieldShellProps } from '../shared'

type RadioGroupProps = ComponentProps<typeof Radio.Group>

export type RadioOption = {
    description?: ReactNode
    disabled?: boolean
    label: ReactNode
    value: RadioGroupProps['value']
}

export type RadioGroupFieldProps = FieldShellProps &
    Omit<
        RadioGroupProps,
        'children' | 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'
    > & {
        groupClassName?: RadioGroupProps['className']
        optionClassName?: string
        options: readonly RadioOption[]
    }

export function RadioGroupField({
    className,
    description,
    groupClassName,
    label,
    optionClassName,
    options,
    ...groupProps
}: RadioGroupFieldProps) {
    const field = useFieldContext<unknown>()

    return (
        <FieldShell
            className={className}
            description={description}
            field={field}
            label={label}
            nativeLabel={false}
        >
            <Radio.Group
                {...groupProps}
                className={cn('flex-col items-stretch gap-2', groupClassName)}
                name={field.name}
                onValueChange={(value) => {
                    field.handleChange(value)
                    field.handleBlur()
                }}
                value={field.state.value}
            >
                {options.map((option) => (
                    <label
                        className={cn(
                            'flex cursor-pointer items-start gap-3 rounded-md border border-zinc-200 bg-white p-3 text-sm text-zinc-950 transition hover:bg-zinc-50 has-[[data-checked]]:border-zinc-950 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60',
                            optionClassName,
                        )}
                        key={String(option.value)}
                    >
                        <Radio.Root disabled={option.disabled} value={option.value}>
                            <Radio.Indicator />
                        </Radio.Root>
                        <span className="flex min-w-0 flex-col gap-1">
                            <span className="font-medium">{option.label}</span>
                            {option.description ? (
                                <span className="text-zinc-600">{option.description}</span>
                            ) : null}
                        </span>
                    </label>
                ))}
            </Radio.Group>
        </FieldShell>
    )
}
