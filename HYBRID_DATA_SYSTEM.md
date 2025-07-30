# Hybrid Data Loading System

## Overview

This site now uses a bulletproof hybrid data loading architecture that provides seamless functionality in both HTTP and file:// environments.

## How It Works

### Primary: External JSON
- Site attempts to load `data.json` via fetch() first
- Works perfectly for HTTP served content (production, development servers)

### Fallback: Embedded Data
- If fetch fails (CORS, file:// URLs), uses `data-embedded.js`
- Contains complete site data (18 log entries, 12+ projects, 100+ other projects)
- Provides identical functionality to external JSON

### Smart Loading Strategy
```javascript
// 1. Try external data.json
const response = await fetch('data.json');

// 2. On failure, use embedded fallback
if (window.EMBEDDED_SITE_DATA) {
  data = window.EMBEDDED_SITE_DATA;
}

// 3. Route to same content loading logic
this.loadHomepage(data);
```

## Key Files

- **`data.json`** - Primary data source (edit this)
- **`data-embedded.js`** - Auto-generated fallback (don't edit manually)
- **`sync-embedded-data.js`** - Sync script to keep data consistent
- **`script.js`** - Enhanced SiteManager with hybrid loading

## Maintenance

### When You Update Content

1. Edit `data.json` as normal
2. Run the sync script:
   ```bash
   node sync-embedded-data.js
   ```
3. Commit both files together

### Sync Script Features

- ✅ Validates JSON syntax
- ✅ Preserves all data structure  
- ✅ Adds generation timestamp
- ✅ Reports sync statistics
- ✅ Error handling and validation

## Benefits

### For Users
- **Seamless experience** - Site works identically in all environments
- **No broken functionality** - Complete data available via fallback
- **Fast loading** - External JSON still primary (fastest)

### For Development
- **File:// compatibility** - Works when opening HTML files directly
- **No duplication** - Single source of truth (data.json)
- **Zero maintenance** - Automated sync keeps data current
- **Clean architecture** - SiteManager interface unchanged

## Architecture Reasoning

This follows the proven "graceful degradation with embedded fallback" pattern used by major frameworks:

1. **External-first** maintains performance and cacheability
2. **Complete fallback** ensures functionality in restrictive environments  
3. **Build-time sync** eliminates manual maintenance overhead
4. **Clean separation** preserves existing code structure

The result is a system that's both robust and maintainable - it "just works" everywhere while maintaining your fast and simple philosophy.