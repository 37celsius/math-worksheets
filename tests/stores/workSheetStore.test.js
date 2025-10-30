import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useWorksheetStore } from '@/stores/workSheetStore'
import { updateCounter } from '@/utils/counter'

const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
import { NUMBER_OF_PROBLEMS, MAX_NUMBER, PROBLEM_TYPE, OPERATIONS } from '@/constants'

describe('useWorksheetStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useWorksheetStore()
  })

  afterEach(() => {
    warnSpy.mockClear()
  })

  it('should initialize with default values', () => {
    expect(store.problems).toEqual([])
  })

  it('should reset numbers to default values', () => {
    store.defaultNumberOfProblems = 50
    store.maxNumber = 100

    store.resetNumber()

    expect(store.defaultNumberOfProblems).toBe(NUMBER_OF_PROBLEMS)
    expect(store.maxNumber).toBe(MAX_NUMBER)
  })

  it('should clear problems when operation changes', () => {
    store.problems = [
      {
        num1: 5,
        num2: 3,
        operator: '+',
        result: 8,
        isCorrect: false,
      },
    ]

    store.onOperationChange()

    expect(store.problems).toEqual([])
  })

  it('should return undefined title when no problems exist', () => {
    expect(store.worksheetTitle).toBeUndefined()
  })

  it('should generate correct title for addition', () => {
    store.generateProblems()

    expect(store.worksheetTitle).toMatch(/addition practice/i)
  })

  it('should generate correct title for subtraction', () => {
    store.selectedOperation = PROBLEM_TYPE.SUBTRACTION
    store.generateProblems()

    expect(store.worksheetTitle).toMatch(/subtraction practice/i)
  })

  it('should generate correct title for mix', () => {
    store.selectedOperation = PROBLEM_TYPE.MIX
    store.generateProblems()

    expect(store.worksheetTitle).toMatch(/mix practice/i)
  })

  it('should generate correct addition problems', () => {
    store.generateProblems()
    const firstProblem = store.problems[0]

    expect(store.problems.length).toBe(NUMBER_OF_PROBLEMS)
    expect(firstProblem.num1).toEqual(expect.any(Number))
    expect(firstProblem.num2).toEqual(expect.any(Number))
    expect(firstProblem.operator).toBe('+')

    expect(firstProblem.result).toBe(firstProblem.num1 + firstProblem.num2)
  })

  it('should generate correct subtraction problems', () => {
    store.selectedOperation = PROBLEM_TYPE.SUBTRACTION
    store.generateProblems()
    const firstProblem = store.problems[0]

    expect(store.problems.length).toBe(NUMBER_OF_PROBLEMS)
    expect(firstProblem.num1).toEqual(expect.any(Number))
    expect(firstProblem.num2).toEqual(expect.any(Number))
    expect(firstProblem.operator).toBe('-')

    expect(firstProblem.result).toBe(firstProblem.num1 - firstProblem.num2)
  })

  it('should generate correct mix problems', () => {
    store.selectedOperation = PROBLEM_TYPE.MIX
    store.generateProblems()
    const firstProblem = store.problems[0]
    const allowedOperators = OPERATIONS.map((op) => op.operator)

    expect(allowedOperators).toContain(firstProblem.operator)
    const operationConfig = OPERATIONS.find((op) => op.operator === firstProblem.operator)
    const expectedResult = operationConfig.calculate(firstProblem.num1, firstProblem.num2)

    expect(firstProblem.result).toBe(expectedResult)
  })

  it('should increment defaultNumberOfProblems', () => {
    expect(store.defaultNumberOfProblems).toBe(NUMBER_OF_PROBLEMS)
    store.incrementNumberOfProblems()

    expect(store.defaultNumberOfProblems).toBe(NUMBER_OF_PROBLEMS + 1)
  })

  it('should decrement defaultNumberOfProblems', () => {
    expect(store.defaultNumberOfProblems).toBe(NUMBER_OF_PROBLEMS)

    store.decrementNumberOfProblems()

    expect(store.defaultNumberOfProblems).toBe(NUMBER_OF_PROBLEMS - 1)
  })

  it('should increment maxNumber', () => {
    expect(store.maxNumber).toBe(MAX_NUMBER)

    store.incrementMaxNumber()

    expect(store.maxNumber).toBe(MAX_NUMBER + 1)
  })

  it('should decrement maxNumber', () => {
    expect(store.maxNumber).toBe(MAX_NUMBER)
    store.decrementMaxNumber()

    expect(store.maxNumber).toBe(MAX_NUMBER - 1)
  })

  it('should log a warning for an unsupported operation', () => {
    const counter = ref(10)
    const invalidOperation = 'asdf'

    updateCounter(MAX_NUMBER, invalidOperation)

    expect(counter.value).toBe(10)
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(
      `updateCounter received an unsupported operation: "${invalidOperation}"`,
    )
  })
})
