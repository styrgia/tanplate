'use client'

import * as Input from '#/components/ui/input'
import { useFieldContext } from '../../form-context'
import { defaultNumberFormat, defaultNumberParse, FieldShell, handleFieldBlur } from '../shared'
import type { TextFieldProps } from '../text-field'

export type NumberFieldProps = Omit<TextFieldProps, 'type'> & {
    emptyValue?: unknown
    format?: (value: unknown) => string
    parse?: (value: string) => unknown
}

export function NumberField({
    className,
    controlClassName,
    description,
    emptyValue,
    format = defaultNumberFormat,
    label,
    onBlur,
    parse = defaultNumberParse,
    ...inputProps
}: NumberFieldProps) {
    const field = useFieldContext<unknown>()

    return (
        <FieldShell className={className} description={description} field={field} label={label}>
            <Input.Input
                {...inputProps}
                className={controlClassName}
                name={field.name}
                onBlur={(event) => handleFieldBlur(field, onBlur, event)}
                onValueChange={(value) =>
                    field.handleChange(value === '' ? emptyValue : parse(value))
                }
                type="number"
                value={format(field.state.value)}
            />
        </FieldShell>
    )
}
