import path from 'path'

// Content types translations
import posts from './content-types/posts'
import gallery from './content-types/gallery'

/**
 * Default options
 * @type {Object}
 */
const options = {
  content: path.resolve(__dirname, 'content'),
  output: path.resolve(__dirname, 'data.json'),
  include: ['.md', '.png'],
  exclude: ['README.md'],
  contentTypes: [
  	{ posts: posts },
  	{ gallery: gallery },
  ]
}

export default options