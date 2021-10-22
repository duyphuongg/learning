export const convertTagToHTML = function(text, html_tags) {
    let result = text;
    if(!result) return '';
    for(let tag in html_tags) {
        let substr = `\\[#!${tag}!#\\]`;
        result = result.replace(new RegExp(substr, 'g'), `<span class="alrv-tag-shortcode js-tag-shortcode" contenteditable="false">${html_tags[tag]}</span>`);
    }
    return result;
};

export const convertHTMLToTag = function(text, html_tags) {
    let result = text;
    if(!result) return '';
    for(let tag in html_tags) {
        let str = `<span class="alrv-tag-shortcode js-tag-shortcode" contenteditable="false">${html_tags[tag]}</span>`;
        result = result.replace(new RegExp(str, 'gi'), `[#!${tag}!#]`);
    }
    return result;
}

export const htmlTag = function(key, tag){
    return `<span class="alrv-tag-shortcode js-tag-shortcode" contenteditable="false">${ tag }</span>`;
}