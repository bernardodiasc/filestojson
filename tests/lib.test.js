import fs from 'fs-extra'
import filestojson from '../src'
import config from './fixtures/config'

describe('lib', () => {
  it('does data generation', () => {
    if (fs.existsSync(config.output)) {
      fs.unlink(config.output)
    }
    filestojson(config)
    expect(fs.readJSONSync(config.output)).toMatchObject({ gallery: null, posts: null })
  })
})