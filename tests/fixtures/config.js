import path from 'path'

// Content types translations
import posts from './content-types/posts'
import gallery from './content-types/gallery'

const options = {
  content: path.resolve(__dirname, 'content'),
  output: path.resolve(__dirname, 'data.json'),
  include: ['.md', '.png'], // currently accepting file extensions only
  exclude: ['README.md'], // currently accepting base file name with extension only
  contentTypes: [
  	{ posts: posts },
  	{ gallery: gallery },
  ]
}

export default options