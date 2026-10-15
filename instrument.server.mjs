import * as Sentry from '@sentry/tanstackstart-react'

const sentryDsn = import.meta.env?.VITE_SENTRY_DSN ?? process.env.VITE_SENTRY_DSN

if (sentryDsn) {
    Sentry.init({
        dsn: sentryDsn,
        // Sentry 11 collects request headers and user information by default.
        tracesSampleRate: 1,
        replaysSessionSampleRate: 1,
        replaysOnErrorSampleRate: 1,
    })
} else {
    console.warn('VITE_SENTRY_DSN is not defined. Sentry is not running.')
}
