'use client'

import type { ComponentProps } from 'react'

import * as Input from '#/components/ui/input'
import { useFieldContext } from '../../form-context'
import { FieldShell, type FieldShellProps } from '../shared'
import { handleFieldBlur } from '../shared'
import { fieldValueAsString } from '../shared'

type TextInputProps = ComponentProps<typeof Input.Input>

export type TextFieldProps = FieldShellProps &
    Omit<TextInputProps, 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'> & {
        controlClassName?: TextInputProps['className']
    }

export function TextField({
    className,
    controlClassName,
    description,
    label,
    onBlur,
    ...inputProps
}: TextFieldProps) {
    const field = useFieldContext<unknown>()

    return (
        <FieldShell className={className} description={description} field={field} label={label}>
            <Input.Input
                {...inputProps}
                className={controlClassName}
                name={field.name}
                onBlur={(event) => handleFieldBlur(field, onBlur, event)}
                onValueChange={(value) => field.handleChange(value)}
                value={fieldValueAsString(field.state.value)}
            />
        </FieldShell>
    )
}
