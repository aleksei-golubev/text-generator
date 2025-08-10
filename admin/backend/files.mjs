import fs from 'fs';
import { generateFileName, generateSlug } from './utils.mjs';
import { generateId } from '../../shared/utils.mjs';
import { fullContent } from '../../shared/templates/full-content.mjs';

export function loadSchema(responseSchemaVersion) {
    const loadedSchema = JSON.parse(fs.readFileSync(`./schemas/${responseSchemaVersion}/response.schema.json`));
    const responseSchema = loadedSchema.responseSchema;
    
    if (loadedSchema.version !== responseSchemaVersion)
      throw new Error(`Wrong response schema version! Expected: ${responseSchemaVersion}, loaded: ${loadedSchema.version}`);
    
    return responseSchema;
}

export function loadOpenApiKey() {
    return fs.readFileSync('./openai-api-key');
}

export function saveResponse(type, prompt, responseSchemaVersion, content, response) {
    let id = generateId();
    let fileName = generateFileName(id);

    const fileContent = {
        type: type,
        responseSchemaVersion: responseSchemaVersion,
        date: (new Date()).toJSON(),
        fileName: fileName,
        slug: generateSlug(content.title.origin),
        id: id,
        content: content,
        prompt: prompt,
        model: response.model,
        usage: response.usage
    };

    let subDir = {
        'text': 'texts',
        'dialog': 'dialogs'
    }[type];

    fileName =`./storage/${responseSchemaVersion}/${subDir}/${fileName}.json`;
    console.log(`Save to file: ${fileName}`);
    fs.writeFileSync(fileName, JSON.stringify(fileContent));
}

export function saveRawResponse(prompt, response, responseSchemaVersion) {
    const fileContent = {
        prompt: prompt,
        response: response
    }

    const fileName =`./storage/${responseSchemaVersion}/raw/${generateFileName('raw')}.json`;
    console.log(`Saved raw response to file: ${fileName}`);
    fs.writeFileSync(fileName, JSON.stringify(fileContent));
}

export function getMockedContent(responseSchemaVersion) {
    const mockFile = `./storage/${responseSchemaVersion}/texts/apawl_2024-12-29_16-44-44.json`;
    console.log(`Load mocked data: ${mockFile}`);
    return fullContent(JSON.parse(fs.readFileSync(mockFile)).content);
}

export function getMockedDialogContent(responseSchemaVersion) {
    const mockFile = `./storage/${responseSchemaVersion}/dialogs/wr3sy_2025-1-15_1-37-30.json`;
    console.log(`Load mocked data: ${mockFile}`);
    return fullContent(JSON.parse(fs.readFileSync(mockFile)).content, {speech: false});
}