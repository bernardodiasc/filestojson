#!/usr/bin/env node

/**
 * Static data generator based on static files
 */

import fs from 'fs'
import path, { join } from 'path'
import fm from 'front-matter'
import PNG from 'png-js'
// import * as contentTypes from './content-types'

const options = {
  content: path.resolve(__dirname, '..', 'content'),
  output: path.resolve(__dirname, '..', 'content', 'data.json'),
  include: ['.md', '.png'], // currently accepting file extensions only
  exclude: ['README.md'], // currently accepting base file name with extension only
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
function getData (allFiles = []) {
  const files = allFiles.reduce((memo, iteratee) => {
    const filePath = path.parse(iteratee)
    if (options.include.includes(filePath.ext) && !options.exclude.includes(filePath.base)) {
      const newFile = {
        file: iteratee.replace(options.content, ''),
        dir: filePath.dir.replace(options.content, ''),
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
function translate (content) {
  let output = {}
  content.forEach(each => {
    const base = path.parse(each.file).base
    if (base === 'index.md') {
      const type = each.dir.split('/').pop()
      // output[type] = contentTypes[type](content)
      output[type] = content
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
  const json = JSON.stringify(content)
  fs.writeFileSync(filename, json)
  return json
}

/**
 * Run script
 */
// (() => {
//   try {
//     let content = readDirSync(options.content)
//     content = getData(content)
//     content = translate(content)
//     content = write(options.output, content)
//     console.log(`File written on ${options.output}`)
//   } catch (e) {
//     console.log('SHIT! ', e)
//   }
// })()
