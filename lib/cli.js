#!/usr/bin/env node

const meow = require('meow')
const updateNotifier = require('update-notifier')
const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
const beeper = require('beeper')
const clock = require('./clock')
const { validate } = require('./validations')

momentDurationFormatSetup(moment)

const cli = meow(
  `
  Usage
    $ alarm <time> [flag]

  Options
    --hours, -h      Time flag
    --minutes, -m    Time flag
    --seconds, -s    Time flag
    --silence, -S    Do not emit sound on stop
    --help           Show this text in console
    --version        Show version of this package

  Examples
    $ alarm 33 -m
    $ alarm 5 --seconds --silence
`,
  {
    flags: {
      hours: {
        type: 'boolean',
        alias: 'h',
      },
      minutes: {
        type: 'boolean',
        alias: 'm',
      },
      seconds: {
        type: 'boolean',
        alias: 's',
      },
      silence: {
        type: 'boolean',
        alias: 'S',
      },
    },
  },
)

updateNotifier({ pkg: cli.pkg }).notify()

const time = Number(cli.input[0])
const flags = Object.keys(cli.flags).reduce((accu, key) => {
  if (cli.flags[key]) {
    accu[key] = cli.flags[key]
  }

  return accu
}, {})

validate(cli)

const getTimeType = () => {
  const keysFlags = Object.keys(flags)

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

const duration = moment.duration(time, getTimeType())

let interval

function start () {
  clock.draw(getRemainingTime())
  duration.subtract(1, 's')

  interval = setInterval(async () => {
    const remainingTime = getRemainingTime()
    clock.draw(remainingTime)

    if (remainingTime === '00:00:00') {
      stop()
      clock.draw(moment().format('HH:mm:ss'))

      if (!flags.silence) {
        await beeper(2)
      }
    }

    duration.subtract(1, 's')
  }, 1000)
}

function stop () {
  clearInterval(interval)
}

function getRemainingTime () {
  return duration.format('HH:mm:ss', { trim: false })
}

start()
