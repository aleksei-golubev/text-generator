import fs from 'fs';

import { getTemplate } from "../core/utils.mjs";

export function generateIndex(context) {
    const replacements = {
        'TEXTS_LIST': textsList(context.texts.map(text => getLink(text)))
    }

    let fileContent = getTemplate('index', context.templateDir);
    Object.keys(replacements).forEach(key => fileContent = fileContent.replace(`<!--- ${key} --->`, replacements[key]));
    fs.writeFileSync(`${context.outputDir}/index.html`, fileContent);
}

function getLink(text) {
    return {
        title: text.content.title.origin,
        url: `${text.content.level}/${text.slug}-${text.id}.html` 
    }
}

function textsList(list) {
    return `<ul>
        ${list.map(text => `<li><a href='${text.url}'>${text.title}</a></li>\n`).join('')}
    </ul>`;
}