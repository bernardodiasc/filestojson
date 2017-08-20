# filestojson

This script will generarate JSON file from content files.

## Setup

```
npm install filestojson --save-dev
```

Note: you may have to install Babel globaly to be able to use this lib:

```
npm install -g babel-cli
```

## Examples

What's the application of this? You may ask.

Check the examples of different front-end stacks loading the data and rendering the page:

```
npm run examples
```

## How to use

Command line:

```
filestojson ./path/to/config.js
```

Script:

```
import config from './path/to/config.js'
filestojson(config)
```

### Configuration

Please refer to the [examples/config.js](examples/config.js) implementation for further example.

Explaining, the `config` is expected to return an object with the keys:

- `content` should be a string for the content folder path, where all content types containing markdown, images and other suff are located;
- `output` should be a string for the JSON file path that will be generated;
- `include` should be an array of strings, where the strings are file extensions that will be included;
- `exclude` should be an array of strings, where the strings are file name with the extension that will be ignored;
- `contentTypes` should be an array of object, each object containing key and the content type translation function;

### Content types and translations

... TBP ...
