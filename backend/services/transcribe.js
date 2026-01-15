import { OpenAI } from "openai";
import fs from "fs";
import { configDotenv } from "dotenv";
configDotenv();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function transcribe(path) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(path),
    model: "whisper-1",   
    prompt: "Transcribe in Hinglish using Roman English letters, not Devanagari. Do not translate, only transliterate.",
    response_format: "verbose_json",
    temperature: 0,
  });
  return transcription.segments;
}

export async function segments(segmentArray) {
    const contextArray = [];

  for (const seg of segmentArray) {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Translate Hinglish/Hindi to English and summarize the context in one short sentence."
        },
        {
          role: "user",
          content: seg.text
        }
      ]
    });

    contextArray.push({
      start: seg.start,
      end: seg.end,
      context: gptResponse.choices[0].message.content
    });
  }

  return contextArray;
}