import { expect, test } from 'vitest'

import {
    asSliderValue,
    defaultNumberFormat,
    defaultNumberParse,
    defaultSliderValueLabel,
    fieldValueAsString,
} from './field-values'

test('formats text field values from form state', () => {
    expect(fieldValueAsString('Apollo')).toBe('Apollo')
    expect(fieldValueAsString(42)).toBe('42')
    expect(fieldValueAsString(null)).toBe('')
    expect(fieldValueAsString(undefined)).toBe('')
    expect(fieldValueAsString({ value: 'ignored' })).toBe('')
})

test('formats and parses number field values', () => {
    expect(defaultNumberFormat(7)).toBe('7')
    expect(defaultNumberFormat(Number.NaN)).toBe('')
    expect(defaultNumberFormat(null)).toBe('')
    expect(defaultNumberParse('12')).toBe(12)
})

test('normalizes slider values and labels', () => {
    expect(asSliderValue(40)).toBe(40)
    expect(asSliderValue([20, 80])).toEqual([20, 80])
    expect(asSliderValue(['20', 80])).toBe(0)
    expect(asSliderValue(undefined)).toBe(0)
    expect(defaultSliderValueLabel(40)).toBe('40')
    expect(defaultSliderValueLabel([20, 80])).toBe('20 - 80')
})
