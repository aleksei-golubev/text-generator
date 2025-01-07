import path from 'path';
import { fileURLToPath } from 'url';

export function getDir(url) {
    return path.dirname(fileURLToPath(url));
}

export function generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}