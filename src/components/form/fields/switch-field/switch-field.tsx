'use client'

import type { ComponentProps } from 'react'

import * as Switch from '#/components/ui/switch'
import { useFieldContext } from '../../form-context'
import { ChoiceFieldShell, type FieldShellProps, handleFieldBlur } from '../shared'

type SwitchRootProps = ComponentProps<typeof Switch.Root>

export type SwitchFieldProps = FieldShellProps &
    Omit<
        SwitchRootProps,
        'checked' | 'children' | 'className' | 'defaultChecked' | 'name' | 'onCheckedChange'
    > & {
        controlClassName?: SwitchRootProps['className']
    }

export function SwitchField({
    className,
    controlClassName,
    description,
    label,
    onBlur,
    ...switchProps
}: SwitchFieldProps) {
    const field = useFieldContext<unknown>()

    return (
        <ChoiceFieldShell
            className={className}
            description={description}
            field={field}
            label={label}
        >
            <Switch.Root
                {...switchProps}
                checked={Boolean(field.state.value)}
                className={controlClassName}
                name={field.name}
                onBlur={(event) => handleFieldBlur(field, onBlur, event)}
                onCheckedChange={(checked) => field.handleChange(checked)}
            >
                <Switch.Thumb />
            </Switch.Root>
        </ChoiceFieldShell>
    )
}
