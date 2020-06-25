const terminal = require('./terminal')
const themeProvider = require('./theme.js')

const getPaddingLeft = (theme) => {
  const { width: terminalWidth } = terminal.size()
  const halfTerminalWidth = terminalWidth / 2
  const halfThemeWidth = theme.width / 2
  const roundedPaddingValue = Math.ceil(halfTerminalWidth - halfThemeWidth)
  const positivePaddingValue = Math.abs(roundedPaddingValue)

  return positivePaddingValue
}

const getPaddingTop = (theme) => {
  const { height: terminalHeight } = terminal.size()
  const halfTerminalHeight = terminalHeight / 2
  const halfThemeHeight = (theme.height / 2).toFixed()

  return halfTerminalHeight - halfThemeHeight
}

const repeatString = (times) => (text) => text.repeat(times)

const writeClockInTerminalBuffer = (time) => {
  const { theme } = themeProvider
  const timeSlices = themeProvider.apply(time)

  const paddingLeft = getPaddingLeft(theme)
  const paddingTop = getPaddingTop(theme)

  const space = ' '
  const paddingLeftAsSpace = repeatString(paddingLeft)(space)

  terminal.buffer.writeEmpty(paddingTop)
  timeSlices.forEach((slice) =>
    terminal.buffer.write(paddingLeftAsSpace + slice),
  )
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
