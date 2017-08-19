function translation (content, contentType) {
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

export default translation
