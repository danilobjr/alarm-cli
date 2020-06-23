const meow = require('meow')

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

module.exports = {
  cli,
}
