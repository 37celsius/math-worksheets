/**
 * Updates a reactive counter ref.
 * @param {import('vue').Ref<number>} counterRef - The ref to modify.
 * @param {'increment' | 'decrement'} operation - The action to perform.
 */

export const updateCounter = (counterRef, operation) => {
  switch (operation) {
    case 'increment':
      counterRef.value++
      break
    case 'decrement':
      if (counterRef.value > 1) {
        counterRef.value--
      }
      break
    default:
      console.warn(`updateCounter received an unsupported operation: "${operation}"`)
      break
  }
}

/**
 * Creates a pair of increment and decrement actions for a given ref.
 * @param {import('vue').Ref<number>} counterRef - The ref to be controlled.
 * @returns {{increment: () => void, decrement: () => void}}
 */
export const createCounterActions = (counterRef) => {
  return {
    increment: () => updateCounter(counterRef, 'increment'),
    decrement: () => updateCounter(counterRef, 'decrement'),
  }
}
