#!/usr/bin/env node

'use strict';

const meow = require('meow');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');
const clock = require('./clock');
const Player = require('player-cli');
const path = require('path');

momentDurationFormatSetup(moment);
const alarm = new Player(path.resolve(__dirname, '../media/alarm.mp3'));

const cli = meow(`
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
`, {
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

if (!flags['h'] && !flags['m'] && !flags['s']) {
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
// const stream = process.stdout;

function start() {
  clock.draw(getRemainingTime());
  duration.subtract(1, 's');

  interval = setInterval(() => {
    const remainingTime = getRemainingTime();
    clock.draw(remainingTime);

    if (remainingTime === '00:00:00') {
      if (flags['silence']) {
        stop();
        process.exit();
      }

      stop();
      clock.draw(moment().format('HH:mm:ss'));
      alarm.play();
    }

    duration.subtract(1, 's');
  }, 1000);

  // process.stdout.on('resize', () => clock.draw(getRemainingTime()));
}

function stop() {
  clearInterval(interval);
}

function getRemainingTime() {
  return duration.format('HH:mm:ss', { trim: false });
}

start();
