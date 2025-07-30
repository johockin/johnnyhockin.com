#!/usr/bin/env node

/**
 * Sync Embedded Data Script
 * 
 * Synchronizes data.json with the embedded data fallback file (data-embedded.js)
 * This ensures that the complete fallback data is always up-to-date with the primary data source
 * 
 * Usage: node sync-embedded-data.js
 */

const fs = require('fs');
const path = require('path');

// File paths
const DATA_JSON_PATH = 'data.json';
const EMBEDDED_DATA_PATH = 'data-embedded.js';

// ANSI color codes for better terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateDataStructure(data) {
  const required = ['site', 'explorerLog', 'projects', 'otherProjects'];
  const missing = required.filter(key => !data[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required keys: ${missing.join(', ')}`);
  }
  
  // Validate array structures
  if (!Array.isArray(data.explorerLog)) {
    throw new Error('explorerLog must be an array');
  }
  
  if (!Array.isArray(data.projects)) {
    throw new Error('projects must be an array');  
  }
  
  if (!Array.isArray(data.otherProjects)) {
    throw new Error('otherProjects must be an array');
  }
  
  // Validate site object
  if (!data.site.title || !data.site.description) {
    throw new Error('site object must have title and description');
  }
  
  return true;
}

function generateEmbeddedDataFile(data) {
  const timestamp = new Date().toISOString().split('T')[0];
  
  const template = `// Embedded Data Fallback - Auto-generated from data.json
// Last updated: ${timestamp}
// This file provides complete fallback data when external data.json cannot be loaded

window.EMBEDDED_DATA = ${JSON.stringify(data, null, 2)};

// Data integrity check
if (window.EMBEDDED_DATA) {
  console.log('📦 Embedded data loaded successfully:', {
    explorerLogEntries: window.EMBEDDED_DATA.explorerLog?.length || 0,
    projects: window.EMBEDDED_DATA.projects?.length || 0,
    otherProjects: window.EMBEDDED_DATA.otherProjects?.length || 0
  });
} else {
  console.error('❌ Failed to load embedded data');
}`;

  return template;
}

function getDataStats(data) {
  return {
    explorerLogEntries: data.explorerLog?.length || 0,
    projects: data.projects?.length || 0,
    featuredProjects: data.projects?.filter(p => p.featured)?.length || 0,
    otherProjects: data.otherProjects?.length || 0,
    totalProjects: (data.projects?.length || 0) + (data.otherProjects?.length || 0)
  };
}

function compareFiles() {
  try {
    const dataJson = fs.readFileSync(DATA_JSON_PATH, 'utf8');
    const embeddedJs = fs.readFileSync(EMBEDDED_DATA_PATH, 'utf8');
    
    // Extract the JSON from the embedded file
    const match = embeddedJs.match(/window\.EMBEDDED_DATA = ({[\s\S]*?});/);
    if (!match) {
      return { upToDate: false, reason: 'Cannot parse embedded data' };
    }
    
    const embeddedJson = match[1];
    const dataJsonFormatted = JSON.stringify(JSON.parse(dataJson), null, 2);
    
    return {
      upToDate: embeddedJson === dataJsonFormatted,
      reason: embeddedJson === dataJsonFormatted ? 'Files are synchronized' : 'Content differs'
    };
  } catch (error) {
    return { upToDate: false, reason: error.message };
  }
}

async function main() {
  log('🔄 Sync Embedded Data Script', 'bold');
  log('===============================', 'cyan');
  
  try {
    // Check if files exist
    if (!fs.existsSync(DATA_JSON_PATH)) {
      throw new Error(`Primary data file not found: ${DATA_JSON_PATH}`);
    }
    
    // Read and validate primary data
    log('📖 Reading primary data file...', 'blue');
    const dataJson = fs.readFileSync(DATA_JSON_PATH, 'utf8');
    let data;
    
    try {
      data = JSON.parse(dataJson);
    } catch (parseError) {
      throw new Error(`Invalid JSON in ${DATA_JSON_PATH}: ${parseError.message}`);
    }
    
    log('✅ Primary data file loaded successfully', 'green');
    
    // Validate data structure
    log('🔍 Validating data structure...', 'blue');
    validateDataStructure(data);
    log('✅ Data structure validation passed', 'green');
    
    // Get and display statistics
    const stats = getDataStats(data);
    log('\n📊 Data Statistics:', 'magenta');
    log(`   • Explorer Log Entries: ${stats.explorerLogEntries}`, 'cyan');
    log(`   • Featured Projects: ${stats.featuredProjects}`, 'cyan');
    log(`   • Total Projects: ${stats.projects}`, 'cyan');
    log(`   • Other Projects: ${stats.otherProjects}`, 'cyan');
    log(`   • Grand Total Projects: ${stats.totalProjects}`, 'cyan');
    
    // Check if files are already synchronized
    if (fs.existsSync(EMBEDDED_DATA_PATH)) {
      log('\n🔍 Checking synchronization status...', 'blue');
      const comparison = compareFiles();
      
      if (comparison.upToDate) {
        log('✅ Files are already synchronized!', 'green');
        log('   No update needed.', 'green');
        return;
      } else {
        log(`📝 Files need synchronization: ${comparison.reason}`, 'yellow');
      }
    } else {
      log('📝 Creating embedded data file for the first time...', 'yellow');
    }
    
    // Generate embedded data file
    log('🔧 Generating embedded data file...', 'blue');
    const embeddedContent = generateEmbeddedDataFile(data);
    
    // Write the file
    fs.writeFileSync(EMBEDDED_DATA_PATH, embeddedContent, 'utf8');
    log(`✅ Successfully created: ${EMBEDDED_DATA_PATH}`, 'green');
    
    // Verify the generated file
    log('🔍 Verifying generated file...', 'blue');
    const verification = compareFiles();
    
    if (verification.upToDate) {
      log('✅ Verification passed - files are synchronized!', 'green');
    } else {
      log(`⚠️  Verification warning: ${verification.reason}`, 'yellow');
    }
    
    log('\n🎯 Sync Complete!', 'bold');
    log('================', 'cyan');
    log('Your embedded data fallback is now synchronized with data.json', 'green');
    log('Users will get the complete experience even when data.json cannot be loaded.', 'green');
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    log('Sync failed. Please check the error above and try again.', 'red');
    process.exit(1);
  }
}

// Handle command line execution
if (require.main === module) {
  main().catch(error => {
    log(`\n💥 Unexpected error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  validateDataStructure,
  generateEmbeddedDataFile,
  getDataStats,
  compareFiles
};