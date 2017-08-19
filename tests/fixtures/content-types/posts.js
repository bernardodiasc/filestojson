import path from 'path'

const dataSource = '/heroes'

function heroes (content) {
  let output = {}
  const allFiles = content.filter(each => each.dir.includes(dataSource))
  const index = allFiles.filter(each => each.base === 'index.md')[0]
  index.attr.forEach(each => {
    output[each] = {}
    allFiles.forEach(file => {
      if (file.dir.includes(`/${each}`)) {
        output[each][file.name] = file
      }
    })
  })
  return output
}

export default heroes
