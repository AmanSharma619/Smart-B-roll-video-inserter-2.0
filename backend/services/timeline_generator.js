import OpenAI from "openai";
import { configDotenv } from "dotenv";
configDotenv();


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateTimeline(aRollContexts, bRollContexts) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
You are an expert AI video editor.

Your task:
- Match A-roll audio contexts with B-roll video contexts.
- Insert B-roll only where the meaning strongly matches.
- Build a chronological timeline.

Return JSON with EXACT structure:
{
  "timeline": [
    { "type": "a_roll", "start": number, "end": number, "context": string },
    { "type": "b_roll", "filename": string, "start": number, "end": number, "confidence": number, "reason": string }
  ],
  "insertions": [
    { "filename": string, "start": number, "end": number, "confidence": number, "reason": string }
  ]
}

Rules:
- Confidence must be between 0 and 1.
- Make sure the B-Roll has duration that fits within the A-Roll segment.
- Reason must explain why this B-roll matches the audio.
- Timeline must be fully chronological.
- Insertions must only contain B-roll objects, in the order they appear in the timeline.
`
      },
      {
        role: "user",
        content: `
A-Roll Segments:
${JSON.stringify(aRollContexts, null, 2)}

B-Roll Contexts:
${JSON.stringify(bRollContexts, null, 2)}

Generate the final timeline and insertions.
`
      }
    ]
  });

  const result = JSON.parse(response.choices[0].message.content);

return result;

}
