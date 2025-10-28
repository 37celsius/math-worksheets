import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { createCounterActions } from '@/utils/counter'

import { PROBLEM_TYPE, NUMBER_OF_PROBLEMS, MAX_NUMBER } from '@/constants'

export const useWorksheetStore = defineStore('worksheet', () => {
  // STATE
  const selectedOperation = ref(PROBLEM_TYPE.ADDITION)
  const defaultNumberOfProblems = ref(NUMBER_OF_PROBLEMS)
  const maxNumber = ref(MAX_NUMBER)
  const problems = ref([])

  // HELPER: Define available operations for MIX mode
  const OPERATIONS = [
    {
      type: PROBLEM_TYPE.ADDITION,
      operator: '+',
      calculate: (num1, num2) => num1 + num2,
    },
    {
      type: PROBLEM_TYPE.SUBTRACTION,
      operator: '-',
      calculate: (num1, num2) => num1 - num2,
    },
  ]

  // HELPER: Get random operation for MIX mode
  const getRandomOperation = () => {
    const randomIndex = Math.floor(Math.random() * OPERATIONS.length)
    return OPERATIONS[randomIndex]
  }

  // HELPER: Get operation config based on selected type
  const getOperationConfig = (operationType) => {
    return OPERATIONS.find((op) => op.type === operationType)
  }

  // GETTER
  const worksheetTitle = computed(() => {
    if (!problems.value.length) {
      return
    }

    const operationName = String(selectedOperation.value || '')
    const formattedName =
      operationName.charAt(0).toUpperCase() + operationName.slice(1).toLowerCase()

    return `${formattedName} Practice`
  })

  // ACTIONS
  const { increment: incrementNumberOfProblems, decrement: decrementNumberOfProblems } =
    createCounterActions(defaultNumberOfProblems)

  const { increment: incrementMaxNumber, decrement: decrementMaxNumber } =
    createCounterActions(maxNumber)

  const onOperationChange = () => {
    problems.value = []
  }

  const resetNumber = () => {
    defaultNumberOfProblems.value = NUMBER_OF_PROBLEMS
    maxNumber.value = MAX_NUMBER
  }

  const generateProblems = () => {
    problems.value = []
    const existingProblems = new Set()

    const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1

    for (let i = 0; i < defaultNumberOfProblems.value; i++) {
      let num1, num2, operation, problemKey

      // Keep generating until we find a unique problem
      while (true) {
        const number1 = getRandomNumber(maxNumber.value)
        const number2 = getRandomNumber(maxNumber.value)
        num1 = Math.max(number1, number2)
        num2 = Math.min(number1, number2)

        // Determine operation based on selected mode
        if (selectedOperation.value === PROBLEM_TYPE.MIX) {
          operation = getRandomOperation()
        } else {
          operation = getOperationConfig(selectedOperation.value)
        }

        // Create unique key that includes operator for MIX mode
        if (selectedOperation.value === PROBLEM_TYPE.MIX) {
          // For MIX, include operator in the key to allow same numbers with different operators
          problemKey = `${num1}-${num2}-${operation.operator}`
        } else {
          // For single operation modes, just use numbers
          problemKey = `${num1}-${num2}`
        }

        if (!existingProblems.has(problemKey)) {
          existingProblems.add(problemKey)
          break
        }
      }

      // Create the problem using the operation config
      const result = operation.calculate(num1, num2)
      problems.value.push({
        num1,
        num2,
        operator: operation.operator,
        result,
        isCorrect: false,
      })
    }
  }

  return {
    selectedOperation,
    problems,
    worksheetTitle,
    defaultNumberOfProblems,
    maxNumber,
    incrementNumberOfProblems,
    incrementMaxNumber,
    decrementNumberOfProblems,
    decrementMaxNumber,
    generateProblems,
    onOperationChange,
    resetNumber,
    PROBLEM_TYPE,
  }
})
