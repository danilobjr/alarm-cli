const chalk = require('chalk')
const terminal = require('./terminal')

const large = {
  font: [
    ['██████', '██  ██', '██  ██', '██  ██', '██████'],
    ['████  ', '  ██  ', '  ██  ', '  ██  ', '██████'],
    ['██████', '    ██', '██████', '██    ', '██████'],
    ['██████', '    ██', '██████', '    ██', '██████'],
    ['██  ██', '██  ██', '██████', '    ██', '    ██'],
    ['██████', '██    ', '██████', '    ██', '██████'],
    ['██████', '██    ', '██████', '██  ██', '██████'],
    ['██████', '    ██', '    ██', '    ██', '    ██'],
    ['██████', '██  ██', '██████', '██  ██', '██████'],
    ['██████', '██  ██', '██████', '    ██', '██████'],
  ],
  spaceBetween: ['  ', '  ', '  ', '  ', '  '],
  separator: ['    ', '    ', '    ', '    ', '    '],
  width: 50,
  height: 5,
  color: chalk.blue.bold,
}

const small = {
  font: [
    ['█▀█', '█ █', '▀▀▀'],
    ['▀█ ', ' █ ', '▀▀▀'],
    ['▀▀█', '█▀▀', '▀▀▀'],
    ['▀▀█', ' ▀█', '▀▀▀'],
    ['█ █', '▀▀█', '  ▀'],
    ['█▀▀', '▀▀█    ', '▀▀▀'],
    ['█▀▀', '█▀█', '▀▀▀'],
    ['▀▀█', '  █', '  ▀'],
    ['█▀█', '█▀█', '▀▀▀'],
    ['█▀█', '▀▀█', '  ▀'],
  ],
  spaceBetween: [' ', ' ', ' '],
  separator: ['  ', '  ', '  '],
  width: 27,
  height: 3,
  color: chalk.blue.bold,
}

const size = {
  large,
  small,
}

const convertTimeToMatrix = (time, theme) => {
  const [hours, minutes, seconds] = time.split(':')

  const timeMatrix = [
    theme.font[hours[0]],
    theme.spaceBetween,
    theme.font[hours[1]],
    theme.separator,
    theme.font[minutes[0]],
    theme.spaceBetween,
    theme.font[minutes[1]],
    theme.separator,
    theme.font[seconds[0]],
    theme.spaceBetween,
    theme.font[seconds[1]],
  ]

  return timeMatrix
}

const format = (timeMatrix) => {
  const time = []

  timeMatrix.forEach((slices) => {
    slices.forEach((slice, index) => {
      if (time[index] === undefined) time[index] = ''
      time[index] += slice
    })
  })

  return time
}

const setFontColor = (formattedTime, color) =>
  formattedTime.map((time) => color(time))

const getTheme = () => {
  const { width: terminalWidth } = terminal.size()
  return terminalWidth < size.large.width ? size.small : size.large
}

const apply = (time) => {
  const theme = getTheme()

  const timeMatrix = convertTimeToMatrix(time, theme)
  const formattedTime = format(timeMatrix)
  const colorfulTime = setFontColor(formattedTime, theme.color)

  return colorfulTime
}

module.exports = {
  apply,
  get theme () {
    return getTheme()
  },
  size,
}
