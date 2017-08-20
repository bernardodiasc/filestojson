import path from 'path'

/**
 * Posts content type translation
 * @param  {Array} content      List of files
 * @param  {String} contentType Content type name
 * @return {Object}             The posts content type data object
 */
function posts (content, contentType) {
  let output = {}
  const allFiles = content.filter(each => each.dir.includes(`/${contentType}`))
  const index = allFiles.filter(each => each.base === 'index.md')[0]
  index.attr.forEach(each => {
    allFiles.forEach(file => {
      if (file.name === each) {
        output[each] = file
      }
    })
  })
  return output
}

/**
 * Gallery content type translation
 * @param  {Array} content      List of files
 * @param  {String} contentType Content type name
 * @return {Object}             The gallery content type data object
 */
function gallery (content, contentType) {
  let output = {}
  const allFiles = content.filter(each => each.dir.includes(`/${contentType}`))
  const index = allFiles.filter(each => each.base === 'index.md')[0]
  index.attr.forEach(each => {
    Object.keys(each).forEach(key => {
      output[key] = Object.assign({ title: each[key] }, allFiles.filter(file => file.name === key)[0])
    })
  })
  return output
}

/**
 * Configuration
 * @type {Object}
 */
const config = {
  content: path.resolve(__dirname, 'content'),
  output: path.resolve(__dirname, 'data.json'),
  include: ['.md', '.png'],
  exclude: ['README.md'],
  contentTypes: [
    { posts },
    { gallery },
  ]
}

export default config
