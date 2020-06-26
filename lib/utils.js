const chalk = require('chalk')

function getTimeFlag ({ flags }) {
  const onlyFlagsUsedByUser = pickBy((_, value) => !!value)(flags)
  const keysFlags = Object.keys(onlyFlagsUsedByUser)

  return ['hours', 'minutes', 'seconds'].reduce((result, type) => {
    if (result) {
      return result
    }

    if (keysFlags.includes(type)) {
      result = type
    }

    return result
  }, '')
}

const pickBy = (conditionFunc) => (obj) =>
  Object.keys(obj).reduce((projection, key) => {
    const value = obj[key]

    if (conditionFunc(key, value)) {
      projection[key] = value
    }

    return projection
  }, {})

const showError = (text) => {
  console.log(`
  ${chalk.red(text)}

  Typing ${chalk.green('alarm --help')} may help you.
  `)
  process.exit()
}

module.exports = {
  getTimeFlag,
  pickBy,
  showError,
}
