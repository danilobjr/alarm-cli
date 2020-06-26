const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
const { getTimeFlag } = require('./utils')

momentDurationFormatSetup(moment)

const timer = (cli) => {
  const format = 'HH:mm:ss'
  const end = '00:00:00'

  const time = parseInt(cli.input[0], 10)
  const duration = moment.duration(time, getTimeFlag(cli))

  const decrease = () => {
    duration.subtract(1, 's')
  }

  const now = () => moment().format(format)

  const remaining = () => duration.format(format, { trim: false })

  return {
    decrease,
    isOver: () => {
      return remaining() === end
    },
    get now () {
      return now()
    },
    get remaining () {
      return remaining()
    },
  }
}

module.exports = {
  timer,
}
