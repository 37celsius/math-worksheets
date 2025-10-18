import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { PROBLEM_TYPE, NUMBER_OF_PROBLEMS } from '@/constants'

export const useWorksheetStore = defineStore('worksheet', () => {
  // STATE
  const selectedOperation = ref(PROBLEM_TYPE.ADDITION)
  const defaultNumberOfProblems = ref(NUMBER_OF_PROBLEMS)
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
  const incrementNumberOfProblems = () => {
    return defaultNumberOfProblems.value++
  }

  const decrementNumberOfProblems = () => {
    if (defaultNumberOfProblems.value > 0) {
      return defaultNumberOfProblems.value--
    }
  }

  // The store must return everything it wants to expose
  // We do not need ref for PROBLEM_TYPE since it's constants
  return {
    selectedOperation,
    problems,
    worksheetTitle,
    defaultNumberOfProblems,
    incrementNumberOfProblems,
    decrementNumberOfProblems,
    PROBLEM_TYPE,
  }
})
