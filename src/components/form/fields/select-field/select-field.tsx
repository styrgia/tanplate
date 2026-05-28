'use client'

import type { ComponentProps, ReactNode } from 'react'

import * as Select from '#/components/ui/select'
import { cn } from '#/components/ui/shared/classes'
import { useFieldContext } from '../../form-context'
import { FieldShell, type FieldShellProps } from '../shared'

type SelectRootProps = ComponentProps<typeof Select.Root>

export type SelectFieldProps = FieldShellProps &
    Omit<
        SelectRootProps,
        'children' | 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'
    > & {
        children: ReactNode
        placeholder?: ReactNode
        triggerClassName?: ComponentProps<typeof Select.Trigger>['className']
    }

export function SelectField({
    children,
    className,
    description,
    label,
    onOpenChange,
    placeholder,
    triggerClassName,
    ...selectProps
}: SelectFieldProps) {
    const field = useFieldContext<unknown>()

    return (
        <FieldShell
            className={className}
            description={description}
            field={field}
            label={label}
            nativeLabel={false}
        >
            <Select.Root
                {...selectProps}
                name={field.name}
                onOpenChange={(open, eventDetails) => {
                    onOpenChange?.(open, eventDetails)

                    if (!open) {
                        field.handleBlur()
                    }
                }}
                onValueChange={(value) => field.handleChange(value)}
                value={field.state.value}
            >
                <Select.Trigger className={cn('w-full', triggerClassName)}>
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon />
                </Select.Trigger>
                <Select.Portal>
                    <Select.Positioner>
                        <Select.Popup>
                            <Select.ScrollUpArrow />
                            <Select.List>{children}</Select.List>
                            <Select.ScrollDownArrow />
                        </Select.Popup>
                    </Select.Positioner>
                </Select.Portal>
            </Select.Root>
        </FieldShell>
    )
}
