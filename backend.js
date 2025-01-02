const OpenAI = require('openai');
const express = require('express');
const fs = require('fs');

const responseSchemaVersion = "1.0";
const loadedSchema = JSON.parse(fs.readFileSync(`./schemas/${responseSchemaVersion}/response.schema.json`));
const responseSchema = loadedSchema.responseSchema;

if (loadedSchema.version !== responseSchemaVersion)
  throw new Error(`Wrong response schema version! Expected: ${responseSchemaVersion}, loaded: ${loadedSchema.version}`);

const openaiApiKey = fs.readFileSync('./openai-api-key');

const app = express();
app.use(express.static('frontend'));
const port = 3000;

const aiClient = new OpenAI({
  apiKey: openaiApiKey
});

app.get('/text_mock', (req, res) => {
  const mockFile = `./storage/${responseSchemaVersion}/apawl_2024-12-29_16-44-44.json`;
  
  console.log(`Return mocked data: ${mockFile}`);
  
  res.send(JSON.parse(fs.readFileSync(mockFile)).content);
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
  
  res.send(content);
});

app.listen(port, () => {
  console.log(`=== Simple text generator ===`);
  console.log(`App listening on port ${port}`);
});

function basicPrompt(topic, level) {
  return `
Generate title in Spanish with translation into Russian for text with topic "${topic}", use style as in popular magazines.
Check that title is in Spanish. 
You should provide text in Spanish level ${level}, with translation into Russian.
Text should correspond following requirements:
    - be split into paragraphs;
    - include at least 3-5 paragraphs with 5-6 sentences each;
    - use numbers in words in Spanish;
    - use indiderect form for speech if dialogs expected;
    - sentences and paragraphs SHOULD NOT be empty.
Check that the text includes at least 15 sentences.
Make a list of 20-25 words used in the text with translation into Russian according to the following requirements:
    - 5-7 verbs, 5-7 adjectives, 5-7 substantives, 5-7 adverbs;
    - choose the most hard words;
    - verbs should be in INFINITIVE form, adjectives in SINGLE MASCULINE form, and substantives in SINGLE form;
    - check that words are in the right forms described in the previous requirement;
    - check that the amount of words is at least 20;
    - the list should be SORTED alphabetically.
Based on information in text add 5 questions about it to check how the student understood the text.
Information in the text SHOULD BE sufficient to answer all questions correctly.
Each question should have 4 variants of answers, 1-2 of them should have more than one correct answer.
Check that correct options for answers are really correct.
Add 3-5 tags to the result.
Check that in the generated data there are no words in other languages than Spanish except proper nouns.
Extract all proper nouns from the following text. Proper nouns include names of specific people, places (e.g., regions like 'Caribe'), organizations, titles, or other named entities. Return the results as an array without duplicates.
Perform an additional check to ensure that:
    - no words or phrases from languages other than Spanish (except translations into Russian) are included in the text, questions, or word lists;
    - Spanish words are used in correct grammatical forms: times, gender (masculine/femenin), sentences structure, etc.;
    - proper nouns are used only when culturally appropriate and relevant to the topic.
`;
}

function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function generateFileName(id) {
  const date = new Date();
  return id + `_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

function generateSlug(sentence) {
  return sentence
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Decompose accents into separate characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}
