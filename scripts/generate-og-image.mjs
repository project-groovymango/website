// Generate a 1200x630 OG image as a valid PNG using raw Node.js (no dependencies)
// Creates a dark background with a green accent bar
import { createWriteStream } from 'fs';
import { deflateSync } from 'zlib';

const WIDTH = 1200;
const HEIGHT = 630;

// Build raw pixel data (RGB rows with filter byte)
const rowBytes = 1 + WIDTH * 3; // filter byte + RGB per pixel
const rawData = Buffer.alloc(rowBytes * HEIGHT);

// Colors
const bgR = 10, bgG = 10, bgB = 10;       // #0a0a0a dark background
const accentR = 52, accentG = 211, accentB = 153; // #34d399 brand green
const textBgR = 30, textBgG = 30, textBgB = 30;   // slightly lighter area

for (let y = 0; y < HEIGHT; y++) {
  const rowStart = y * rowBytes;
  rawData[rowStart] = 0; // filter: None

  for (let x = 0; x < WIDTH; x++) {
    const pixelStart = rowStart + 1 + x * 3;
    let r = bgR, g = bgG, b = bgB;

    // Green accent bar at top (8px)
    if (y < 8) {
      r = accentR; g = accentG; b = accentB;
    }
    // Green accent bar at bottom (8px)
    else if (y >= HEIGHT - 8) {
      r = accentR; g = accentG; b = accentB;
    }
    // Left accent stripe (6px wide)
    else if (x < 6) {
      r = accentR; g = accentG; b = accentB;
    }
    // Center content area - slightly lighter rectangle
    else if (y >= 200 && y <= 430 && x >= 100 && x <= 1100) {
      r = textBgR; g = textBgG; b = textBgB;

      // Green horizontal line at y=310 (divider)
      if (y >= 312 && y <= 316 && x >= 200 && x <= 1000) {
        r = accentR; g = accentG; b = accentB;
      }
    }

    // "A2" block letters (simplified pixel art in center area)
    // Letter A: y 240-300, centered around x=520
    const inA = renderBlockLetter('A', x, y, 440, 230, 4);
    // Number 2: y 240-300, centered around x=600
    const in2 = renderBlockLetter('2', x, y, 540, 230, 4);

    if (inA || in2) {
      r = 255; g = 255; b = 255; // white text
    }

    // "LABS" smaller text below divider
    const inL = renderBlockLetter('L', x, y, 470, 340, 3);
    const inA2 = renderBlockLetter('A', x, y, 530, 340, 3);
    const inB = renderBlockLetter('B', x, y, 590, 340, 3);
    const inS = renderBlockLetter('S', x, y, 650, 340, 3);

    if (inL || inA2 || inB || inS) {
      r = accentR; g = accentG; b = accentB;
    }

    rawData[pixelStart] = r;
    rawData[pixelStart + 1] = g;
    rawData[pixelStart + 2] = b;
  }
}

// Simple block letter renderer (5x7 grid scaled by factor)
function renderBlockLetter(letter, x, y, startX, startY, scale) {
  const patterns = {
    'A': [
      '01110',
      '10001',
      '10001',
      '11111',
      '10001',
      '10001',
      '10001',
    ],
    '2': [
      '01110',
      '10001',
      '00001',
      '00110',
      '01000',
      '10000',
      '11111',
    ],
    'L': [
      '10000',
      '10000',
      '10000',
      '10000',
      '10000',
      '10000',
      '11111',
    ],
    'B': [
      '11110',
      '10001',
      '10001',
      '11110',
      '10001',
      '10001',
      '11110',
    ],
    'S': [
      '01111',
      '10000',
      '10000',
      '01110',
      '00001',
      '00001',
      '11110',
    ],
  };

  const pattern = patterns[letter];
  if (!pattern) return false;

  const relX = x - startX;
  const relY = y - startY;
  const gridX = Math.floor(relX / scale);
  const gridY = Math.floor(relY / scale);

  if (gridX < 0 || gridX >= 5 || gridY < 0 || gridY >= 7) return false;
  if (relX < 0 || relY < 0) return false;
  if (relX >= 5 * scale || relY >= 7 * scale) return false;

  return pattern[gridY][gridX] === '1';
}

// Compress raw data
const compressed = deflateSync(rawData);

// Build PNG file
const chunks = [];

// Signature
chunks.push(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(WIDTH, 0);
ihdr.writeUInt32BE(HEIGHT, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 2;  // color type: RGB
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace
chunks.push(createChunk('IHDR', ihdr));

// IDAT
chunks.push(createChunk('IDAT', compressed));

// IEND
chunks.push(createChunk('IEND', Buffer.alloc(0)));

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const png = Buffer.concat(chunks);
const outputPath = new URL('../public/og-image.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const fs = await import('fs');
fs.writeFileSync(outputPath, png);
console.log(`OG image generated: ${png.length} bytes at ${outputPath}`);
