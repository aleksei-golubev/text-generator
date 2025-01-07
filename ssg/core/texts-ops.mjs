export function groupTexts(texts) {
    let groupedTexts = new Map();
    texts.forEach(text => {
        if (groupedTexts.get(text.content.level)) {
            groupedTexts.get(text.content.level).push(text);
        } else {
            groupedTexts.set(text.content.level, [text]);
        }
    });
    return groupedTexts;
}