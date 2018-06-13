'use strict';

const termSize = require('term-size');
const readline = require('readline');
const chalk = require('chalk');

const constants = {
  asd: 1
};

// const CURRENT_THEME_NAME = 'default'; // TODO: Configurable from env.

const themeConfig = require(`./config.js`)({ constants, chalk });
const themeTypeface = require(`./typeface.js`)({ constants });

let lastOutputLength = 0;
let output = [];
// let interval;

function clearOutput() {
  // readline.clearScreenDown(process.stdout);
  // process.stdout.clearLine();
  // process.stdout.cursorTo(0);
  process.stdout.moveCursor(0, -lastOutputLength);
  process.stdout.write(' '.repeat(Math.max(0, lastOutputLength * termSize().columns)));
  readline.clearScreenDown(process.stdout);

  output = [];
}

function print(line = '') {
  output.push(line);
}

function render() {
  readline.cursorTo(process.stdout, 0, 0);
  process.stdout.write(output.join('\n'));

  lastOutputLength = output.length;
}

function printEmptyLines(count = 0) {
  for (let i = 0; i < count; i++) {
    print('');
  }
}

function buildClock(time) {
  const hours = time.substr(0, 2);
  const minutes = time.substr(3, 2);
  const seconds = time.substr(6, 2);

  const numberMatrix = [
    themeTypeface.numbers[hours[0]],
    themeTypeface.numberSpace,
    themeTypeface.numbers[hours[1]],
    themeTypeface.numberSeperator,
    themeTypeface.numbers[minutes[0]],
    themeTypeface.numberSpace,
    themeTypeface.numbers[minutes[1]],
    themeTypeface.numberSeperator,
    themeTypeface.numbers[seconds[0]],
    themeTypeface.numberSpace,
    themeTypeface.numbers[seconds[1]]
  ];

  const stringLines = [];

  numberMatrix.forEach(numberLines => {
    numberLines.forEach((line, index) => {
      if (stringLines[index] === undefined) stringLines[index] = '';

      stringLines[index] += line;
    })
  });

  // color clock lines
  return stringLines.map(line => themeConfig.clock.styleNumber(line));
}

function doClock(time) {
  const { columns, rows } = termSize();
  const clockLines = buildClock(time);

  // const clockWidth = clockLines[0].length;
  const clockWidth = 50;
  const clockLeft = ' '.repeat(Math.max(0, Math.ceil(columns / 2 - clockWidth / 2)));

  const padding = rows / 2 - 3;

  printEmptyLines(padding);
  // printEmptyLines(themeConfig.clock.paddingTop);
  clockLines.forEach(line => print(clockLeft + line));
  printEmptyLines(padding);
  // printEmptyLines(themeConfig.clock.paddingBottom);
}

function draw(time) {
  process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
  clearOutput();
  doClock(time);
  render();
}

// function start() {
//   process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');

//   draw();
//   interval = setInterval(draw, 1000);

//   process.stdout.on('resize', draw);
// }

// function stop(exitCode = 0) {
//   clearInterval(interval);
//   process.exit(exitCode);
// }

// module.exports = (input, flags) => {
// start();
// console.log(getTime());
// };

module.exports = {
  draw
}
