import fs from 'fs-extra'
import path from 'path'
import { exec } from 'child_process'

describe('cli', () => {
  const cli = path.resolve(__dirname, '..', 'src', 'cli.js')
  const config = path.resolve(__dirname, 'fixtures', 'config.js')

  it('does data generation', (done) => {
    exec(`${cli} ${config}`, (error, stdout, stderr) => {
      expect(error).toBeNull()
      expect(stderr).toBe('')
      expect(stdout).not.toBe('')
      done()
    })
  })

  it('validate required arguments', (done) => {
    exec(`${cli}`, (error, stdout, stderr) => {
      expect(error).not.toBeNull()
      expect(stdout).not.toBe('')
      expect(stderr).not.toBe('')
      done()
    })
  })
})