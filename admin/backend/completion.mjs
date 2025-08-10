export function completion(model, aiClient, prompt, responseSchema) {
    switch (model) {
        case "gpt-4o-mini":
            return completion_gpt_4o_mini(aiClient, prompt, responseSchema);
        case "gpt-5":
            return completion_gpt_5(aiClient, prompt, responseSchema);
        default:
            throw new Error(`Unknown model: ${model}`);
    }
}

export function completion_gpt_4o_mini(aiClient, prompt, responseSchema) {
    return aiClient.chat.completions.create({
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
}

export function completion_gpt_5(aiClient, prompt, responseSchema) {
    return aiClient.responses.create({
        model: "gpt-5",
        input: [
            {
                role: "system",
                content: prompt
            }
        ],
        text: {
            format: {
                name: 'gpt_5_schema',
                type: "json_schema",
                schema: responseSchema,
                strict: true
            }
        },
        temperature: 1,
        max_output_tokens: 16384
    });
}