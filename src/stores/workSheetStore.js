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

  // GETTER
  const worksheetTitle = computed(() => {
    if (!problems.value.length) {
      return 'Worksheet'
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
    PROBLEM_TYPE,
  }
})
