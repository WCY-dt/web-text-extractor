const { metaExtractor } = require('../dist/extractor');

describe('metaExtractor', () => {
    it('should return empty title if title is not present', () => {
        const html = `
            <html>
                <head></head>
                <body></body>
            </html>
        `;
        const expected = {
            title: ''
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should return title if only title is present', () => {
        const html = `
            <html>
                <head>
                    <title>Test</title>
                </head>
                <body></body>
            </html>
        `;
        const expected = {
            title: 'Test'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should extract meta tags from html string', () => {
        const html = `
            <html>
                <head>
                    <title>Test</title>
                    <meta name="charset" content="utf-8">
                    <meta name="keywords" content="test, example, meta">
                    <meta name="description" content="This is a test.">
                    <meta name="author" content="John Doe">
                    <meta name="refresh" content="5">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <script src="script.js"></script>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body></body>
            </html>
        `;
        const expected = {
            title: 'Test',
            charset: 'utf-8',
            keywords: 'test, example, meta',
            description: 'This is a test.',
            author: 'John Doe',
            refresh: '5',
            viewport: 'width=device-width, initial-scale=1'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should return h1 if only one h1 is present', () => {
        const html = `
            <html>
                <head>
                    <title>Test-title</title>
                </head>
                <body>
                    <h1>Test-h1</h1>
                </body>
            </html>
        `;
        const expected = {
            title: 'Test-h1'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should return h1 if multiple h1 are present but one of the h1 is contained by title', () => {
        const html = `
            <html>
                <head>
                    <title>Test-title</title>
                </head>
                <body>
                    <h1>Test-h1</h1>
                    <h1>Test</h1>
                </body>
        `;
        const expected = {
            title: 'Test'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should return h1 if multiple h1 are present but none of the h1 is contained by title', () => {
        const html = `
            <html>
                <head>
                    <title>Test-title</title>
                </head>
                <body>
                    <h1>Test-h1-1</h1>
                    <h1>Test-h1-2</h1>
                </body>
        `;
        const expected = {
            title: 'Test-title'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });
});