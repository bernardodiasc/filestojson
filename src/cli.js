#!/usr/bin/env babel-node

import fs from 'fs'
import path from 'path'
import meow from 'meow'
import lib from '.'

const [,, ...args] = process.argv

const cli = meow(`
  Usage
    $ filestojson <config file>
`)

if (cli.input.length === 0) {
  console.error('Missing: configuration.')
  cli.showHelp(1)
  process.exit(1)
}

if (!fs.existsSync(cli.input[0])) {
  console.error('Error: config file not found.')
  cli.showHelp(1)
  process.exit(1)
}

const config = require(path.resolve(cli.input[0]))
lib(config)
