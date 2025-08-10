import express from 'express';
import path from 'path';
import { OpenAI } from 'openai';

import { basicPrompt, dialogPrompt } from './admin/backend/prompts.mjs';
import { getMockedContent, getMockedDialogContent, loadSchema, saveResponse, loadOpenApiKey, saveRawResponse } from './admin/backend/files.mjs';
import { getDir } from './shared/utils.mjs';
import { fullContent } from './shared/templates/full-content.mjs';
import { completion } from './admin/backend/completion.mjs';
import { overrideGetFromSharedDir } from './admin/backend/utils.mjs';

const __dirname = getDir(import.meta.url);
const responseSchemaVersion = "1.0";
const responseSchema = loadSchema(responseSchemaVersion);
const responseSchema2 = loadSchema("2.0");

const port = 3000;

const app = express();
app.use(express.json());

const aiClient = new OpenAI({
  apiKey: loadOpenApiKey()
});

app.use(express.static(path.join(__dirname, 'admin/frontend')));

overrideGetFromSharedDir(__dirname, app, {
  '/scripts/handlers.js': './shared/frontend/scripts/handlers.js',
  '/scripts/utils.js': './shared/frontend/scripts/utils.js',
  '/styles/main.css': './shared/frontend/styles/main.css',
  '/favicon.svg': './shared/frontend/favicon.svg'
})

/* 

Non working example with GPT-5 below.

app.get('/text', async (req, res) => {
  const topic = req.query.topic;
  const level = req.query.level;

  console.log(`Generate: "${topic}", ${level}`);

  let prompt = basicPrompt(topic, level);

  const response = await completion('gpt-5', aiClient, prompt, responseSchema2);

  saveRawResponse(prompt, response, "2.0");

  // Possibly response format is changed.
  const content = JSON.parse(response.choices[response.choices.length - 1].message.content);

  saveResponse('text', prompt, "2.0", content, response);

  res.send(fullContent(content));
});

*/



app.get('/text', async (req, res) => {
  const topic = req.query.topic;
  const level = req.query.level;

  console.log(`Generate: "${topic}", ${level}`);

  let prompt = basicPrompt(topic, level);

  const response = await completion('gpt-4o-mini', aiClient, prompt, responseSchema);

  saveRawResponse(prompt, response, responseSchemaVersion);

  const content = JSON.parse(response.choices[response.choices.length - 1].message.content);

  saveResponse('text', prompt, responseSchemaVersion, content, response);

  res.send(fullContent(content));
});

app.post('/dialog', async (req, res) => {
  const params = req.body;
  console.log(`Generate dialog: "${params.place}", ${params.level}`);

  let prompt = dialogPrompt(params);

  const response = await completion('gpt-4o-mini', aiClient, prompt, responseSchema);
  const content = JSON.parse(response.choices[response.choices.length - 1].message.content);

  saveResponse('dialog', prompt, responseSchemaVersion, content, response);

  res.send(fullContent(content, { speech: false }));
});

app.get('/text_mock', (req, res) => {
  res.send(getMockedContent(responseSchemaVersion));
});

app.post('/dialog_mock', (req, res) => {
  res.send(getMockedDialogContent(responseSchemaVersion));
});

app.listen(port, () => {
  console.log(`=== Simple text generator [Admin] ===`);
  console.log(`App listening on port ${port}`);
});