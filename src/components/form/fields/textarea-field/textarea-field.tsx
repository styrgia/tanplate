'use client'

import type { ComponentProps } from 'react'

import * as Textarea from '#/components/ui/textarea'
import { useFieldContext } from '../../form-context'
import { fieldValueAsString, FieldShell, type FieldShellProps, handleFieldBlur } from '../shared'

type TextareaControlProps = ComponentProps<typeof Textarea.Textarea>

export type TextareaFieldProps = FieldShellProps &
    Omit<
        TextareaControlProps,
        'className' | 'defaultValue' | 'name' | 'onValueChange' | 'render' | 'value'
    > & {
        controlClassName?: TextareaControlProps['className']
    }

export function TextareaField({
    className,
    controlClassName,
    description,
    label,
    onBlur,
    ...controlProps
}: TextareaFieldProps) {
    const field = useFieldContext<unknown>()
    const ariaLabel = typeof label === 'string' ? label : field.name

    return (
        <FieldShell className={className} description={description} field={field} label={label}>
            <Textarea.Textarea
                {...controlProps}
                aria-label={ariaLabel}
                className={controlClassName}
                name={field.name}
                onBlur={(event) => handleFieldBlur(field, onBlur, event)}
                onValueChange={(value) => field.handleChange(value)}
                value={fieldValueAsString(field.state.value)}
            />
        </FieldShell>
    )
}
