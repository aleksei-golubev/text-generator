import express from 'express';
import path from 'path';

import { getDir } from './shared/utils.mjs';

const __dirname = getDir(import.meta.url);
const port = 3001;
const app = express();

app.use(express.static(path.join(__dirname, 'generated-statics')));

app.listen(port, () => {
  console.log(`=== Simple text generator [Check] ===`);
  console.log(`App listening on port ${port}`);
});