import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const flagsDir = path.join(__dirname, "../public/flags");

// Create flags directory if it doesn't exist
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          );
          return;
        }

        const file = fs.createWriteStream(filepath);
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Fetch countries and download flags
async function downloadFlags() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    // Filter out territories and sort alphabetically
    const independentCountries = countries
      .filter((country) => country.independent)
      .sort((a, b) => a.name.common.localeCompare(b.name.common));

    console.log(`Downloading ${independentCountries.length} flag images...`);

    for (const country of independentCountries) {
      const filename = `${country.name.common
        .toLowerCase()
        .replace(/\s+/g, "-")}.svg`;
      const filepath = path.join(flagsDir, filename);
      const flagUrl = country.flags.svg;

      try {
        await downloadFile(flagUrl, filepath);
        console.log(`Downloaded: ${filename}`);
      } catch (err) {
        console.error(`Error downloading ${filename}:`, err.message);
      }
    }

    console.log("Download complete!");
  } catch (err) {
    console.error("Error:", err);
  }
}

downloadFlags();
