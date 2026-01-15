import express from "express"
import cors from "cors";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"
import { transcribe, segments } from "./services/transcribe.js";
import { convert_to_context } from "./services/b_roll_to_context.js";
import { generateTimeline } from "./services/timeline_generator.js";

ffmpeg.setFfmpegPath(ffmpegPath)
const corsOptions = {
  origin: 'http://localhost:5173',
};
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors(corsOptions));


app.post(
  "/upload",
  upload.fields([
    { name: "a_roll", maxCount: 1 },
    { name: "b_rolls", maxCount: 10 },
  ]),
  (req, res) => {
    const aRoll = req.files['a_roll'][0];
    const bRolls = req.files['b_rolls'] || [];
    const aRollPath = aRoll.path;
    const outputPath = `${aRollPath}.mp3`;

    const bRollContextsPromise = Promise.all(
      bRolls.map(async (file) => {
        try {
          console.log(`Processing B-roll: ${file.originalname}`);
          const context = await convert_to_context(file.path);
          return { filename: file.originalname, path: file.path, context };
        } catch (e) {
          console.error(`Error processing B-roll ${file.originalname}:`, e);
          return { filename: file.originalname, path: file.path, error: e.message };
        }
      })
    );

    ffmpeg(aRollPath)
      .noVideo()
      .audioCodec("libmp3lame")
      .save(outputPath)
      .on("end", async () => {
        const transcriptionText =  await transcribe(outputPath);
        const contextArray = await segments(transcriptionText);
        const bRollContexts = await bRollContextsPromise;
        const result = await generateTimeline(contextArray, bRollContexts);
        res.json({ result: result });
      })
      .on("error", (err) => {
        res.status(500).json({ error: err.message });
      });
  }
);

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})