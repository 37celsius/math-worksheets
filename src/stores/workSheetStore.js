import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { createCounterActions } from '@/utils/counter'

import { PROBLEM_TYPE, NUMBER_OF_PROBLEMS, MAX_NUMBER } from '@/constants'

export const useWorksheetStore = defineStore('worksheet', () => {
  // STATE
  const isFirstTime = ref(true)
  const selectedOperation = ref(PROBLEM_TYPE.ADDITION)
  const defaultNumberOfProblems = ref(NUMBER_OF_PROBLEMS)
  const maxNumber = ref(MAX_NUMBER)
  const problems = ref([])

  // GETTER
  const worksheetTitle = computed(() => {
    if (!problems.value.length) {
      return
    }

    // Adding String() is a defensive strategy just to make sure always receive string
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
    if (isFirstTime.value) {
      problems.value = []
      isFirstTime.value = false
    }

    generateProblems()
  }

  const generateProblems = () => {
    problems.value = []
    const existingProblems = new Set()

    for (let i = 0; i < defaultNumberOfProblems.value; i++) {
      let num1, num2
      const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1

      while (true) {
        const number1 = getRandomNumber(maxNumber.value)
        const number2 = getRandomNumber(maxNumber.value)
        num1 = Math.max(number1, number2)
        num2 = Math.min(number1, number2)

        const key = [number1, number2].sort((a, b) => a - b).join('-')

        if (!existingProblems.has(key)) {
          existingProblems.add(key)

          break
        }
      }

      if (selectedOperation.value === PROBLEM_TYPE.ADDITION) {
        problems.value.push({ num1, num2, operator: '+', result: num1 + num2, isCorrect: false })
      } else if (selectedOperation.value === PROBLEM_TYPE.SUBTRACTION) {
        problems.value.push({ num1, num2, operator: '-', result: num1 - num2, isCorrect: false })
      }
    }
  }

  // The store must return everything it wants to expose
  // We do not need ref for PROBLEM_TYPE since it's constants
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
    PROBLEM_TYPE,
  }
})
