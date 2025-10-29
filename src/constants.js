export const PROBLEM_TYPE = {
  ADDITION: 'ADDITION',
  SUBTRACTION: 'SUBTRACTION',
  MIX: 'MIX',
}

export const NUMBER_OF_PROBLEMS = 20
export const MAX_NUMBER = 20

// HELPER: Define available operations for MIX mode
export const OPERATIONS = [
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
