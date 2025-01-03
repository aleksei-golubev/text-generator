import express from 'express';
import path from 'path';
import { OpenAI } from 'openai'; 

import { basicPrompt } from './admin/backend/prompts.mjs';
import { getMockedContent, loadSchema, saveResponse, loadOpenApiKey } from './admin/backend/files.mjs';
import { getDir } from './admin/backend/utils.mjs';

const responseSchemaVersion = "1.0";
const responseSchema = loadSchema(responseSchemaVersion);
const __dirname = getDir(import.meta.url);
const port = 3000;

const app = express();

const aiClient = new OpenAI({
  apiKey: loadOpenApiKey()
});

app.use(express.static(path.join(__dirname, 'admin/frontend')));
app.get('/scripts/renderer.js', (req, res) => {
  res.sendFile(path.join(__dirname, './admin/shared/renderer.js'));
})

app.get('/text_mock', (req, res) => {  
  res.send(getMockedContent(responseSchemaVersion));
});

app.get('/text', async (req, res) => {
  const topic = req.query.topic;
  const level = req.query.level;

  console.log(`Generate: "${topic}", ${level}`);

  let prompt = basicPrompt(topic, level);

  const response = await aiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": prompt
          }
        ]
      }
    ],
    response_format: {
      "type": "json_schema",
      "json_schema": responseSchema
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  const content = JSON.parse(response.choices[response.choices.length-1].message.content);

  saveResponse(prompt, responseSchemaVersion, content, response);
  
  res.send(content);
});

app.listen(port, () => {
  console.log(`=== Simple text generator ===`);
  console.log(`App listening on port ${port}`);
});