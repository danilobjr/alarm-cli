#!/usr/bin/env node

const xs = require('xstream').default
const beeper = require('beeper')
const { cli } = require('./cli')
const { render } = require('./clock')
const { timer } = require('./timer')
const { validate } = require('./validations')

validate(cli)

const time = timer(cli)

const timerStream = xs.periodic(1000)

const timerIsOverStream = xs.create({
  start: (listener) => {
    this.id = setInterval(() => {
      if (time.isOver()) {
        listener.next()
      }
    }, 1000)
  },
  stop: () => {
    clearInterval(this.id)
  },
  id: 0,
})

const stream = xs
  .merge(timerStream, timerIsOverStream)
  .map(() => {
    const remainingTime = time.remaining
    time.decrease()
    return remainingTime
  })
  .endWhen(timerIsOverStream)

stream.addListener({
  next: (remainingTime) => {
    render(remainingTime)
  },
  error: console.error,
  complete: async () => {
    render(time.now)

    if (!cli.flags.silence) {
      await beeper(2)
    }

    process.exit()
  },
})
