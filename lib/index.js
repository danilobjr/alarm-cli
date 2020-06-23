#!/usr/bin/env node

const beeper = require('beeper')
const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
const updateNotifier = require('update-notifier')
const { cli } = require('./cli')
const { render } = require('./clock')
const { pickBy } = require('./utils')
const { validate } = require('./validations')

momentDurationFormatSetup(moment)

// TODO(#4): not working
updateNotifier({ pkg: cli.pkg }).notify()

validate(cli)

const time = parseInt(cli.input[0], 10)
const duration = moment.duration(time, getTimeType(cli))

let interval

function start () {
  render(getRemainingTime())
  duration.subtract(1, 's')

  interval = setInterval(async () => {
    const remainingTime = getRemainingTime()
    render(remainingTime)

    if (remainingTime === '00:00:00') {
      stop()
      render(moment().format('HH:mm:ss'))

      if (!cli.flags.silence) {
        await beeper(2)
      }
    }

    duration.subtract(1, 's')
  }, 1000)
}

function stop () {
  clearInterval(interval)
}

function getTimeType ({ flags }) {
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

function getRemainingTime () {
  return duration.format('HH:mm:ss', { trim: false })
}

start()
