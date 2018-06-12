# terminal-alarm

> Countdown with sound in your terminal

Works on macOS, Linux and Windows.

## Install

```
$ npm install --global terminal-alarm
```

## Usage

```
$ alarm --help

  Usage
    $ alarm <time> [flag]

  Options
    --hours, -H      TIME flag
    --minutes, -M    TIME flag
    --seconds, -S    TIME flag
    --humanize, -h   Show remaining time in a friendly way
    --silence, -s    Does not emits sound on stop
    --help           Show this text in console
    --version        Show version of this package

  Examples
    $ alarm 33 -M
    $ alarm 5 --seconds --silence
```

## License

MIT © [Danilo Barros](https://danilobjr.mit-license.org/)
