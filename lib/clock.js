'use strict';

const termSize = require('term-size');
const readline = require('readline');
const chalk = require('chalk');

// const CURRENT_THEME_NAME = 'default'; // TODO: Configurable from env.

// const themeConfig = require(`./config.js`)({ chalk });
const defaultTheme = require(`./typeface.js`);

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

function buildClock(time, theme) {
  const hours = time.substr(0, 2);
  const minutes = time.substr(3, 2);
  const seconds = time.substr(6, 2);

  const numberMatrix = [
    theme.numbers[hours[0]],
    theme.numberSpace,
    theme.numbers[hours[1]],
    theme.numberSeperator,
    theme.numbers[minutes[0]],
    theme.numberSpace,
    theme.numbers[minutes[1]],
    theme.numberSeperator,
    theme.numbers[seconds[0]],
    theme.numberSpace,
    theme.numbers[seconds[1]]
  ];

  const stringLines = [];

  numberMatrix.forEach(numberLines => {
    numberLines.forEach((line, index) => {
      if (stringLines[index] === undefined) stringLines[index] = '';

      stringLines[index] += line;
    })
  });

  // color clock lines
  return stringLines.map(line => theme.color(line));
}

function doClock(time) {
  const { columns, rows } = termSize();
  const theme = columns < defaultTheme.screenSize.lg.columns ? defaultTheme.screenSize.sm : defaultTheme.screenSize.lg;
  const clockLines = buildClock(time, theme);

  // const clockWidth = clockLines[0].length;
  const clockWidth = theme.columns;
  const clockLeft = ' '.repeat(Math.max(0, Math.ceil(columns / 2 - clockWidth / 2)));

  const padding = rows / 2 - (theme.rows / 2).toFixed();

  printEmptyLines(padding);
  clockLines.forEach(line => print(clockLeft + line));
  printEmptyLines(padding);
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
