# alarm-cli

A responsive countdown alarm in your terminal.

<p align="center"><img src="/media/alarm.gif"></p>

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

  A responsive countdown alarm in your terminal

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
```

## License

MIT © Made with <strike>love</strike> _a keyboard_ by [Danilo Barros](https://danilobjr.mit-license.org/)
