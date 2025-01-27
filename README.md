# HTML-Compress-API

Simple JS package to compress HTML data (optionally into a [dataURI](https://en.wikipedia.org/wiki/Data_URI_scheme)).

## Setup

To use the package, start by importing it using:

```javascript
const { compress } = require("html-compress-api")
```

## Compressing HTML data

The package offers two ways of compressing the data:

### HTML

This will compress the HTML into a compressed self-extracting HTML file (using a script tag):

```javascript
const sample = "<body>This is a test</body>"
const { compressed, bytes_saved } = compress(sample, "html")
```

### DataURI

This will compress the HTML into the compressed self-extracting first and then convert it into a dataURI.
This mode is useful for fitting HTML pages into QR codes.

```javascript
const sample = "<body>This is a test</body>"
const { compressed, bytes_saved } = compress(sample, "dataURI")
```

## Note

The compressor only works well on data over ~300 bytes, otherwise it may increase the size of the data.

## How it works

The package first compresses the HTML data using `raw-deflate`, then encoded to `base64` and finally packed it into a tiny decompressor.
