# alarm-cli

Countdown alarm in your terminal

<p align="center"><img src="/media/demo.gif"></p>

## Requirements

- [Node.js](https://nodejs.org/)

## Install

Open a terminal and install _alarm-cli_ globally by running the following command.

```
$ npm install --global alarm-cli
```

## Usage

```
$ alarm --help

  Countdown alarm in your terminal

  Usage
    $ alarm <time> [flag]

  Options
    --hours, -h      TIME flag
    --minutes, -m    TIME flag
    --seconds, -s    TIME flag
    --silence, -S    Does not emits sound on stop
    --help           Show this text in console
    --version        Show version of this package

  Examples
    $ alarm 33 -m
    $ alarm 5 --seconds --silence
```

## License

MIT © Made with <strike>love</strike> _a keyboard_ by [Danilo Barros](https://danilobjr.mit-license.org/)
