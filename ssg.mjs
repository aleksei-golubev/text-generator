import fs from 'fs';
import path from 'path';
import { getDir } from './shared/utils.mjs';
import { copySharedDirectories, copyFiles, createDirectories, loadTexts } from './ssg/core/utils.mjs';
import { generateIndex } from './ssg/generators/index.mjs';

const __dirname = getDir(import.meta.url);
const responseSchemaVersion = "1.0";

const templateDir = path.join(__dirname, 'ssg/templates');
const storageDir =  path.join(__dirname, `storage/${responseSchemaVersion}`);
const outputDir = path.join(__dirname, 'generated-statics');
const sharedDir = path.join(__dirname, 'shared');

if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, {recursive: true, force: true});
}
fs.mkdirSync(outputDir);

const context = {
    texts: loadTexts(storageDir),
    templateDir: templateDir,
    storageDir: storageDir,
    outputDir: outputDir,
    sharedDir: sharedDir
}

createDirectories(context.outputDir, ['scripts', 'styles']);

copyFiles(context.templateDir, context.outputDir, {
    'files/text.js': 'scripts/text.js'
});
copyFiles(context.sharedDir, context.outputDir, {
    'frontend/favicon.svg': 'favicon.svg'
});


copySharedDirectories(context, {
    'frontend/scripts': 'scripts',
    'frontend/styles': 'styles'
});

generateIndex(context);