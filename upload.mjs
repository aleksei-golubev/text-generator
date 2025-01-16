import fs from "fs";
import path from "path";
import { Client } from "basic-ftp";
import { getDir } from './shared/utils.mjs';

/**
 * Рекурсивно очищает удаленную директорию на FTP-сервере.
 * @param {Client} client - Экземпляр FTP-клиента.
 * @param {string} remoteDir - Удаленная директория.
 */
async function clearRemoteDirectory(client, remoteDir) {
    try {
        const remoteFiles = await client.list(remoteDir);

        for (const file of remoteFiles) {
            const remotePath = `${remoteDir}/${file.name}`;
            if (file.type === 1) {
                // Это файл
                console.log(`Deleting remote file: ${remotePath}`);
                await client.remove(remotePath);
            } else if (file.type === 2) {
                // Это директория
                console.log(`Deleting remote directory: ${remotePath}`);
                await clearRemoteDirectory(client, remotePath); // Рекурсивно очищаем
                await client.removeDir(remotePath); // Удаляем пустую директорию
            }
        }
    } catch (error) {
        console.error(`Error while clearing remote directory: ${error.message}`);
    }
}

/**
 * Рекурсивно загружает локальную директорию на FTP-сервер.
 * @param {Client} client - Экземпляр FTP-клиента.
 * @param {string} localDir - Локальная директория.
 * @param {string} remoteDir - Удаленная директория.
 */
async function uploadLocalDirectory(client, localDir, remoteDir) {
    const localEntries = fs.readdirSync(localDir);

    for (const entry of localEntries) {
        const localPath = path.join(localDir, entry);
        const remotePath = `${remoteDir}/${entry}`;

        if (fs.statSync(localPath).isDirectory()) {
            // Создаем директорию на сервере
            console.log(`Creating remote directory: ${remotePath}`);
            await client.ensureDir(remotePath);

            // Рекурсивно загружаем содержимое директории
            await uploadLocalDirectory(client, localPath, remotePath);
        } else if (fs.statSync(localPath).isFile()) {
            // Загружаем файл
            console.log(`Uploading file: ${remotePath}`);
            await client.uploadFrom(localPath, remotePath);
        }
    }
}

/**
 * Синхронизирует локальную директорию с удаленной: очищает удаленную директорию и загружает файлы с локальной.
 * @param {string} localDir - Локальная директория.
 * @param {string} remoteDir - Удаленная директория.
 * @param {object} ftpConfig - Настройки FTP (host, user, password).
 */
export async function syncLocalToRemote(localDir, remoteDir, ftpConfig) {
    const client = new Client();
    client.ftp.verbose = true; // Для логов (опционально)

    try {
        // Подключение к FTP серверу
        await client.access(ftpConfig);
        console.log("Connected to FTP server");

        // Очистка удаленной директории
        console.log(`Clearing remote directory: ${remoteDir}`);
        await clearRemoteDirectory(client, remoteDir);

        // Убедиться, что удаленная директория существует
        await client.ensureDir(remoteDir);

        // Загрузка локальной директории на FTP
        console.log(`Uploading local directory: ${localDir} to remote directory: ${remoteDir}`);
        await uploadLocalDirectory(client, localDir, remoteDir);

        console.log("Synchronization complete.");
    } catch (error) {
        console.error("Error during synchronization:", error);
    } finally {
        client.close();
    }
}

// Конфигурация и вызов
const cfg = JSON.parse(fs.readFileSync('ftp-credentials.json'));

const ftpConfig = {
    host: cfg.host,
    user: cfg.user,
    password: atob(cfg.password),
    secure: false
};
const __dirname = getDir(import.meta.url);

const localDir = path.join(__dirname, 'generated-statics');
const remoteDir = cfg.dir;

// Выполняем синхронизацию
syncLocalToRemote(localDir, remoteDir, ftpConfig);