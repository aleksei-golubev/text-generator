import fs from 'fs';

import { createDirectories, getTemplate } from "../core/utils.mjs";
import { fullContent } from '../../shared/templates/full-content.mjs';

export function generateTexts(context) {
    let textTemplate = getTemplate('text', context.templateDir);
    
    createDirectories(context.outputDir, [...context.groupedTexts.keys()]);

    context.groupedTexts.forEach((texts, level) => {
        generateGroup(texts, `${context.outputDir}/${level}`, textTemplate);
    });
}

function generateGroup(texts, outputDir, textTemplate) {
    texts.forEach(text => {
        generateText(text, outputDir, textTemplate)
    });
}

function generateText(text, outputDir, textTemplate) {
    let fileContent = textTemplate;
    const replacements = {
        'TEXT': fullContent(text.content)
    }
    Object.keys(replacements).forEach(key => fileContent = fileContent.replace(`<!--- ${key} --->`, replacements[key]));
    fs.writeFileSync(`${outputDir}/${text.slug}-${text.id}.html`, fileContent);
}

