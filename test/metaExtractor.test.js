const { metaExtractor } = require('../dist/extractor');

describe('metaExtractor', () => {
    it('should return empty object if no meta tags are present', () => {
        const html = '<html><head></head><body></body></html>';
        const expected = {};
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should extract meta tags from html string', () => {
        const html = `
            <html>
                <head>
                    <meta name="description" content="This is a test.">
                    <meta name="keywords" content="test, example, meta">
                </head>
                <body></body>
            </html>
        `;
        const expected = {
            description: 'This is a test.',
            keywords: 'test, example, meta'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });

    it('should extract meta tags from complicated html string', () => {
        const html = `
            <html>
                <head>
                    <title>Test</title>
                    <meta name="description" content="This is a test.">
                    <meta name="keywords" content="test, example, meta">
                    <meta name="author" content="John Doe">
                </head>
                <body></body>
            </html>
        `;
        const expected = {
            title: 'Test',
            description: 'This is a test.',
            keywords: 'test, example, meta',
            author: 'John Doe'
        };
        const result = metaExtractor(html);
        expect(result).toEqual(expected);
    });
});