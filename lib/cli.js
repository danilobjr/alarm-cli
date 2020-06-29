const meow = require('meow')

const cli = meow(
  `
  Usage
    $ alarm <flag> <time> [--silence|-S]

  Options
    --hours, -h      Time flag
    --minutes, -m    Time flag
    --seconds, -s    Time flag
    --silence, -S    Does not beep on stop
    --help           Show this text
    --version        Show version

  Examples
    $ alarm -m 33
    $ alarm --seconds 5 --silence
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
