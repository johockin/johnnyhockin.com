// Data synchronization script
// Converts data.json to embedded JavaScript for file:// access fallback

const fs = require('fs');
const path = require('path');

try {
  // Read the source JSON file
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Generate the embedded JavaScript file
  const jsContent = `// Auto-generated from data.json - DO NOT EDIT MANUALLY
// Generated at: ${new Date().toISOString()}
// Run 'node sync-data.js' to regenerate when data.json changes

window.EMBEDDED_SITE_DATA = ${JSON.stringify(data, null, 2)};

console.log('📦 Embedded site data loaded (${Object.keys(data).length} sections)');
`;

  // Write the embedded data file
  const outputPath = path.join(__dirname, 'data-embedded.js');
  fs.writeFileSync(outputPath, jsContent, 'utf8');
  
  console.log('✓ Embedded data synchronized from data.json');
  console.log(`  - Source: ${dataPath}`);
  console.log(`  - Output: ${outputPath}`);
  console.log(`  - Size: ${Math.round(jsContent.length / 1024)}KB`);
  console.log('  - Include data-embedded.js in your HTML files before script.js');

} catch (error) {
  console.error('✗ Synchronization failed:', error.message);
  process.exit(1);
}