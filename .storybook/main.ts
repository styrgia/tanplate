import type { StorybookConfig } from '@storybook/tanstack-react'

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-docs'],
    framework: '@storybook/tanstack-react',
}

export default config
