import { Field as BaseField } from '@base-ui/react/field'

import * as Field from '../field'
import { composeClassName } from '../shared/classes'

const textareaClassName = `
  min-h-28 w-full resize-y rounded-md border border-zinc-300 bg-white px-3 py-2
  text-sm/6 text-zinc-950 transition outline-none
  placeholder:text-zinc-400
  focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100
  disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500
  data-disabled:cursor-not-allowed data-disabled:bg-zinc-100
  data-disabled:text-zinc-500
`

export const Textarea = ({
    'aria-label': ariaLabel,
    className,
    ...props
}: BaseField.Control.Props) => (
    <Field.Control
        aria-label={ariaLabel}
        className={composeClassName<BaseField.Control.State>(textareaClassName, className)}
        render={<textarea aria-label={ariaLabel} />}
        {...props}
    />
)
