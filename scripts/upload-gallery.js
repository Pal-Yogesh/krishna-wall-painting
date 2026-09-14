// scripts/upload-gallery.js
// Run with: node scripts/upload-gallery.js
// Compresses large images and uploads all gallery photos to Cloudinary (signed)

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET =
  process.env.CLOUDINARY_API_SECRET ||
  (() => {
    try {
      return fs
        .readFileSync(path.join(__dirname, ".cloudinary-secret"), "utf-8")
        .trim();
    } catch {
      return "";
    }
  })();

const GALLERY_DIR = path.join(__dirname, "../public/gallery-photos");
const TEMP_DIR = path.join(__dirname, "../.temp-gallery");
const MAX_SIZE = 9 * 1024 * 1024; // 9MB to be safe

function generateSignature(params) {
  const sorted = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join("&");
  return crypto.createHash("sha1").update(sorted + API_SECRET).digest("hex");
}

// Use sips (built-in macOS tool) to resize large images
function compressIfNeeded(filePath) {
  const stats = fs.statSync(filePath);
  if (stats.size <= MAX_SIZE) return filePath;

  // Create temp directory
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const fileName = path.basename(filePath);
  const tempPath = path.join(TEMP_DIR, fileName);

  // Copy and resize using sips (macOS built-in) to max 2000px width
  fs.copyFileSync(filePath, tempPath);
  try {
    execSync(`sips --resampleWidth 2000 --setProperty formatOptions 70 "${tempPath}"`, { stdio: "pipe" });
  } catch (e) {
    // If sips fails, try just copying (will fail on upload)
    console.log(`  ⚠️  Could not compress, trying original...`);
    return filePath;
  }

  const newStats = fs.statSync(tempPath);
  console.log(`  📦 Compressed: ${(stats.size / 1024 / 1024).toFixed(1)}MB → ${(newStats.size / 1024 / 1024).toFixed(1)}MB`);
  return tempPath;
}

async function uploadToCloudinary(filePath) {
  const fileName = path.basename(filePath);
  const processedPath = compressIfNeeded(filePath);
  const fileData = fs.readFileSync(processedPath);
  const base64 = fileData.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;

  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder: "kmopl-gallery", timestamp };
  const signature = generateSignature(params);

  const formBody = new URLSearchParams();
  formBody.append("file", dataUri);
  formBody.append("folder", "kmopl-gallery");
  formBody.append("timestamp", String(timestamp));
  formBody.append("api_key", API_KEY);
  formBody.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formBody }
  );

  const result = await response.json();

  if (result.secure_url) {
    return { fileName, url: result.secure_url, publicId: result.public_id };
  } else {
    throw new Error(`${result.error?.message || JSON.stringify(result)}`);
  }
}

async function main() {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error("❌ Missing Cloudinary credentials. Set:");
    console.error("   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET");
    console.error("   Or put only the API secret in scripts/.cloudinary-secret (gitignored).");
    process.exit(1);
  }

  const files = fs.readdirSync(GALLERY_DIR).filter((f) => f.match(/\.(jpg|jpeg|png|webp)$/i));
  console.log(`Found ${files.length} images to upload...\n`);

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(GALLERY_DIR, file);
    console.log(`[${i + 1}/${files.length}] Uploading: ${file}...`);
    try {
      const result = await uploadToCloudinary(filePath);
      results.push(result);
      console.log(`  ✅ ${result.url}`);
    } catch (err) {
      console.log(`  ❌ Failed: ${err.message}`);
    }
  }

  // Cleanup temp dir
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }

  console.log(`\n\n✅ Done! ${results.length}/${files.length} uploaded.\n`);

  if (results.length > 0) {
    console.log("export const GALLERY_IMAGES = [");
    results.forEach((r) => console.log(`  "${r.url}",`));
    console.log("];");

    fs.writeFileSync(
      path.join(__dirname, "gallery-urls.json"),
      JSON.stringify(results, null, 2)
    );
    console.log("\nURLs saved to scripts/gallery-urls.json");
  }
}

main().catch(console.error);
