export function basicPrompt(topic, level) {
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
  Extract all proper nouns from the generated text. Proper nouns include names of specific people, places (e.g., regions like 'Caribe'), organizations, titles, or other named entities. Return the results as an array without duplicates.
  Perform an additional check to ensure that:
      - no words or phrases from languages other than Spanish (except translations into Russian) are included in the text, questions, or word lists;
      - Spanish words are used in correct grammatical forms: times, gender (masculine/femenin), sentences structure, etc.;
      - proper nouns are used only when culturally appropriate and relevant to the topic.
  `;
}

export function dialogPrompt(params) {
    return ` 
  You should provide dialog in Spanish level ${params.level}, with translation into Russian.
  Place of dialog: ${params.place}
  Context of dialog: ${params.context}
  Characters:
    First:
      Role: ${params.persons[0].role}
      Mood: ${params.persons[0].mood}
      Sex: ${params.persons[0].sex}
      Description: ${params.persons[0].description}
    Second:
      Role: ${params.persons[1].role}
      Mood: ${params.persons[1].mood}
      Sex: ${params.persons[1].sex}
      Description: ${params.persons[1].description}
  If some of dialog parameters are missed generate random values for them based on known parameters.
  Generate names for characters. 
  Dialog should correspond following requirements:
      - each speach should be 1-3 sentences (use followgin form: [<b>Character Name</b>]: [Character turn]);
      - dialog should be split in paragraphs: for each speech add its own paragraph, e.g.:
          <b>Alex</b>: Hello!
          ---
          <b>Bob</b>: Hi! How do you do?
      - include at least 15-20 speach per character;
      - use numbers in words in Spanish;
      - sentences and paragraphs SHOULD NOT be empty.
  Check that the dialog includes at least 15 sentences.
  Check that each paragraph includes only one speech.
  Check tha dialog ends with only farewell speech per person.
  Make a list of 20-25 words used in the dialog with translation into Russian according to the following requirements:
      - 5-7 verbs, 5-7 adjectives, 5-7 substantives, 5-7 adverbs;
      - choose the most hard words;
      - verbs should be in INFINITIVE form, adjectives in SINGLE MASCULINE form, and substantives in SINGLE form;
      - check that words are in the right forms described in the previous requirement;
      - check that the amount of words is at least 20;
      - the list should be SORTED alphabetically.
  Generate title in Spanish with translation into Russian for generated dialog, use style as in popular magazines.
  Check that title is in Spanish.
  Based on information in dialog add 5 questions about it to check how the student understood the dialog.
  Information in the dialog SHOULD BE sufficient to answer all questions correctly.
  Each question should have 4 variants of answers, 1-2 of them should have more than one correct answer.
  Check that correct options for answers are really correct.
  Add 3-5 tags to the result.
  Check that in the generated data there are no words in other languages than Spanish except proper nouns.
  Extract all proper nouns from the generated dialog. Proper nouns include names of specific people, places (e.g., regions like 'Caribe'), organizations, titles, or other named entities. Return the results as an array without duplicates. Exclude names of characters of generated dialog.
  Perform an additional check to ensure that:
      - no words or phrases from languages other than Spanish (except translations into Russian) are included in the dialog, questions, or word lists;
      - Spanish words are used in correct grammatical forms: times, gender (masculine/femenin), sentences structure, etc.;
      - proper nouns are used only when culturally appropriate and relevant to the topic.
  `;
  }