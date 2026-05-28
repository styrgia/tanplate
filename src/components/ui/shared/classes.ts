import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...classes: ClassValue[]) {
    return twMerge(clsx(classes))
}

export function composeClassName<State>(
    baseClassName: string,
    className: ClassValue | ((state: State) => ClassValue) | undefined,
) {
    if (typeof className === 'function') {
        return (state: State) => cn(baseClassName, className(state))
    }

    return cn(baseClassName, className)
}
