import path from 'path'

const dataSource = '/medals'

function medals (content) {
  let output = {}
  const allFiles = content.filter(each => each.dir.includes(dataSource))
  const index = allFiles.filter(each => each.base === 'index.md')[0]
  index.attr.forEach(each => {
    Object.keys(each).forEach(key => {
      output[key] = Object.assign({ title: each[key] }, allFiles.filter(file => file.name === key)[0])
    })
  })
  return output
}

export default medals
