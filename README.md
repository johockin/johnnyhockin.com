# Johnny Hockin - Personal Website

Raw experiments in code, film, and invention. Personal process, projects, and digital lab notes.

## Tech Stack

- **Vanilla HTML/CSS/JavaScript** - No frameworks, no build process
- **JSON-based CMS** - Simple file-based content management
- **Netlify hosting** - Static site deployment
- **Custom fonts** - Courier Prime and Helvetica Neue with toggle
- **Chaos Mode** - 80s nightclub aesthetic overlay

## Features

- **180px Grid System**: True modular layout with mathematical spacing (1x, 2x, 4x)
- **Font Switcher**: Toggle between Courier Prime (default) and Helvetica Neue
- **Chaos Mode**: Over-the-top 80s visual theme with neon effects
- **Custom Cursor**: Subtle, experimental pointer design
- **Project Shuffle**: Random project navigation
- **Explorer Log**: Development diary on homepage only
- **Custom Link Underlines**: Site-wide underlines positioned just below text
- **Left-Aligned Design**: No centered content, all text left-aligned
- **Vertical View Controls**: Font and chaos toggles positioned on left edge
- **Responsive Design**: Works on all screen sizes
- **SEO Optimized**: Semantic HTML structure

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Or serve with any static file server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## Content Management

Content is managed through `data.json`:

- **explorerLog**: Chronological development notes
- **projects**: Detailed project information
- **otherProjects**: Simple list of past project titles

## Deployment

Deploy to Netlify by connecting the repository. The `netlify.toml` file contains the necessary configuration.

## Philosophy

- **Transparency > Cleverness**
- **Left-Aligned > Centered** (NEVER centre content)
- **Stability > Speed** 
- **Performance > Convention**
- **Explicitness > DRY**
- **Raw > Polished**
- **Modular Grid > Arbitrary Spacing**

## Project Structure

```
/
├── index.html          # Homepage with Explorer Log
├── projects.html       # All projects listing
├── project.html        # Individual project template
├── about.html         # Biography page
├── contact.html       # Contact information
├── styles.css         # Main styles with 180px grid system
├── project.css        # Page-specific styles
├── script.js          # All JavaScript functionality
├── data.json          # JSON-based CMS content
├── cursor.png         # Custom cursor (32x32px)
├── favicon*.png       # Favicons in multiple sizes
├── netlify.toml       # Deployment configuration
├── Photos that can be used/  # Project images
└── README.md          # This file
```

---

This site embodies experimental minimalism: maximum functionality with minimal complexity.