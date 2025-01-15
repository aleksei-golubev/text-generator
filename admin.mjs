import express from 'express';
import path from 'path';
import { OpenAI } from 'openai'; 

import { basicPrompt, dialogPrompt } from './admin/backend/prompts.mjs';
import { getMockedContent, getMockedDialogContent, loadSchema, saveResponse, loadOpenApiKey } from './admin/backend/files.mjs';
import { getDir } from './shared/utils.mjs';
import { fullContent } from './shared/templates/full-content.mjs';
import { completion } from './admin/backend/completion.mjs';

const __dirname = getDir(import.meta.url);
const responseSchemaVersion = "1.0";
const responseSchema = loadSchema(responseSchemaVersion);
const port = 3000;

const app = express();
app.use(express.json());

const aiClient = new OpenAI({
  apiKey: loadOpenApiKey()
});

app.use(express.static(path.join(__dirname, 'admin/frontend')));

app.get('/scripts/handlers.js', (req, res) => {
  res.sendFile(path.join(__dirname, './shared/frontend/scripts/handlers.js'));
});
app.get('/scripts/utils.js', (req, res) => {
  res.sendFile(path.join(__dirname, './shared/frontend/scripts/utils.js'));
});
app.get('/styles/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, './shared/frontend/styles/main.css'));
});
app.get('/favicon.svg', (req, res) => {
  res.sendFile(path.join(__dirname, './shared/frontend/favicon.svg'));
});

app.get('/text_mock', (req, res) => {  
  res.send(getMockedContent(responseSchemaVersion));
});

app.get('/text', async (req, res) => {
  const topic = req.query.topic;
  const level = req.query.level;

  console.log(`Generate: "${topic}", ${level}`);

  let prompt = basicPrompt(topic, level);

  const response = await completion(aiClient, prompt, responseSchema);
  const content = JSON.parse(response.choices[response.choices.length-1].message.content);

  saveResponse('text', prompt, responseSchemaVersion, content, response);
  
  res.send(fullContent(content));
});

app.post('/dialog', async (req, res) => {
  const params = req.body;  
  console.log(`Generate dialog: "${params.place}", ${params.level}`);

  let prompt = dialogPrompt(params);

  const response = await completion(aiClient, prompt, responseSchema);
  const content = JSON.parse(response.choices[response.choices.length-1].message.content);

  saveResponse('dialog', prompt, responseSchemaVersion, content, response);
  
  res.send(fullContent(content, {speech: false}));
});

app.post('/dialog_mock', (req, res) => {  
  res.send(getMockedDialogContent(responseSchemaVersion));
});

app.listen(port, () => {
  console.log(`=== Simple text generator [Admin] ===`);
  console.log(`App listening on port ${port}`);
});