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

export function saveResponse(prompt, responseSchemaVersion, content, response) {
    let id = generateId();
    let fileName = generateFileName(id);
    const fileContent = {
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

    fileName =`./storage/${responseSchemaVersion}/${fileName}.json`;
    console.log(`Save to file: ${fileName}`);
    fs.writeFileSync(fileName, JSON.stringify(fileContent));
}

export function getMockedContent(responseSchemaVersion) {
    const mockFile = `./storage/${responseSchemaVersion}/apawl_2024-12-29_16-44-44.json`;
    console.log(`Load mocked data: ${mockFile}`);
    return fullContent(JSON.parse(fs.readFileSync(mockFile)).content);
}