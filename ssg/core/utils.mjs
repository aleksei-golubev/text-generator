import fs from 'fs';
import path from 'path';

export function getTemplate(name, templateDir) {
    return fs.readFileSync(path.join(templateDir, `${name}.html`)).toString();
}

export function loadTexts(storageDir) {
    return getFiles(storageDir).map(fileName => JSON.parse(loadText(storageDir, fileName)));
}

function loadText(storageDir, fileName) {
    return fs.readFileSync(path.join(storageDir, fileName));
}

function getFiles(storageDir) {
    return fs.readdirSync(storageDir);
}

export function copyFiles(from, to, files) {
    Object.keys(files).forEach(key => {
        fs.copyFileSync(path.join(from, key), path.join(to, files[key]));
    });
}

export function copySharedDirectories(context, directories) {
    Object.keys(directories).forEach(key => {
        let from = path.join(context.sharedDir, key);
        let to = path.join(context.outputDir, directories[key]);
        fs.readdirSync(from).forEach(file => {
            fs.copyFileSync(path.join(from, file), path.join(to, file));
        });
    });
}

export function createDirectories(outputDir, directories) {
    directories.forEach(dir => fs.mkdirSync(path.join(outputDir, dir)));
}