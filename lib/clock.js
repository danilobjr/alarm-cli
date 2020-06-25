const terminal = require('./terminal')
const themeProvider = require('./theme.js')

const getPaddingLeft = (theme) => {
  const { width: terminalWidth } = terminal.size()

  const paddingLeft = ' '.repeat(
    Math.max(0, Math.ceil(terminalWidth / 2 - theme.width / 2)),
  )

  return paddingLeft
}

const getPaddingTop = (theme) => {
  const { height: terminalHeight } = terminal.size()
  return terminalHeight / 2 - (theme.height / 2).toFixed()
}

const writeClockInTerminalBuffer = (time) => {
  const { theme } = themeProvider
  const timeSlices = themeProvider.apply(time)

  const paddingLeft = getPaddingLeft(theme)
  const paddingTop = getPaddingTop(theme)

  terminal.buffer.writeEmpty(paddingTop)
  timeSlices.forEach((slice) => terminal.buffer.write(paddingLeft + slice))
  terminal.buffer.writeEmpty(paddingTop)
}

const render = (time) => {
  terminal.clear()
  writeClockInTerminalBuffer(time)
  terminal.draw()
}

module.exports = {
  render,
}
