const terminal = require('./terminal')
// const CURRENT_THEME_NAME = 'default'; // TODO: Configurable from env.
const defaultTheme = require('./typeface.js')

function buildClock (time, theme) {
  const hours = time.substr(0, 2)
  const minutes = time.substr(3, 2)
  const seconds = time.substr(6, 2)

  const numberMatrix = [
    theme.numbers[hours[0]],
    theme.spaceBetween,
    theme.numbers[hours[1]],
    theme.separator,
    theme.numbers[minutes[0]],
    theme.spaceBetween,
    theme.numbers[minutes[1]],
    theme.separator,
    theme.numbers[seconds[0]],
    theme.spaceBetween,
    theme.numbers[seconds[1]],
  ]

  const stringLines = []

  numberMatrix.forEach((numberLines) => {
    numberLines.forEach((line, index) => {
      if (stringLines[index] === undefined) stringLines[index] = ''

      stringLines[index] += line
    })
  })

  const colorfulLines = stringLines.map((line) => theme.color(line))
  return colorfulLines
}

function addClockToTerminalBuffer (time) {
  const { columns, rows } = terminal.size()
  const theme =
    columns < defaultTheme.screenSize.large.columns
      ? defaultTheme.screenSize.small
      : defaultTheme.screenSize.large
  const clockLines = buildClock(time, theme)

  const clockWidth = theme.columns
  const clockLeft = ' '.repeat(
    Math.max(0, Math.ceil(columns / 2 - clockWidth / 2)),
  )
  const padding = rows / 2 - (theme.rows / 2).toFixed()

  terminal.buffer.printEmpty(padding)
  clockLines.forEach((line) => terminal.buffer.print(clockLeft + line))
  terminal.buffer.printEmpty(padding)
}

function render (time) {
  terminal.clear()
  addClockToTerminalBuffer(time)
  terminal.draw()
}

module.exports = {
  render,
}
