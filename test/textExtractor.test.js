const { textExtractor } = require('../dist/extractor');

describe('textExtractor', () => {
    it('should return empty string if no text is present', () => {
        const html = '<html><body></body></html>';
        const expected = '';
        const result = textExtractor(html);
        expect(result).toBe(expected);
    });

    it('should extract text from html string', () => {
        const html = '<html><body>Hello, World!</body></html>';
        const expected = 'Hello, World!';
        const result = textExtractor(html);
        expect(result).toBe(expected);
    });

    it('should extract text from complicated html string', () => {
        const html = `
            <html>
                <head>
                    <title>Test</title>
                </head>
                <body>
                    <h1>Hello, World!</h1>
                    <p>This is a test.</p>
                </body>
            </html>
        `;
        const expected = 'Hello, World!\nThis is a test.';
        const result = textExtractor(html);
        expect(result).toBe(expected);
    });

    it('should extract text from html string with other elements', () => {
        const html = `
            <html>
                <head>
                    <title>Test</title>
                    <meta charset="UTF-8">
                </head>
                <header>
                    <nav>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </nav>
                </header>
                <body>
                    <h1 class="title">Hello, World!</h1>
                    <div>
                        <p>This is a test.</p>
                    </div>
                    <script>alert('Hello, World!');</script>
                    <form action="/submit" method="post">
                        <input type="text" name="name">
                        <input type="submit" value="Submit">
                    </form>
                </body>
                <footer>
                    <p>&copy; 2024</p>
                </footer>
            </html>
        `;
        const expected = 'Hello, World!\nThis is a test.';
        const result = textExtractor(html);
        expect(result).toBe(expected);
    });
});