export const BASE_LOCALE = 'en'
export const DEFAULT_LOCALE = BASE_LOCALE
export const LOCALES = ['en', 'ru'] as const
export const LOCALE_COOKIE_NAME = 'PARAGLIDE_LOCALE'

export type AppLocale = (typeof LOCALES)[number]

export const LOCALE_LABELS = {
    en: 'English',
    ru: 'Русский',
} satisfies Record<AppLocale, string>

export function isAppLocale(value: string): value is AppLocale {
    return LOCALES.includes(value as AppLocale)
}
