import { JSDOM } from 'jsdom';

const textExtractor = (html: string, delimiter: string = '\n'): string => {
    const dom = new JSDOM(html);
    let textDom = dom.window.document.body;

    const componentsToRemove = [
        // Metadata components
        'head', 'title', 'meta', 'base', 'basefont', 'link', 'style', 'noscript',

        // Sectioning components
        'header', 'nav', 'aside', 'section', 'article', 'main', 'footer',

        // Form components
        'form', 'input', 'textarea', 'button', 'select', 'option', 'optgroup', 'fieldset', 'legend', 'label', 'datalist', 'output', 'progress', 'meter', 'details', 'summary',

        // Embedding components
        'img', 'iframe', 'embed', 'object', 'param', 'video', 'audio', 'source', 'track', 'canvas', 'map', 'area', 'svg', 'math',

        // Text-level semantics
        /*
        'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo', 'span', 'wbr',
        */
        'br',

        // Other components
        'script', 'applet', 'frame', 'frameset', 'noframes', 'bgsound', 'template', 'slot', 'dialog', 'menu', 'menuitem'
    ];

    componentsToRemove.forEach(component => {
        let element = textDom.querySelector(component);
        if (element) element.parentNode?.removeChild(element);
    });

    let text = textDom.textContent ?? '';

    text = text
        .split('\n')
        .map((line: string) => line.trim())
        .filter(Boolean)
        .join(delimiter);
    return text;
};

export default textExtractor;