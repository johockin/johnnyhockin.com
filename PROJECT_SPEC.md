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
  - [x] **COMPREHENSIVE RESPONSIVE SYSTEM** (see detailed journey below)
  - [x] **HYBRID DATA LOADING SYSTEM** (external JSON + embedded fallback)
  - [x] **FOUR-TIER RESPONSIVE LAYOUT** (mobile → side-by-side → three-column → grid)
  - [x] **TOM SACHS PAGE LAYOUTS** (Biography: CSS columns, Contact: 3-column blocks, Projects: Exhibition table)
  - [ ] **WORKSHOP MODE CMS** (Konami code + PIN authentication, live editing via Netlify Functions)
- **Tech constraints / requests from user**:
  - [x] Vanilla HTML/CSS/JS only (no frameworks, no build process)
  - [x] Static front-end for Netlify
  - [x] All text left-aligned, no centered content
  - [x] Typography: Courier Prime (default) or Helvetica Neue with toggle
  - [x] Custom JSON-based CMS
- **Other notes**: Tom Sachs aesthetic influence, modular and experimental approach

---

## 🎯 COMPREHENSIVE RESPONSIVE DESIGN JOURNEY

### The Challenge
After implementing the basic site architecture, the user requested a complete responsive system that would work perfectly across all screen sizes while maintaining the Tom Sachs aesthetic and left-aligned philosophy. This became a deep exploration of modern CSS layout techniques and responsive design principles.

### The Four-Tier Responsive System

**TIER 1: Mobile First (< 600px)**
- **Layout**: Vertical stack - Nav → Tagline → Explorer Log → Featured Projects → Footer
- **Tagline**: Shown at top using `mobile-tagline` class
- **Footer**: Contains quote + design controls
- **Key Insight**: Mobile users need linear, scannable content flow

**TIER 2: Side-by-Side (600px - 1023px)**  
- **Layout**: Nav → Two columns (Explorer Log 50% | Featured Projects 50%) → Footer
- **Tagline**: Hidden (redundant with footer info)
- **Footer**: Still present with quote + controls
- **Key Insight**: Medium screens can handle two columns but sidebar would be too cramped

**TIER 3: Three-Column (1024px - 1399px)**
- **Layout**: Nav → Three columns (Explorer Log 300px max | Featured Projects flex | Info Box 250px)
- **Explorer Log**: Capped at 300px to prevent becoming unreadably wide
- **Info Box**: **Crucial breakthrough** - Became inline flex child, not floating overlay
- **Footer**: Hidden (info now in sidebar)
- **Key Insight**: True responsive design means elements participate in layout flow, never overlay

**TIER 4: Grid Expansion (1400px+)**
- **Layout**: Same three columns but Featured Projects become 2-column grid
- **Scaling**: Explorer Log stays capped, Projects expand to fill available space
- **Key Insight**: Content should expand intelligently, not just get wider

### Critical Technical Breakthroughs

**1. The Margin Alignment Crisis**
- **Problem**: Navbar "HOME" link and content "EXPLORER LOG" had different left margins
- **Root Cause**: Double padding - main container had `padding-left: var(--page-margin)` AND content blocks had their own left padding
- **Solution**: Removed left padding from content blocks, let container provide consistent margin
- **Learning**: Visual debugging with temporary colored borders (`border-left: 3px solid red/blue`) was essential

**2. The Floating Sidebar Failure**
- **Problem**: Traditional `position: fixed` sidebar overlapped content instead of participating in layout
- **User Feedback**: "I don't like how the info box can overlap the projects at all"
- **Failed Approach**: Tried to reserve space with `padding-right: min(30vw, 350px)`
- **Breakthrough Solution**: Created `sidebar-inline` as actual flex child within `.main` container
- **Learning**: Modern responsive design should use flexbox/grid participation, not positioning hacks

**3. The Paragraph Spacing Refinement**
- **Problem**: Sidebar content had line breaks, not proper paragraph spacing
- **Evolution**: `margin-bottom: var(--space-md)` → `var(--space-sm)` → `var(--space-xs)`
- **User Feedback**: "even tighter" led to perfect spacing
- **Learning**: Typography spacing needs iterative refinement based on visual feedback

**4. The Content Width Optimization**
- **Problem**: Explorer Log became unreadably wide on large screens
- **User Insight**: "it should take up half on a small screen, and then when the screen gets larger, like my macbook air 2025, it can be capped at like, i dunno 300px"
- **Solution**: `max-width: min(50vw, 300px)` then refined to fixed 300px cap with flex
- **Learning**: Content should have optimal reading widths, not just scale infinitely

### CSS Architecture Insights

**1. Mobile-First Media Queries**
```css
/* Base styles: Mobile */
.main { flex-direction: column; }

/* 600px+: Side by side */
@media (min-width: 600px) {
  .main { flex-direction: row; }
}

/* 1024px+: Three column */
@media (min-width: 1024px) {
  .sidebar-inline { display: block; }
}
```

**2. Flexbox vs Grid Decision Matrix**
- **Flexbox**: Used for main layout (explorer log | projects | sidebar) - Better for dynamic content sizes
- **CSS Grid**: Used for project grid and log entries - Better for uniform card layouts
- **Learning**: Flexbox for layout flow, Grid for content arrangement

**3. CSS Custom Properties Power**
```css
:root {
  --page-margin: clamp(1rem, 5vw, 8rem); /* Responsive margins */
  --space-xs: clamp(0.25rem, 1vw, 1rem);  /* Scalable spacing */
  --type-uniform: clamp(11px, 2.25vw, 14px); /* Fluid typography */
}
```

### User Experience Evolution

**1. Progressive Disclosure**
- Mobile: Focus on core content, minimal distractions
- Medium: Show content relationships (log ↔ projects)
- Large: Full context with additional info sidebar

**2. Information Hierarchy**
- Key insight: Tagline serves different purposes at different sizes
- Mobile: Introduction/orientation
- Large: Redundant (info in sidebar)

**3. Touch vs Mouse Considerations**
- Mobile: Larger touch targets, simplified interactions
- Desktop: Dense information, multiple interaction zones

### Development Process Insights

**1. Iterative Refinement Method**
- Start with user requirements
- Implement basic structure
- Test across breakpoints  
- Refine based on visual feedback
- Repeat until perfect

**2. Visual Debugging Techniques**
- Temporary colored borders for alignment issues
- Browser dev tools for flexbox visualization
- Multiple device testing for real-world validation

**3. Git Commit Strategy** 
- Small, focused commits for each breakthrough
- Detailed commit messages documenting reasoning
- Separate commits for fixes vs new features

### Technical Debt Lessons

**1. The Hybrid Data System**
- **Challenge**: Previous developer implemented three-tier loading (JSON → embedded → placeholders)
- **Cleanup**: Removed duplicate sync scripts, fixed variable naming inconsistencies
- **Learning**: Complex systems need documentation and consistent naming

**2. Browser Caching Issues**
- **Problem**: CSS changes not appearing due to local server caching
- **Solution**: Hard refresh, server restart, cache busting techniques
- **Learning**: Development workflow needs cache management strategy

### Final Architecture Beauty

The resulting system is a masterclass in modern responsive design:

```
Mobile (< 600px):     Large (1024px+):
┌─────────────────┐    ┌─────┬─────────┬─────┐
│      Nav        │    │ Nav │         │     │
├─────────────────┤    ├─────┼─────────┼─────┤
│    Tagline      │    │ Log │Projects │Info │
├─────────────────┤    │300px│  flex   │250px│
│  Explorer Log   │    │ cap │ expand  │fixed│
├─────────────────┤    │     │         │     │
│Featured Projects│    │     │   ↓     │     │
├─────────────────┤    │     │2-col @  │     │
│     Footer      │    │     │1400px+  │     │
│ Quote + Controls│    │     │         │     │
└─────────────────┘    └─────┴─────────┴─────┘
```

**Key Success Metrics:**
- ✅ Perfect alignment across all breakpoints
- ✅ No content overlap or positioning issues  
- ✅ Optimal reading widths for all content types
- ✅ Smooth transitions between layout modes
- ✅ Maintained Tom Sachs left-aligned aesthetic
- ✅ True responsive participation, not overlay hacks

**User Validation:**
- "this is so beautiful! Youve killed it."
- Visual confirmation of all four tiers working perfectly
- Specific feedback incorporated iteratively

This responsive system represents a comprehensive solution that balances aesthetic principles, technical excellence, and user experience across the full spectrum of modern devices.

---

## 🎨 TOM SACHS AESTHETIC IMPLEMENTATION JOURNEY

### The Inspiration
After completing the responsive system, the user provided screenshots from Tom Sachs websites showing systematic, dense information layouts with text blocks flowing naturally in columns. The challenge was translating this exhibition-style aesthetic into web layouts while maintaining responsive functionality.

### Biography Page Transformation

**Original Challenge**: Biography page was "very one-column focused" when user wanted "rightward flow" with "skinnier columns" for a more "modular" feel.

**Technical Solution**: CSS Columns Implementation
```css
.bio-layout {
  columns: 4;
  column-gap: var(--space-md);
  width: 100%;
}
```

**Responsive Breakpoints**:
- Large screens (900px+): 4 columns for maximum density
- Medium screens (600-900px): 2 columns for readability  
- Mobile (<600px): 1 column for optimal mobile experience

**Key CSS Properties**:
- `break-inside: avoid` on sections to prevent awkward column breaks
- Natural content flow instead of rigid grid positioning
- Systematic typography with uniform sizing throughout

### Contact Page Architecture

**User Requirement**: Contact page should be "3 column on medium, instead of one column left is small and 1 column right is larger"

**Implementation Strategy**: 
- Direct Communication | Collaboration Interests | Technical Consulting | Speaking & Workshops
- Principle text at bottom spanning multiple columns
- Natural column flow for readability

**Technical Challenge Solved**: "Inexplicable huge white space on the right" 
- **Root Cause**: CSS grid inheritance from parent containers
- **Solution**: Explicit override with `!important` declarations to prevent grid inheritance

### Projects Page: Exhibition Table Layout

**Inspiration**: Tom Sachs exhibition screenshot showing systematic table with "photo then title/metadata, then writeup, in successive blocks"

**User Vision**: "Height of it all can just be whatever fits, in terms of any section, and also the photo should just be resized to fit the width of the left column"

**Technical Implementation**:
```css
.projects-table {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  row-gap: var(--space-lg);
  column-gap: var(--space-md);
  width: 100%;
}

.project-table-item {
  display: contents;
}
```

**JavaScript Architecture**:
- Updated `loadProjectsPage()` to detect table layout vs legacy grid
- `display: contents` pattern for semantic table structure  
- Conditional rendering based on container class detection

**Image Sizing Strategy**:
- `width: 100%` and `object-fit: cover` for automatic left column width fitting
- Responsive scaling maintains aspect ratios
- No fixed dimensions - images adapt to grid column naturally

**Mobile Responsive Strategy**:
```css
@media (max-width: 900px) {
  .projects-table {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
  
  .project-table-item {
    display: block;
    margin-bottom: var(--space-lg);
    border-bottom: 1px solid var(--color-accent);
  }
}
```

### CSS Columns vs CSS Grid Decision Matrix

**CSS Columns Chosen For**:
- Biography content (natural text flow)
- Contact information (content-driven column breaks)
- Better for content that should flow naturally

**CSS Grid Chosen For**:  
- Projects table (structured data presentation)
- Homepage layout (precise column control)
- Better for structured layouts with defined relationships

### Typography Consistency Breakthrough

**Challenge**: Maintaining Tom Sachs uniform typography across all new layouts

**Solution**: Systematic application of existing type system
```css
.bio-section-title,
.contact-section-title,
.project-table-title {
  font-size: var(--type-uniform);
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.4;
}
```

**Key Insight**: All text elements use `var(--type-uniform)` for true systematic typography

### Development Process Evolution

**1. Visual Reference Analysis**
- Screenshots provided by user analyzed for layout patterns
- Key elements identified: columns, spacing, systematic typography
- Responsive considerations planned from start

**2. Iterative Implementation**
- Start with one page type (biography)  
- Implement basic structure
- Refine based on user feedback ("I want more text to appear")
- Apply learnings to subsequent pages

**3. Cross-Page Consistency**
- Shared CSS patterns for section titles
- Consistent spacing using existing custom properties
- Unified responsive breakpoint strategy

### User Experience Insights

**1. Information Density Preference**
- User consistently wanted "more text to appear"
- Preference for dense, systematic layouts over spacious designs
- "Skinnier columns" create more modular, scannable content

**2. Responsive Flow Expectations**
- Content should break into columns "more often"
- Natural column flow preferred over rigid grid positioning
- Mobile collapse should be clean and linear

**3. Visual Hierarchy Through Layout**
- Systematic typography creates hierarchy through positioning, not size variation
- Column layouts create natural reading flow
- Consistent spacing maintains rhythm across breakpoints

### Final Tom Sachs Aesthetic Achievements

**Biography Page**:
```
Large (4 col):     Medium (2 col):     Mobile (1 col):
┌──┬──┬──┬──┐     ┌─────┬─────┐       ┌─────────────┐
│Ed│Pr│Te│To│     │ Edu │Tech │       │  Education  │
│uc│oj│ch│ol│     │ Proj│Tool │       │  Projects   │
│at│ec│ni│s │     │     │     │       │  Technical  │
│io│ts│ca│  │     │     │     │       │  Tools      │
│n │  │l │  │     │     │     │       │             │
└──┴──┴──┴──┘     └─────┴─────┘       └─────────────┘
```

**Contact Page**:
```
Large (3 col):           Medium (2 col):         Mobile (1 col):
┌────┬────┬────┐        ┌──────┬──────┐        ┌────────────┐
│Dir │Col │Tec │        │Direct│Collab│        │   Direct   │
│ect │lab │hni │        │Tech  │Speak │        │   Collab   │
│    │    │cal │        │      │      │        │  Technical │
│    │    │    │        │      │      │        │  Speaking  │
└────┴────┴────┘        └──────┴──────┘        └────────────┘
│ Principles spanning │   │ Principles span │    │Principles  │
└────────────────────┘   └────────────────┘     └────────────┘
```

**Projects Page**:
```
Large (3-col table):              Mobile (stacked):
┌─────┬─────────┬─────────────┐    ┌─────────────────┐
│Image│Title    │Description  │    │     Image       │
│     │Location │Lorem ipsum  │    │     Title       │
│     │Date     │dolor sit... │    │     Location    │
│     │         │             │    │     Date        │
├─────┼─────────┼─────────────┤    │   Description   │
│Image│Title    │Description  │    │   Lorem ipsum   │
│     │Metadata │Text content │    ├─────────────────┤
└─────┴─────────┴─────────────┘    │   Next Project  │
```

### Success Metrics

**User Validation**:
- Biography: Achieved desired "rightward flow" with modular columns
- Contact: Fixed white space issue and achieved proper 3-column layout
- Projects: Successfully implemented Tom Sachs exhibition table aesthetic

**Technical Achievements**:
- ✅ Seamless responsive behavior across all three page types
- ✅ Maintained existing design system and typography
- ✅ Natural content flow using CSS columns where appropriate
- ✅ Structured data presentation using CSS grid where appropriate
- ✅ Image sizing automatically adapts to column widths
- ✅ Mobile-first responsive strategy maintained

**Aesthetic Alignment**:
- ✅ Systematic, dense information presentation
- ✅ Left-aligned, never centered approach maintained
- ✅ Modular, block-based layouts achieved
- ✅ Tom Sachs exhibition-style organization implemented

This Tom Sachs aesthetic implementation demonstrates how traditional exhibition and print design principles can be successfully translated to responsive web layouts while maintaining technical excellence and user experience standards.

---

## 🔧 WORKSHOP MODE CMS ARCHITECTURE

### The Vision
Transform the static site into a "Workshop Mode" - a live content management system that maintains the experimental, maker aesthetic while providing immediate editing capabilities. Users can access a hidden CMS by entering a Konami code sequence + PIN, then edit content directly on the web with changes appearing live in 2-5 seconds.

### Core Philosophy: "Workshop as Creative Laboratory"

**Design Principles:**
- **Hidden in Plain Sight**: Access via Konami code maintains the experimental, playful nature
- **Live Creative Flow**: Edit-to-live cycle under 5 seconds preserves creative momentum  
- **Workshop Terminology**: "Forge changes" instead of "save", "Tools" instead of "admin panel"
- **Vanilla Stack Maintained**: No frameworks added, pure enhancement of existing architecture
- **Maker Aesthetic**: UI transformation reflects the inventor-storyteller identity

### Technical Architecture

**Authentication Flow:**
```
Konami Code Sequence → PIN Entry → JWT Session → Workshop Mode Activated
```

**Live Editing Flow:**
```
Content Edit → Optimistic UI Update → Netlify Function → JSON Persistence → Background GitHub Commit → Live Site Update (2-5s)
```

**Data Architecture:**
- **Primary**: Netlify Functions for immediate persistence
- **Secondary**: GitHub API for version control and audit trail
- **Fallback**: Existing embedded data system for reliability
- **Client**: Optimistic updates for instant feedback

### Implementation Phases

**Phase I: Secret Access System**
- Konami code detection (↑↑↓↓←→←→BA)
- PIN authentication with Web Crypto API hashing
- Session management with localStorage + expiration
- Rate limiting and security measures

**Phase II: Live Editing Core**
- Inline editing activation for content elements
- Netlify Functions backend for data persistence
- Optimistic UI updates for immediate feedback
- Integration with existing data.json structure

**Phase III: Netlify Functions Backend** ✅ **COMPLETE**
- `workshop-auth.js`: PIN authentication with SHA-256 hashing and JWT session tokens
- `workshop-edit.js`: Real-time content persistence to data.json with embedded data sync
- `workshop-sync.js`: GitHub API integration for version control audit trail
- Environment variables configuration with secure PIN hashing
- CORS protection and session validation across all endpoints

**Phase IV: Frontend Integration & UI Transformation**
- Connect frontend to real Netlify Functions (replace localStorage simulation)
- Subtle visual indicators for editable content
- Workshop-themed success/error messaging
- Creative terminology throughout interface
- Performance metrics and editing feedback

### Security Architecture

**Multi-layered Protection:**
- **Authentication**: Konami code + salted PIN hash + JWT tokens
- **Authorization**: Session expiration + device fingerprinting
- **Input Validation**: XSS protection + data structure validation
- **Rate Limiting**: Failed attempt lockouts + session management
- **Audit Trail**: All changes logged via GitHub commits

### User Experience Design

**Entry Experience:**
1. User enters Konami code anywhere on site
2. Subtle visual cue indicates sequence detected
3. PIN entry modal appears with workshop theming
4. Successful auth triggers site transformation

**Workshop Mode Experience:**
- Content elements gain subtle edit indicators
- Click-to-edit functionality with inline forms
- Real-time preview with optimistic updates
- Workshop terminology: "Forge", "Craft", "Workshop Tools"
- Status feedback: "Changes forged successfully"

**Exit Experience:**
- Manual exit or automatic session timeout
- Site returns to normal appearance
- All changes persist and remain live

### Technical Benefits

**Performance:**
- 2-5 second edit-to-live cycle
- Optimistic UI for instant feedback
- Background processing for heavy operations
- Minimal impact on site performance

**Reliability:**
- Multiple fallback layers
- Existing hybrid data system maintained
- GitHub version control for change history
- Client-side validation before server requests

**Maintainability:**
- Pure vanilla architecture enhancement
- Modular implementation in existing SiteManager
- Clear separation of workshop vs public functionality
- Comprehensive error handling and logging

### File Structure Enhancement

```
/Users/johnnyhockin/AI Playground/johnnyhockin.com/
├── script.js (enhanced with WorkshopManager)
├── styles.css (workshop mode styles added)
├── data.json (existing - now editable via workshop)
├── data-embedded.js (existing - auto-updated by functions)
├── functions/ ✅ IMPLEMENTED
│   ├── workshop-auth.js (PIN authentication + JWT sessions)
│   ├── workshop-edit.js (real-time data.json persistence)
│   └── workshop-sync.js (GitHub API integration)
├── .env (environment variables template)
└── netlify.toml (updated with functions config)
```

### Success Metrics

**User Experience:**
- Sub-5 second edit-to-live cycle
- Zero failed authentication attempts after setup
- 100% content preservation during edits
- Seamless integration with existing site aesthetic

**Technical Performance:**
- 99.9% uptime for workshop functionality
- Zero data corruption incidents
- Complete audit trail for all changes
- Backward compatibility maintained

This Workshop Mode architecture represents the perfect evolution of the site - maintaining its experimental, maker identity while adding powerful live editing capabilities that feel native to the overall aesthetic and technical philosophy.

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

### 2025-07-31 - Workshop Mode Phase III: Netlify Functions Backend Implementation
- **IMPLEMENTED**: Complete Netlify Functions backend for Workshop Mode CMS
- **CREATED**: `functions/workshop-auth.js` - PIN authentication with SHA-256 hashing and JWT session tokens
- **CREATED**: `functions/workshop-edit.js` - Real-time content persistence to data.json with automatic embedded data sync
- **CREATED**: `functions/workshop-sync.js` - GitHub API integration for version control (optional)
- **UPDATED**: `netlify.toml` with functions directory configuration
- **ADDED**: Environment variables setup (.env template) for secure PIN hashing
- **ARCHITECTURE**: Complete serverless backend replacing localStorage simulation
- **SECURITY**: Multi-layer authentication with session tokens, rate limiting, and CORS protection
- **PERSISTENCE**: Real data.json updates with automatic data-embedded.js synchronization

### 2025-07-31 - Workshop Mode Completion & Contact Page Updates
- **FIXED**: Critical Workshop Mode navigation bug - editing now persists across page navigation
- **IMPLEMENTED**: Event-driven content loading system for Workshop Mode coordination
- **ADDED**: `siteContentReady` custom event system to sync content loading with Workshop Mode
- **UPDATED**: Contact page content with new personal voice and direct links
- **REPLACED**: Contact page CSS columns with CSS Grid for responsive layout control
- **FIXED**: Contact page alignment issues - columns now properly align at "Direct Links" level
- **ADDED**: Undo/redo system (Ctrl+Z/Y) for Workshop Mode editing
- **ADDED**: Empty content protection with "[Click to edit]" placeholder
- **TECHNICAL**: Workshop Mode uses observer pattern with custom events for bulletproof persistence
- **DECISION**: Grid layout provides precise control vs unpredictable CSS columns behavior

### 2025-07-31 - Workshop Mode Phase II Implementation
- **IMPLEMENTED**: Full inline editing capabilities for Explorer Log and Projects
- **ADDED**: Smart editor selection - textarea for multi-line content, input for single-line
- **ADDED**: Optimistic UI updates with instant visual feedback
- **ADDED**: Simulated backend persistence (preparation for Netlify Functions)
- **TECHNICAL**: Click-to-edit functionality with proper content preservation
- **UI**: Edit indicators appear on hover for editable content
- **SECURITY**: All edits require active Workshop Mode session

### 2025-07-31 - Workshop Mode Phase I Implementation  
- **IMPLEMENTED**: Complete Konami code detection (↑↑↓↓←→←→BA)
- **ADDED**: PIN authentication system with Web Crypto API hashing
- **ADDED**: Session management with 24-hour expiration in localStorage
- **ADDED**: Rate limiting (5 attempts, 5-minute lockout)
- **UI**: Custom modal for PIN entry with workshop aesthetic
- **VISUAL**: Workshop Mode indicator (subtle left border) when active
- **SECURITY**: PIN hashed with SHA-256, never stored in plain text

### 2025-07-31 - Tom Sachs Projects Table Layout Implementation
- **Redesigned**: Projects page with Tom Sachs exhibition-style table layout (image | title/metadata | description)
- **Updated**: `projects.html` structure from `.project-items` to `.projects-table` container
- **Added**: CSS grid system with 3-column layout (1fr 1fr 2fr) for table structure
- **Implemented**: `display: contents` pattern in JavaScript for semantic table structure
- **Added**: Responsive table layout that collapses to single column on mobile (< 900px)
- **Styled**: Project table components (title, location, date, description) with uniform typography
- **Technical**: Updated `loadProjectsPage()` function to generate new table HTML structure
- **CSS**: Added comprehensive `.projects-table` styles with proper image sizing and spacing
- **Decision**: Images sized to fit left column width automatically via `width: 100%` and `object-fit: cover`

### 2025-07-31 - Tom Sachs Biography & Contact Layouts
- **Redesigned**: Biography page with Tom Sachs systematic layout using CSS columns (4 → 2 → 1 responsive)
- **Redesigned**: Contact page with Tom Sachs block-based approach using CSS columns (3 → 2 → 1 responsive) 
- **Fixed**: Contact page white space issue on medium screens with proper column override
- **Updated**: Both pages to use `break-inside: avoid` for better column flow
- **Refined**: Column layouts to break into multi-column earlier with proper responsive breakpoints
- **CSS**: Added `.bio-layout` and `.contact-layout` with natural column flow instead of rigid grids
- **Decision**: Moved from grid-based to column-based layouts for better content flow and readability

### 2025-07-31 - Post-Responsive Layout Polish
- **Fixed**: Removed nav bar white background to allow content scrolling underneath
- **Fixed**: Excessive vertical spacing between project items on homepage by removing `margin-bottom: var(--space-lg)` from `.project-description`
- **Refined**: Project grid spacing to match log entries exactly (1.5rem gap)
- **Commit**: "Fix responsive layout issues" - consolidated navigation and spacing improvements

### 2025-01-30 - Navigation & Link Styling Refinement
- **Changed**: Navigation from centered to left-aligned (NEVER center principle established)
- **Changed**: Custom underlines moved from 2px to -1px below text for natural positioning
- **Added**: Site-wide custom link styling with consistent underlines
- **Added**: CMS content uses default browser link colors for usability
- **Added**: Chaos mode link styling support
- **Updated**: Documentation structure and git initialization
- **Decision**: All links should have subtle custom underlines except in CMS content

### 2025-01-30 - Grid System Evolution
- **Changed**: Grid system from 100px to 180px for better proportions
- **Refined**: Spacing uses mathematical relationships (1x, 2x, 4x grid units)
- **Decision**: True grid system means elements snap to grid increments, no arbitrary spacing
- **Reference**: Tom Sachs website grid principles studied and incorporated

### 2025-01-30 - View Controls Repositioning  
- **Moved**: Font and chaos toggles from nav to left edge of screen
- **Added**: Vertical text orientation for view controls
- **Changed**: Font toggle displays in opposite font for clarity
- **Decision**: Interface controls grouped together but separate from main navigation

### 2025-01-30 - Navigation Structure Simplification
- **Removed**: Explorer Log as separate page (homepage only now)
- **Fixed**: Navigation links from "/" to relative paths (index.html, etc.)
- **Added**: Placeholder content throughout site for realistic feel
- **Decision**: Explorer Log belongs on homepage only, not as separate archive

### 2025-01-30 - Design Philosophy Establishment
- **Established**: No boxes/borders around content sections
- **Established**: Left-aligned text only, never centered
- **Established**: Modular grid-based layout over arbitrary positioning
- **Rejected**: "Cliche and obvious" design patterns
- **Added**: Custom cursor and favicon implementation

### 2025-01-30 - Initial Implementation
- **Created**: Full site structure with vanilla HTML/CSS/JS
- **Implemented**: JSON-based CMS with extensive placeholder content
- **Added**: Font switching functionality
- **Added**: Chaos mode with 80s aesthetic
- **Created**: All core pages (index, projects, project, about, contact)

---

## 🧱 ROADMAP & PIPELINE

### NOW
- **WORKSHOP MODE CMS PHASES I-III COMPLETE**
  - Phase I: ✅ Konami code + PIN authentication system
  - Phase II: ✅ Live inline editing with optimistic UI updates
  - Phase III: ✅ Netlify Functions backend with real persistence
- Contact page updated with new content and responsive grid layout
- All core site features operational

### NEXT  
- **WORKSHOP MODE PHASE IV: FRONTEND INTEGRATION**
  - Connect frontend to real Netlify Functions (replace simulation)
  - Full workshop UI transformation with creative terminology
  - Production testing and refinement
- Test and refine Tom Sachs projects table layout with real project data
- Optimize image sizing and loading for projects table layout
- Content population with real projects and log entries

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
- **M5**: Comprehensive responsive system implementation (4-tier layout)
- **M6**: Tom Sachs aesthetic layouts (Biography CSS columns, Contact 3-column, Projects exhibition table)
- **M7**: Workshop Mode Phase III - Complete Netlify Functions backend implementation

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