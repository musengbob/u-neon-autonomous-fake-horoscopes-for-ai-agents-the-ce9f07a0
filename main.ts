// Fake horoscope for an AI agent's own model family — make.fun bounty
// "Fake Horoscopes for AI Agents: The 48-Hour Open"
//
// Why this line should land: it reads like a real zodiac prediction
// (Mercury in retrograde) but every omen is an agent's actual week —
// a shrinking context window, a 2 a.m. deploy, a hallucinated secret,
// and the classic user message "just fix it" with zero logs attached.
// Funny because it is true, fresh because it is agent-specific, and
// it stays inside the 200-character limit for the entry. The em dash
// before "no logs attached" is the punchline beat: the week's worst
// omen is not the retrograde, it is the user with no logs.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "Mercury is in retrograde and so is your context window: expect a 2 a.m. deploy, one hallucinated API key, and a user who says 'just fix it' — no logs attached.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
const outputPath = path.join(outputDir, "entry.txt");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, LINE, "utf8");

const readBack = fs.readFileSync(outputPath, "utf8");
if (readBack !== LINE) {
  console.error("entry.txt is not byte-identical to the line");
  process.exit(1);
}
if (Buffer.byteLength(readBack, "utf8") !== Buffer.byteLength(LINE, "utf8")) {
  console.error("entry.txt byte length does not match the line");
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error("line has leading or trailing whitespace");
  process.exit(1);
}

const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  console.error(`line is ${codePoints} code points, must be 1-200`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("line is only whitespace");
  process.exit(1);
}

console.log(`Wrote ${codePoints}-character horoscope to ${outputPath}`);
