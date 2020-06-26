const { pickBy, showError } = require('./utils')

const validate = (cli) => {
  const validations = [
    noTimeFlagValidation,
    hasNoInputValidation,
    inputIsNaNValidation,
    inputIsNonPositiveValidation,
    multipleTimeFlagsValidation,
  ]

  validations.forEach((validation) => {
    const { valid, message } = validation(cli)

    if (!valid) {
      showError(message)
    }
  })
}

const validation = (invalidCondition, message) => {
  const result = {
    valid: true,
    message: '',
  }

  if (invalidCondition()) {
    result.valid = false
    result.message = message
  }

  return result
}

const noTimeFlagValidation = ({ flags }) =>
  validation(
    () => !flags.h && !flags.m && !flags.s,
    'Specify a <time> option.',
  )

const hasNoInputValidation = ({ input }) =>
  validation(() => input.length === 0, '<time> option was not set.')

const inputIsNaNValidation = ({ input }) =>
  validation(
    () => Number.isNaN(parseInt(input[0], 10)),
    '<time> option value should be a number.',
  )

const inputIsNonPositiveValidation = ({ input }) =>
  validation(
    () => input[0] < 1,
    '<time> option value should be greater than 0.',
  )

const multipleTimeFlagsValidation = ({ flags }) =>
  validation(() => {
    const initialCount = 0

    const howManyFlags = ['hours', 'minutes', 'seconds'].reduce(
      (howMany, timeFlag) => {
        const flagsSetByUser = Object.keys(
          pickBy((_, value) => value === true)(flags),
        )

        if (flagsSetByUser.includes(timeFlag)) {
          howMany = howMany + 1
        }

        return howMany
      },
      initialCount,
    )

    return howManyFlags > 1
  }, 'It should have only one <time> option.')

module.exports = {
  validate,
}
