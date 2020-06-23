const chalk = require('chalk')

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
  pickBy,
  showError,
}
