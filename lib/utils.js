const chalk = require('chalk')

const showError = (text) => {
  console.error(`
  ${chalk.red(text)}

  Try ${chalk.green('alarm --help')} to get some help.
  `)
  process.exit()
}

module.exports = {
  showError,
}
