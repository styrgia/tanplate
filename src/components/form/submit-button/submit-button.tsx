'use client'

import type { ComponentProps } from 'react'

import * as Button from '#/components/ui/button'
import { useFormContext } from '../form-context'

export type SubmitButtonProps = Omit<ComponentProps<typeof Button.Button>, 'type'> & {
    disableUntilValid?: boolean
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
