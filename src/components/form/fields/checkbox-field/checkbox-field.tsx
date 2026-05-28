'use client'

import type { ComponentProps } from 'react'

import * as Checkbox from '#/components/ui/checkbox'
import { useFieldContext } from '../../form-context'
import { ChoiceFieldShell, type FieldShellProps, handleFieldBlur } from '../shared'

type CheckboxRootProps = ComponentProps<typeof Checkbox.Root>

export type CheckboxFieldProps = FieldShellProps &
    Omit<
        CheckboxRootProps,
        'checked' | 'children' | 'className' | 'defaultChecked' | 'name' | 'onCheckedChange'
    > & {
        controlClassName?: CheckboxRootProps['className']
    }

export function CheckboxField({
    className,
    controlClassName,
    description,
    label,
    onBlur,
    ...checkboxProps
}: CheckboxFieldProps) {
    const field = useFieldContext<unknown>()

    return (
        <ChoiceFieldShell
            className={className}
            description={description}
            field={field}
            label={label}
        >
            <Checkbox.Root
                {...checkboxProps}
                checked={Boolean(field.state.value)}
                className={controlClassName}
                name={field.name}
                onBlur={(event) => handleFieldBlur(field, onBlur, event)}
                onCheckedChange={(checked) => field.handleChange(checked)}
            >
                <Checkbox.Indicator />
            </Checkbox.Root>
        </ChoiceFieldShell>
    )
}
