#!/usr/bin/env node

'use strict';

const meow = require('meow');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');

momentDurationFormatSetup(moment);

const cli = meow(`
	Usage
    $ terminal-alarm <time>

  Options
    --hours, -H      TIME flag
    --minutes, -M    TIME flag
    --seconds, -S    TIME flag
    --humanize, -h   Show remaining time in a friendly way
    --silence, -s    Does not emits sound on stop
    --help           Show this text in console
    --version        Show version of this package

	Examples
	  $ terminal-alarm 33 -M
	  $ terminal-alarm 5 --seconds --silence
`, {
    flags: {
      hours: {
        type: 'boolean',
        alias: 'H',
      },
      minutes: {
        type: 'boolean',
        alias: 'M',
      },
      seconds: {
        type: 'boolean',
        alias: 'S',
      },
      humanize: {
        type: 'boolean',
        alias: 'h',
      },
      silence: {
        type: 'boolean',
        alias: 's',
      },
    },
  });

updateNotifier({ pkg: cli.pkg }).notify();

const showError = text => {
  console.error(`
  ${chalk.red(text)}

  Try ${chalk.green('terminal-alarm --help')} to get some help.
  `);
  process.exit(1);
}

const time = Number(cli.input[0]);
const flags = Object
  .keys(cli.flags)
  .reduce((accu, key) => {
    if (!!cli.flags[key]) {
      accu[key] = cli.flags[key];
    }

    return accu;
  }, {});

if (cli.input.length === 0) {
  showError('No arguments specified.');
}

if (Number.isNaN(time)) {
  showError('Argument should be a number.');
}

if (time < 0) {
  showError('Argument should be non-negative.');
}

if (!flags['H'] && !flags['M'] && !flags['S']) {
  showError('No [TIME] flags specified.');
}

const getTimeType = () => {
  const keysFlags = Object.keys(flags);

  return ['hours', 'minutes', 'seconds'].reduce((result, type) => {
    if (!!result) { return result; }

    if (keysFlags.includes(type)) {
      result = type;
    }

    return result;
  }, '');
}

const duration = moment.duration(time, getTimeType());

let interval;
const stream = process.stdout;

function start() {
  interval = setInterval(function () {
    stream.clearLine();
    stream.cursorTo(0);
    stream.write(elapsedTime());

    if (duration.format('HH:mm:ss', { trim: false }) === '00:00:00') {
      if (flags['silence']) {
        stop();
        process.exit();
      }

      // console.log('\x07');
      console.log('\u0007');
      stop();
    }

    duration.subtract(1, 's');
  }, 1000);
}

function stop() {
  clearInterval(interval);
}

function elapsedTime() {
  if (!!flags['humanize']) {
    return duration.humanize();
  }

  return duration.format('HH:mm:ss', { trim: false });
}

start();
