# Johnny Hockin - Personal Website

**→ For complete project documentation, see [PROJECT_SPEC.md](PROJECT_SPEC.md)**

Raw experiments in code, film, and invention. Personal process, projects, and digital lab notes.

## Quick Start

1. Open `index.html` in a web browser
2. Or serve with any static file server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## Key Features

- 180px modular grid system
- Font toggle (Courier Prime ↔ Helvetica Neue) 
- Chaos mode (80s aesthetic)
- Custom cursor and underlines
- JSON-based CMS with hybrid data loading
- Left-aligned design throughout
- Works seamlessly via HTTP, HTTPS, and file:// URLs

## Hybrid Data Loading Architecture

Three-tier fallback system for bulletproof functionality:

1. **Primary**: External `data.json` via fetch (optimal for HTTP, caching, development)
2. **Secondary**: Embedded JavaScript data (complete fallback for file:// access) 
3. **Tertiary**: Minimal placeholder data (absolute failsafe)

### Workflow
1. Edit `data.json` (single source of truth)
2. Run `node sync-data.js` or `npm run sync-data` to update embedded fallback
3. Deploy both `data.json` and `data-embedded.js`

### Console Output
- `✅ External data loaded successfully` - Primary path working
- `📦 Using embedded fallback data` - Secondary path for file:// access  
- `⚠️ No embedded data available` - Tertiary failsafe engaged

---

This site embodies experimental minimalism: maximum functionality with minimal complexity.