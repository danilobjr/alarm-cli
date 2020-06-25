const readline = require('readline')
const termSize = require('term-size')

const buffer = (function () {
  let buffer = []

  const clear = () => {
    buffer = []
  }

  const write = (line = '') => {
    buffer.push(line)
  }

  const writeEmpty = (count = 1) => {
    for (let i = 0; i < count; i++) {
      write()
    }
  }

  const toString = () => buffer.join('\n')

  return {
    clear,
    get length () {
      return buffer.length
    },
    write,
    writeEmpty,
    toString,
  }
})()

let previousLength = 0

function clear () {
  const clearTerminalScreenAndPutCursorAt00 = '\x1B[2J\x1B[0f\u001b[0;0H'
  process.stdout.write(clearTerminalScreenAndPutCursorAt00)
  process.stdout.moveCursor(0, -previousLength)
  process.stdout.write(
    ' '.repeat(Math.max(0, previousLength * termSize().columns)),
  )

  readline.clearScreenDown(process.stdout)

  buffer.clear()
}

function draw () {
  readline.cursorTo(process.stdout, 0, 0)
  process.stdout.write(buffer.toString())

  previousLength = buffer.length
}

function size () {
  const { columns, rows } = termSize()
  const width = columns
  const height = rows
  return { width, height }
}

module.exports = {
  buffer,
  clear,
  draw,
  size,
}
