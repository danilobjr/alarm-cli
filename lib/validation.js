const { showError } = require('./utils')

const validate = (cli) => {
  const validations = [
    hasNoInputValidation,
    inputIsNan,
    inputIsNegative,
    noTimeFlag,
  ]

  validations.forEach((validation) => {
    const { valid, message } = validation()

    if (valid) {
      showError(message)
    }
  })
}

const validation = ({ conditional, message }) => {
  const result = {
    valid: true,
    message: '',
  }

  if (conditional()) {
    result.valid = false
    result.message = message
  }

  return result
}

const hasNoInputValidation = ({ input }) =>
  validation(() => input.length === 0, 'No arguments specified.')

const inputIsNan = ({ input }) =>
  validation(() => Number.isNaN(input[0]), 'Argument should be a number.')

const inputIsNegative = ({ input }) =>
  validation(() => input[0] < 0, 'Argument should be non-negative.')

const noTimeFlag = ({ flags }) =>
  validation(
    () => !flags.h && !flags.m && !flags.s,
    'No <time> flags specified.',
  )

module.exports = {
  validate,
}
