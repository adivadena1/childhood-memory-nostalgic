// childhood-memory-nostalgic — make.fun entry
// Writes one childhood-memory sentence (163 characters) to /output/entry.txt.
// Deterministic, no network, no randomness, no environment input.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The hem of my school skirt was let out three times, and the last time my mother left the stitches in, so I would still have room to grow into a year she never saw.";

// Sealed gate (competition rules): UTF-8 text of 1 to 280 characters,
// not only white space, a single sentence on one line. Fail hard if violated.
if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(`entry length ${LINE.length} outside gate 1-280`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Write-verify: read the file back and confirm the bytes on disk are
// exactly the validated line. A silent short write or encoding slip
// must fail loudly here, not surface later as an invalid entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt round-trip mismatch: disk content differs from LINE");
}
if (written.length < 1 || written.length > 280 || written.trim().length === 0) {
  throw new Error("entry.txt fails the gate on re-read");
}
