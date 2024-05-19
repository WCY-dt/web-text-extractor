# web-text-extractor

This is a utility for extracting metadata and text from a website.

## Description

The `web-text-extractor` is a module that allows you to extract metadata and text from a website.

`metaExtractor` extracts metadata from a HTML string and returns an struct with the metadata. Title is specially handled to make sure it is the title of the main content, instead of the title of the page.

`textExtractor` extracts text from a HTML string and returns a string with the text. The string only contains the text, without any HTML tags. It will also filter out any script, style, and other non-text components.

**More features and examples can be found in the [test](./test) folder.**

## Installation

To install the `web-text-extractor` module for use in your project:

```shell
npm install --save web-text-extractor
```

## Usage

### Extracting Metadata

To extract metadata from a website, use the `metaExtractor` function:

```javascript
const { metaExtractor } = require('web-text-extractor');
const metadata = metaExtractor(html);
```

### Extracting Text

To extract text from a website, use the `textExtractor` function:

```javascript
const { textExtractor } = require('web-text-extractor');
const text = textExtractor(html);
```

## Building and Testing

To run the tests for this project, use the test script in the package.json file:

```shell
npm run build
npm test
```

## Contributing

If you would like to contribute to this project, please open an issue or a pull request. All contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE file](./LICENSE) for details.
