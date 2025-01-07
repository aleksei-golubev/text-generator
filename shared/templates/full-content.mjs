import { header } from "./header.mjs";
import { questions } from "./questions.mjs";
import { text } from "./text.mjs";
import { words } from "./words.mjs";

export function fullContent(content) {
    return `<div class='text-container noselect'>
        ${header(content.title, content.tags, content.level)}
        <div class='body'>
            ${text(content.text)}
            <div class='addition'>
                ${questions(content.questions)}
                ${words(content.words)}
            </div>
        </div>
    </div>`;
}
