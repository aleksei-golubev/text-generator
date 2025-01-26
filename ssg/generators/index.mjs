import fs from 'fs';

import { getTemplate } from "../core/utils.mjs";
import { type } from 'os';

export function generateIndex(context) {
    const replacements = {
        'TEXTS_LIST': groupedTextsList(context.groupedTexts)
    }

    let fileContent = getTemplate('index', context.templateDir);
    Object.keys(replacements).forEach(key => fileContent = fileContent.replace(`<!--- ${key} --->`, replacements[key]));
    fs.writeFileSync(`${context.outputDir}/index.html`, fileContent);
}

function getLink(text) {
    return {
        type: text.type,
        title: text.content.title.origin,
        url: `${text.content.level}/${text.slug}-${text.id}.html`,
        date: new Date(text.date)
    }
}

function typeTranslate(type) {
    switch (type) {
        case 'text': return 'Un text';
        case 'dialog': return 'Un diálogo';
    }
}

function textsList(list) {
    return `<ul>
        ${list.map(text => getLink(text))
              .sort((a, b) => b.date - a.date)
              .map(text => `<li class='text-item'><span class='icon ${text.type}' title='${typeTranslate(text.type)}'></span><a href='${text.url}'>${text.title}</a> <span class='date'>(${formatDate(text.date)})</span></li>\n`)
              .join('')}
    </ul>`;
}

function groupedTextsList(groupedTexts) {
    let sortedGroups = [...groupedTexts.entries()].sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    let result = '';
    sortedGroups.forEach(([level, group]) => {
        result += `
            <h3 class='oswald-mod'>${level}</h3>
            ${textsList(group)}
        `;
    });
    return result;
}

function formatDate(dateObj) {
    const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
    const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${date}.${month}.${year}`;
}