/**
 * Static data generator based on static files
 */

import fs from 'fs'
import path, { join } from 'path'
import fm from 'front-matter'
import PNG from 'png-js'
import Joi from 'joi'

/**
 * Default options
 * @type {Object}
 */
const options = {
  content: '',
  output: '',
  include: ['.md', '.png'], // To do: currently accepting file extensions only, need improve this
  exclude: ['README.md'], // To do: currently accepting base file name with extension only, need improve this
  contentTypes: [],
}

/**
 * Reads content directory and return all files
 * @param  {String} dir      Content path
 * @param  {Array}  allFiles Partial list of files and directories
 * @return {Array}           List of files and directories
 */
function readDirSync (dir, allFiles = []) {
  const files = fs.readdirSync(dir).map(f => join(dir, f))
  allFiles.push(...files)
  files.forEach(f => {
    fs.statSync(f).isDirectory() && readDirSync(f, allFiles)
  })
  return allFiles
}

/**
 * Get data from list of files filtered based on options
 * @param  {Array}  allFiles List of files and directories
 * @return {Array}           Updated list of files with content
 */
function getData (allFiles = [], config) {
  const files = allFiles.reduce((memo, iteratee) => {
    const filePath = path.parse(iteratee)
    if (config.include.includes(filePath.ext) && !config.exclude.includes(filePath.base)) {
      const newFile = {
        file: iteratee.replace(config.content, ''),
        dir: filePath.dir.replace(config.content, ''),
        name: filePath.name,
        base: filePath.base,
        ext: filePath.ext,
      }
      if (filePath.ext === '.md') {
        const file = fs.readFileSync(iteratee, { encoding: 'utf8' })
        const frontMatter = fm(file)
        newFile.attr = frontMatter.attributes
        newFile.body = frontMatter.body
      } else if (filePath.ext === '.png') {
        const image = new PNG.load(iteratee)
        newFile.width = image.width
        newFile.height = image.height
      }
      memo.push(newFile)
    }
    return memo
  }, [])
  return files
}

/**
 * Translate data based on content types
 * @param  {Array} file  List of contents
 * @return {Array}       Updated list of contents
 */
function translate (content, contentTypes) {
  let output = {}
  content.forEach(each => {
    const base = path.parse(each.file).base
    if (base === 'index.md') {
      const type = each.dir.split('/').pop()
      output[type] = contentTypes[type] && contentTypes[type](content)
    }
  })
  return output
}

/**
 * Write output data in file system
 * @param  {String} filename Output file name
 * @param  {Array}  content  List of contents
 * @return {String}          Stringified list of contents
 */
function write (filename, content) {
  const json = JSON.stringify(content, (key, value) => value === undefined ? null : value)
  fs.writeFileSync(filename, json)
  return json
}

/**
 * Validate configuration
 * @param  {Object} config Configuration object
 * @return {null}          It will just throw error if invalid
 */
function validateConfig (config) {
  const customJoi = Joi.extend((joi) => ({
    base: joi.string(),
    name: 'file',
    language: {
      exists: 'file or directory must exists',
    },
    rules: [
      {
        name: 'exists',
        validate(params, value, state, options) {
          if (!fs.existsSync(value)) {
            return this.createError('file.exists', { v: value }, state, options)
          }
          return value
        }
      }
    ]
  }))

  const schema = Joi.object().keys({
    content: customJoi.file().exists().required(),
    output: Joi.string().required(),
    include: Joi.array().min(1).items(Joi.string()).required(),
    exclude: Joi.array().min(1).items(Joi.string()).required(),
    contentTypes: Joi.array().min(1).items(
      Joi.object()
      // To do: optimize shape definition
      // Joi.object({
      //   arg: Joi.string().required(),
      //   value: Joi.func().required(),
      // })
    ).required(),
  })
  const result = Joi.validate(config, schema, (err, value) => {
    if (err !== null) {
      throw err
    }
  })
}

/**
 * Run script
 */
function memexcms (config = options) {
  try {
    validateConfig(config)
    let content = readDirSync(config.content)
    content = getData(content, config)
    content = translate(content, config.contentTypes)
    content = write(config.output, content)
    console.log(`File written on ${config.output}`)
    console.log(`JSON output: ${content}`)
    return content
  } catch (e) {
    console.log('SHIT! ', e)
  }
}

export default memexcms