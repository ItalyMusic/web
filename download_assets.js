// Script to download assets from Imperial College Egypt website
// This script extracts images, logos, and other public assets

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const baseUrl = 'https://imperialcollegeegypt.edu.eg';
const assetsDir = path.join(__dirname, 'imperial-college-site', 'public', 'assets');

// Create assets directory structure
const dirs = [
  assetsDir,
  path.join(assetsDir, 'images'),
  path.join(assetsDir, 'logos')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Log file for tracking downloads
const logFile = path.join(__dirname, 'asset_download_log.txt');
let logContent = '# Asset Download Log\n\n';

function log(message) {
  console.log(message);
  logContent += message + '\n';
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          log(`✓ Downloaded: ${url} -> ${filepath}`);
          resolve(filepath);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        log(`✗ Failed to download ${url}: Status ${response.statusCode}`);
        reject(new Error(`Status ${response.statusCode}`));
      }
    }).on('error', (err) => {
      log(`✗ Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

// Common image URLs to try (based on typical WordPress/website structures)
const imagesToDownload = [
  // Logo attempts
  { url: `${baseUrl}/wp-content/uploads/2021/01/logo.png`, name: 'logo.png', dir: 'logos' },
  { url: `${baseUrl}/wp-content/uploads/2021/01/logo-white.png`, name: 'logo-white.png', dir: 'logos' },
  { url: `${baseUrl}/wp-content/themes/imperial/images/logo.png`, name: 'logo-theme.png', dir: 'logos' },
  
  // Favicon
  { url: `${baseUrl}/favicon.ico`, name: 'favicon.ico', dir: 'logos' },
  
  // Hero/Banner images
  { url: `${baseUrl}/wp-content/uploads/2021/01/hero-banner.jpg`, name: 'hero-banner.jpg', dir: 'images' },
  { url: `${baseUrl}/wp-content/uploads/2021/01/home-banner.jpg`, name: 'home-banner.jpg', dir: 'images' },
  
  // Facility images
  { url: `${baseUrl}/wp-content/uploads/2021/01/facility-1.jpg`, name: 'facility-1.jpg', dir: 'images' },
  { url: `${baseUrl}/wp-content/uploads/2021/01/facility-2.jpg`, name: 'facility-2.jpg', dir: 'images' },
  
  // About images
  { url: `${baseUrl}/wp-content/uploads/2021/01/about-us.jpg`, name: 'about-us.jpg', dir: 'images' },
];

async function downloadAllAssets() {
  log('Starting asset download from Imperial College Egypt website...\n');
  log(`Base URL: ${baseUrl}`);
  log(`Assets Directory: ${assetsDir}\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const item of imagesToDownload) {
    const filepath = path.join(assetsDir, item.dir, item.name);
    try {
      await downloadFile(item.url, filepath);
      successCount++;
    } catch (err) {
      failCount++;
    }
  }
  
  log(`\n=== Download Summary ===`);
  log(`Successful: ${successCount}`);
  log(`Failed: ${failCount}`);
  log(`Total Attempted: ${imagesToDownload.length}`);
  
  // Save log file
  fs.writeFileSync(logFile, logContent);
  log(`\nLog saved to: ${logFile}`);
}

// Contact information extracted from the website
const contactInfo = {
  phones: ['01033313248', '01050239226', '01050239227'],
  email: 'info@imperialcollegeegypt.edu.eg',
  source: 'Homepage footer and contact sections'
};

log('\n=== Extracted Contact Information ===');
log(`Email: ${contactInfo.email}`);
log(`Phone Numbers: ${contactInfo.phones.join(', ')}`);
log(`Source: ${contactInfo.source}\n`);

// Run the download
downloadAllAssets().catch(err => {
  log(`\nFatal error: ${err.message}`);
  fs.writeFileSync(logFile, logContent);
});
