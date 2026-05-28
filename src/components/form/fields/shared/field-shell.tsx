import type { AnyFieldApi } from '@tanstack/react-form'
import type { ComponentProps, ReactNode } from 'react'

import * as Field from '#/components/ui/field'
import { cn } from '#/components/ui/shared/classes'

import { fieldErrorMessages } from './field-errors'

export type FieldShellProps = {
    className?: ComponentProps<typeof Field.Root>['className']
    description?: ReactNode
    label: ReactNode
}

function FieldMessages({ field }: { field: AnyFieldApi }) {
    const messages = fieldErrorMessages(field)

    if (messages.length === 0) {
        return null
    }

    return messages.map((message) => (
        <Field.Error key={message} match>
            {message}
        </Field.Error>
    ))
}

export function FieldShell({
    children,
    className,
    description,
    field,
    label,
    nativeLabel = true,
}: FieldShellProps & {
    children: ReactNode
    field: AnyFieldApi
    nativeLabel?: boolean
}) {
    const hasErrors = fieldErrorMessages(field).length > 0
    const labelElement = nativeLabel ? (
        <Field.Label>{label}</Field.Label>
    ) : (
        <Field.Label nativeLabel={false} render={<span />}>
            {label}
        </Field.Label>
    )

    return (
        <Field.Root
            className={className}
            dirty={field.state.meta.isDirty}
            invalid={hasErrors}
            name={field.name}
            touched={field.state.meta.isTouched}
        >
            {labelElement}
            {children}
            {description ? <Field.Description>{description}</Field.Description> : null}
            <FieldMessages field={field} />
        </Field.Root>
    )
}

export function ChoiceFieldShell({
    children,
    className,
    description,
    field,
    label,
}: FieldShellProps & {
    children: ReactNode
    field: AnyFieldApi
}) {
    const hasErrors = fieldErrorMessages(field).length > 0

    return (
        <Field.Root
            className={cn('gap-2', className)}
            dirty={field.state.meta.isDirty}
            invalid={hasErrors}
            name={field.name}
            touched={field.state.meta.isTouched}
        >
            <div className="flex items-start gap-3">
                {children}
                <div className="flex min-w-0 flex-col gap-1.5">
                    <Field.Label>{label}</Field.Label>
                    {description ? <Field.Description>{description}</Field.Description> : null}
                    <FieldMessages field={field} />
                </div>
            </div>
        </Field.Root>
    )
}
