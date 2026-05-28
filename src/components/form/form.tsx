'use client'

import { createFormHook } from '@tanstack/react-form'

import {
    CheckboxField,
    NumberField,
    RadioGroupField,
    SelectField,
    SliderField,
    SwitchField,
    TextareaField,
    TextField,
} from './fields'
import { fieldContext, formContext } from './form-context'
import { SubmitButton } from './submit-button'

const fieldComponents = {
    CheckboxField,
    NumberField,
    RadioGroupField,
    SelectField,
    SliderField,
    SwitchField,
    TextareaField,
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

export { fieldContext, formContext, useFieldContext, useFormContext } from './form-context'
export { formOptions } from '@tanstack/react-form'
export * from './fields'
export * from './submit-button'

export type {
    CheckboxFieldProps,
    FieldShellProps,
    NumberFieldProps,
    RadioGroupFieldProps,
    RadioOption,
    SelectFieldProps,
    SliderFieldProps,
    SwitchFieldProps,
    TextareaFieldProps,
    TextFieldProps,
} from './fields'
export type { SubmitButtonProps } from './submit-button'
