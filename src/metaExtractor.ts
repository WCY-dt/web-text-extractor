import { JSDOM } from 'jsdom';

type Meta = {
    title: string,
    charset?: string | undefined,
    keywords?: string | undefined,
    description?: string | undefined,
    author?: string | undefined,
    refresh?: string | undefined,
    viewport?: string | undefined,
};

type MetaMap = {
    [key: string]: keyof Meta;
}

const metaExtractor = (html: string): Meta => {
    let meta: Meta = {
        title: '',
    };

    const dom = new JSDOM(html);
    const metaDom = dom.window.document;

    // <h1> tags
    const h1Elements = metaDom.querySelectorAll('h1');
    if (h1Elements.length === 1) {
        meta.title = h1Elements[0].textContent ?? '';
    } else {
        // <title> tag
        const titleElement = metaDom.querySelector('title');
        if (titleElement) {
            const title = titleElement.textContent ?? '';
            const h1Element = Array.from(h1Elements).find((element: Element) => title.includes(element.textContent ?? ''));
            if (h1Element) {
                meta.title = h1Element.textContent ?? '';
            } else {
                meta.title = title;
            }
        }
    }

    // <meta> tags
    const metaElements = metaDom.querySelectorAll('meta');
    const metaMap: MetaMap = {
        'charset': 'charset',
        'keywords': 'keywords',
        'description': 'description',
        'author': 'author',
        'refresh': 'refresh',
        'viewport': 'viewport',
    };
    metaElements.forEach((element: Element) => {
        const name = element.getAttribute('name');
        const content = element.getAttribute('content');

        if (name && metaMap[name.toLowerCase()]) {
            meta[metaMap[name.toLowerCase()]] = String(content) ?? undefined;
        }
    });

    return meta;
};

export default metaExtractor;