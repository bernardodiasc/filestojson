import fs from 'fs-extra'
import filestojson from '../src'
import config from './fixtures/config'
import expectedData from './fixtures/expected-data.json'

describe('lib', () => {
  it('does data generation', () => {
    if (fs.existsSync(config.output)) {
      fs.unlink(config.output)
    }
    filestojson(config)
    expect(fs.existsSync(config.output)).toBeTruthy()
    expect(fs.readJSONSync(config.output)).toMatchObject(expectedData)
  })
})