'use client'

import { createFormHook, createFormHookContexts, type AnyFieldApi } from '@tanstack/react-form'
import type { ComponentProps, ReactNode } from 'react'

import * as Button from '#/components/ui/button'
import * as Checkbox from '#/components/ui/checkbox'
import * as Field from '#/components/ui/field'
import * as Input from '#/components/ui/input'
import * as Radio from '#/components/ui/radio'
import * as Select from '#/components/ui/select'
import * as Slider from '#/components/ui/slider'
import * as Switch from '#/components/ui/switch'
import { cn } from '#/components/ui/shared/classes'

type FieldShellProps = {
    className?: ComponentProps<typeof Field.Root>['className']
    description?: ReactNode
    label: ReactNode
}

type TextInputProps = ComponentProps<typeof Input.Input>

type TextFieldProps = FieldShellProps &
    Omit<TextInputProps, 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'> & {
        controlClassName?: TextInputProps['className']
    }

type NumberFieldProps = Omit<TextFieldProps, 'type'> & {
    emptyValue?: unknown
    format?: (value: unknown) => string
    parse?: (value: string) => unknown
}

type CheckboxRootProps = ComponentProps<typeof Checkbox.Root>

type CheckboxFieldProps = FieldShellProps &
    Omit<
        CheckboxRootProps,
        'checked' | 'children' | 'className' | 'defaultChecked' | 'name' | 'onCheckedChange'
    > & {
        controlClassName?: CheckboxRootProps['className']
    }

type SwitchRootProps = ComponentProps<typeof Switch.Root>

type SwitchFieldProps = FieldShellProps &
    Omit<
        SwitchRootProps,
        'checked' | 'children' | 'className' | 'defaultChecked' | 'name' | 'onCheckedChange'
    > & {
        controlClassName?: SwitchRootProps['className']
    }

type SelectRootProps = ComponentProps<typeof Select.Root>

type SelectFieldProps = FieldShellProps &
    Omit<
        SelectRootProps,
        'children' | 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'
    > & {
        children: ReactNode
        placeholder?: ReactNode
        triggerClassName?: ComponentProps<typeof Select.Trigger>['className']
    }

type RadioGroupProps = ComponentProps<typeof Radio.Group>

type RadioOption = {
    description?: ReactNode
    disabled?: boolean
    label: ReactNode
    value: RadioGroupProps['value']
}

type RadioGroupFieldProps = FieldShellProps &
    Omit<
        RadioGroupProps,
        'children' | 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'
    > & {
        groupClassName?: RadioGroupProps['className']
        optionClassName?: string
        options: readonly RadioOption[]
    }

type SliderRootProps = ComponentProps<typeof Slider.Root>

type SliderFieldProps = FieldShellProps &
    Omit<
        SliderRootProps,
        'children' | 'className' | 'defaultValue' | 'name' | 'onValueChange' | 'value'
    > & {
        formatValue?: (value: number | readonly number[]) => ReactNode
        showValue?: boolean
        sliderClassName?: SliderRootProps['className']
        thumbLabel?: string
    }

type SubmitButtonProps = Omit<ComponentProps<typeof Button.Button>, 'type'> & {
    disableUntilValid?: boolean
}

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

function fieldErrorMessages(field: AnyFieldApi) {
    return field.state.meta.errors.flatMap(formatError)
}

function formatError(error: unknown): string[] {
    if (!error) {
        return []
    }

    if (Array.isArray(error)) {
        return error.flatMap(formatError)
    }

    if (typeof error === 'string') {
        return [error]
    }

    if (typeof error === 'number' || typeof error === 'boolean') {
        return [String(error)]
    }

    if (error instanceof Error) {
        return [error.message]
    }

    if (typeof error === 'object' && 'message' in error) {
        const message = error.message

        if (typeof message === 'string') {
            return [message]
        }
    }

    return []
}

function fieldValueAsString(value: unknown) {
    if (value === null || value === undefined) {
        return ''
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return String(value)
    }

    return ''
}

function defaultNumberFormat(value: unknown) {
    if (value === null || value === undefined) {
        return ''
    }

    if (typeof value === 'number' && Number.isNaN(value)) {
        return ''
    }

    return String(value)
}

function defaultNumberParse(value: string) {
    return Number(value)
}

function asSliderValue(value: unknown): number | readonly number[] {
    if (typeof value === 'number') {
        return value
    }

    if (Array.isArray(value) && value.every((item) => typeof item === 'number')) {
        return value
    }

    return 0
}

function defaultSliderValueLabel(value: number | readonly number[]) {
    return Array.isArray(value) ? value.join(' - ') : String(value)
}

function handleFieldBlur<TEvent>(
    field: AnyFieldApi,
    onBlur: ((event: TEvent) => void) | undefined,
    event: TEvent,
) {
    onBlur?.(event)
    field.handleBlur()
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

function FieldShell({
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

function ChoiceFieldShell({
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

export function SubmitButton({
    children = 'Submit',
    disabled,
    disableUntilValid = true,
    ...buttonProps
}: SubmitButtonProps) {
    const form = useFormContext()

    return (
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
                <Button.Button
                    {...buttonProps}
                    disabled={
                        Boolean(disabled) || isSubmitting || (disableUntilValid && !canSubmit)
                    }
                    type="submit"
                >
                    {children}
                </Button.Button>
            )}
        </form.Subscribe>
    )
}

const fieldComponents = {
    CheckboxField,
    NumberField,
    RadioGroupField,
    SelectField,
    SliderField,
    SwitchField,
    TextField,
}

const formComponents = {
    SubmitButton,
}

const appForm = createFormHook({
    fieldComponents,
    fieldContext,
    formComponents,
    formContext,
})

export const { extendForm, useAppForm, useTypedAppFormContext, withFieldGroup, withForm } = appForm

export { fieldContext, formContext, useFieldContext, useFormContext }
export { formOptions } from '@tanstack/react-form'

export type {
    CheckboxFieldProps,
    FieldShellProps,
    NumberFieldProps,
    RadioGroupFieldProps,
    RadioOption,
    SelectFieldProps,
    SliderFieldProps,
    SubmitButtonProps,
    SwitchFieldProps,
    TextFieldProps,
}
