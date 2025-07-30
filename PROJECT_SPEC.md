# JOHNNY HOCKIN PERSONAL WEBSITE - PROJECT SPEC

⚠️ This is the **living god file** for the personal inventor-storyteller website project. This document is the source of truth for all project decisions, architectural intentions, user needs, tech stack context, and collaborator expectations.

---

## 🔍 LEVEL SET SUMMARY

- **Project name**: Johnny Hockin Personal Website
- **Purpose**: Raw experiments in code, film, and invention. Personal process, projects, and digital lab notes. A personal inventor-storyteller website with experimental minimalism.
- **Audience / users**: Visitors interested in experimental projects, potential collaborators, fellow inventors/makers
- **Most important outcome**: Raw, smart, precise, experimental aesthetic that reflects authentic maker mentality
- **Visual vs performance vs design**: Design excellence prioritized with Tom Sachs-influenced aesthetic, performance maintained through vanilla stack
- **Performance priority**: High (static site, no frameworks)
- **SEO priority**: Medium (semantic HTML structure)
- **Maintenance over time**: Ongoing (personal site evolution)
- **Deployment target(s)**: Netlify static hosting
- **Initial feature list**:
  - [x] 180px True Grid System with mathematical spacing
  - [x] Font toggle between Courier Prime and Helvetica Neue
  - [x] Chaos Mode (80s nightclub aesthetic)
  - [x] Custom cursor and favicon
  - [x] Explorer Log (homepage only)
  - [x] Project showcase with shuffle functionality
  - [x] JSON-based CMS
  - [x] Left-aligned design (NEVER center)
  - [x] Custom link underlines positioned naturally
  - [x] Vertical view controls on left edge
- **Tech constraints / requests from user**:
  - [x] Vanilla HTML/CSS/JS only (no frameworks, no build process)
  - [x] Static front-end for Netlify
  - [x] All text left-aligned, no centered content
  - [x] Typography: Courier Prime (default) or Helvetica Neue with toggle
  - [x] Custom JSON-based CMS
- **Other notes**: Tom Sachs aesthetic influence, modular and experimental approach

---

## 🏗️ TECH ARCHITECTURE

- **Framework / language**: Vanilla HTML/CSS/JavaScript - Chosen for maximum simplicity, performance, and maintainability without build complexity
- **Styling approach**: CSS Custom Properties with 180px grid system - Provides true modular layout with mathematical spacing relationships
- **State management**: Local storage for font preference and chaos mode - Simple persistence without external dependencies  
- **Directory structure plan**: Flat structure with logical file separation (styles.css, script.js, data.json)
- **Key dependencies**: None (Google Fonts for typography only)
- **Planned dev workflow**: Direct file editing, browser testing, git commits
- **Testing tools / approach**: Manual browser testing across devices, no automated testing for this simple static site

---

## 📒 CHANGELOG (REVERSE CHRONOLOGICAL)

### 2024-01-30 - Navigation & Link Styling Refinement
- **Changed**: Navigation from centered to left-aligned (NEVER center principle established)
- **Changed**: Custom underlines moved from 2px to -1px below text for natural positioning
- **Added**: Site-wide custom link styling with consistent underlines
- **Added**: CMS content uses default browser link colors for usability
- **Added**: Chaos mode link styling support
- **Updated**: Documentation structure and git initialization
- **Decision**: All links should have subtle custom underlines except in CMS content

### 2024-01-30 - Grid System Evolution
- **Changed**: Grid system from 100px to 180px for better proportions
- **Refined**: Spacing uses mathematical relationships (1x, 2x, 4x grid units)
- **Decision**: True grid system means elements snap to grid increments, no arbitrary spacing
- **Reference**: Tom Sachs website grid principles studied and incorporated

### 2024-01-30 - View Controls Repositioning  
- **Moved**: Font and chaos toggles from nav to left edge of screen
- **Added**: Vertical text orientation for view controls
- **Changed**: Font toggle displays in opposite font for clarity
- **Decision**: Interface controls grouped together but separate from main navigation

### 2024-01-30 - Navigation Structure Simplification
- **Removed**: Explorer Log as separate page (homepage only now)
- **Fixed**: Navigation links from "/" to relative paths (index.html, etc.)
- **Added**: Placeholder content throughout site for realistic feel
- **Decision**: Explorer Log belongs on homepage only, not as separate archive

### 2024-01-30 - Design Philosophy Establishment
- **Established**: No boxes/borders around content sections
- **Established**: Left-aligned text only, never centered
- **Established**: Modular grid-based layout over arbitrary positioning
- **Rejected**: "Cliche and obvious" design patterns
- **Added**: Custom cursor and favicon implementation

### 2024-01-30 - Initial Implementation
- **Created**: Full site structure with vanilla HTML/CSS/JS
- **Implemented**: JSON-based CMS with extensive placeholder content
- **Added**: Font switching functionality
- **Added**: Chaos mode with 80s aesthetic
- **Created**: All core pages (index, projects, project, about, contact)

---

## 🧱 ROADMAP & PIPELINE

### NOW
- All core features implemented and working

### NEXT  
- Content population with real projects and log entries
- Image optimization and integration
- Cross-browser testing and refinement

### LATER
- Mobile-specific interaction improvements
- Additional chaos mode variations
- Performance monitoring and optimization

### SOMEDAY
- Dark mode variant (separate from chaos mode)
- Project filtering/categorization
- Search functionality

### DEPRECATED
- Separate Explorer Log page (moved to homepage only)
- Centered navigation (changed to left-aligned)
- Box-based section layouts (removed for clean grid)

---

## 📌 MILESTONE COMMITS

- **M1**: Initial project scaffold with full vanilla implementation - `07b63ad`
- **M2**: Navigation refinement and link styling system
- **M3**: Grid system optimization and Tom Sachs influence integration
- **M4**: Content structure and CMS implementation

---

## 🎯 DESIGN PRINCIPLES & DECISIONS

### Core Aesthetic Philosophy
- **Raw, smart, precise, experimental** - Tom Sachs meets inventor
- **Modular and systematic** - Everything follows the 180px grid
- **Left-aligned only** - NEVER center content (user emphasis)
- **Minimal but functional** - Maximum functionality with minimal complexity

### Typography System
- **Primary**: Courier Prime (monospace, coding aesthetic)
- **Secondary**: Helvetica Neue (clean, minimal)
- **Toggle functionality**: Button shows in opposite font for clarity
- **Scale**: 13px-16px range for readability without overwhelming

### Grid System Logic
- **Base unit**: 180px (evolved from 100px for better proportions)
- **Spacing multipliers**: 1x (180px), 2x (360px), 4x (720px)
- **Half/quarter units**: 90px, 45px for padding and smaller spacing
- **Philosophy**: Elements snap to grid increments, no arbitrary positioning

### Color Strategy
- **Normal mode**: Black text on white (#000000 on #ffffff)
- **Accent color**: #666666 for subtle emphasis
- **Chaos mode**: Neon colors (#00ffff, #ff00ff, #ffff00) with dark background
- **CMS links**: Standard browser blue (#0066cc) for usability

### Interaction Design
- **Custom cursor**: 32x32px with 8,8 hotspot positioning
- **Link underlines**: Custom positioned -1px below text baseline
- **Hover states**: Color shift to accent color with underline emphasis
- **View controls**: Vertical orientation on left edge for space efficiency

---

## 📌 OPEN QUESTIONS

*Currently no open questions - all major decisions have been made and implemented.*

---

## 🤖 AI COLLABORATOR INSTRUCTIONS

- This file is the source of truth - reference it before any changes
- Document all decisions in the CHANGELOG with rationale
- Never center content (user has strong preference for left-alignment)
- Maintain the 180px grid system and mathematical spacing relationships
- All new features must align with the raw/experimental aesthetic
- CMS content (data.json) should maintain realistic placeholder quality
- Test all changes across font modes (Courier Prime and Helvetica)
- Test chaos mode compatibility with any new features
- Update roadmap when priorities or scope changes

### Specific Technical Guidelines
- Vanilla stack only - no frameworks or build processes
- CSS Custom Properties for theming and grid consistency
- Local storage for persistent user preferences
- Semantic HTML structure for accessibility and SEO
- Mobile-first responsive approach within grid constraints

---

## 📁 CURRENT FILE STRUCTURE

```
/
├── PROJECT_SPEC.md     # This file - the living god file
├── index.html          # Homepage with Explorer Log and Featured Projects
├── projects.html       # All projects listing page
├── project.html        # Individual project template with shuffle
├── about.html         # Biography page
├── contact.html       # Contact information page
├── styles.css         # Main stylesheet with 180px grid system
├── project.css        # Page-specific styles
├── script.js          # All JavaScript functionality
├── data.json          # JSON-based CMS with placeholder content
├── cursor.png         # Custom cursor (32x32px)
├── favicon*.png       # Favicons in multiple sizes
├── netlify.toml       # Deployment configuration
├── Photos that can be used/  # Project images folder
├── personal site swipe file/ # Design references (Tom Sachs, etc.)
├── .gitignore         # Git ignore patterns
└── README.md          # Simple onboarding (links to this file)
```

---

This file is sacred. Tend to it.