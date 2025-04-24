import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const flagsDir = path.join(__dirname, "../public/flags");
const outputFile = path.join(__dirname, "../src/data/countries.js");

// Read all SVG files from the flags directory
const flagFiles = fs
  .readdirSync(flagsDir)
  .filter((file) => file.endsWith(".svg"))
  .map((file) => ({
    name: file
      .replace(".svg", "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    flag: `/flags/${file}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Generate the countries.js content
const content = `export const countries = [
${flagFiles
  .map(
    (country) => `  {
    name: "${country.name}",
    flag: "${country.flag}"
  }`
  )
  .join(",\n")}
];`;

// Write to countries.js
fs.writeFileSync(outputFile, content);
console.log(`Generated countries.js with ${flagFiles.length} countries`);
