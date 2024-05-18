import { JSDOM } from 'jsdom';

type Meta = {
    title?: string,
    description?: string,
    keywords?: string,
    viewport?: string,
    charset?: string,
    author?: string,
    robots?: string,
    refresh?: string,
    themeColor?: string,
};

const metaExtractor = (html: string): Meta => {
    const meta: Meta = {};

    const dom = new JSDOM(html);
    const metaDom = dom.window.document;

    const titleElement = metaDom.querySelector('title');
    if (titleElement) meta.title = titleElement.textContent ?? undefined;

    const metaElements = metaDom.querySelectorAll('meta');
    metaElements.forEach((element: Element) => {
        const name = element.getAttribute('name');
        const property = element.getAttribute('property');
        const content = element.getAttribute('content');

        if (name) {
            switch (name.toLowerCase()) {
                case 'description':
                    meta.description = content ?? undefined;
                    break;
                case 'keywords':
                    meta.keywords = content ?? undefined;
                    break;
                case 'viewport':
                    meta.viewport = content ?? undefined;
                    break;
                case 'charset':
                    meta.charset = content ?? undefined;
                    break;
                case 'author':
                    meta.author = content ?? undefined;
                    break;
                case 'robots':
                    meta.robots = content ?? undefined;
                    break;
                case 'refresh':
                    meta.refresh = content ?? undefined;
                    break;
                case 'theme-color':
                    meta.themeColor = content ?? undefined;
                    break;
            }
        }

        if (property) {
            switch (property.toLowerCase()) {
                case 'og:title':
                    meta.title = content ?? undefined;
                    break;
                case 'og:description':
                    meta.description = content ?? undefined;
                    break;
                case 'og:image':
                    meta.description = content ?? undefined;
                    break;
            }
        }
    });

    return meta;
};

export default metaExtractor;