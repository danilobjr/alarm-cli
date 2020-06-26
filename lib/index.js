#!/usr/bin/env node

const xs = require('xstream').default
const beeper = require('beeper')
const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
// const updateNotifier = require('update-notifier')
const { cli } = require('./cli')
const { render } = require('./clock')
const { pickBy } = require('./utils')
const { validate } = require('./validations')

momentDurationFormatSetup(moment)

// TODO(#4): not working
// updateNotifier({ pkg: cli.pkg }).notify()

validate(cli)

const time = parseInt(cli.input[0], 10)
const duration = moment.duration(time, getTimeType(cli))

const timeFormat = 'HH:mm:ss'
const endTime = '00:00:00'

const timerIsOver = xs.create({
  start: (listener) => {
    this.id = setInterval(() => {
      const itIsOver = getRemainingTime() === endTime
      if (itIsOver) {
        listener.next()
      }
    }, 1000)
  },
  stop: () => {
    clearInterval(this.id)
  },
  id: 0,
})

const timer = xs.periodic(1000)

const stream = xs
  .merge(timer, timerIsOver)
  .map(() => 1)
  .map((second) => {
    const remainingTime = getRemainingTime()
    duration.subtract(second, 's')
    return remainingTime
  })
  .endWhen(timerIsOver)

stream.addListener({
  next: (time) => {
    render(time)
  },
  error: console.error,
  complete: async () => {
    render(moment().format(timeFormat))

    if (!cli.flags.silence) {
      await beeper(2)
    }

    process.exit()
  },
})

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
  return duration.format(timeFormat, { trim: false })
}
