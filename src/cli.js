#!/usr/bin/env node

import meow from 'meow'
import lib from '.'

const [,, ...args] = process.argv

const cli = meow(`
  Usage
    $ memexcms <config file>
`)

if (cli.input.length === 0) {
  console.error('Missing: configuration.')
  cli.showHelp(1)
  process.exit(1)
}

lib(cli.input[0])