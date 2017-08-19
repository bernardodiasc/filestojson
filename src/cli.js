#!/usr/bin/env node

import lib from './lib'
import meow from 'meow'

const [,, ...args] = process.argv

const cli = meow(`
  Usage
    $ memex <config file>
`)

if (cli.input.length === 0) {
  console.error('Missing: configuration.')
  cli.showHelp(1)
}