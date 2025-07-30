// Main site functionality
class SiteManager {
  constructor() {
    this.currentFont = localStorage.getItem('font') || 'courier';
    this.chaosMode = localStorage.getItem('chaos') === 'true';
    this.easterEggClicks = 0;
    
    this.init();
  }

  init() {
    this.setupFontToggle();
    this.setupChaosToggle();
    this.setupEasterEgg();
    this.loadContent();
    this.applyStoredSettings();
  }

  // Font switching functionality
  setupFontToggle() {
    const fontToggle = document.getElementById('fontToggle');
    if (fontToggle) {
      fontToggle.addEventListener('click', () => {
        this.toggleFont();
      });
      this.updateFontToggleText();
    }
  }

  toggleFont() {
    this.currentFont = this.currentFont === 'courier' ? 'helvetica' : 'courier';
    localStorage.setItem('font', this.currentFont);
    this.applyFont();
    this.updateFontToggleText();
  }

  applyFont() {
    if (this.currentFont === 'helvetica') {
      document.body.classList.add('font-helvetica');
    } else {
      document.body.classList.remove('font-helvetica');
    }
  }

  updateFontToggleText() {
    const fontToggle = document.getElementById('fontToggle');
    if (fontToggle) {
      if (this.currentFont === 'courier') {
        fontToggle.textContent = 'Helvetica';
        fontToggle.style.fontFamily = 'Helvetica Neue, Arial, sans-serif';
      } else {
        fontToggle.textContent = 'Courier';
        fontToggle.style.fontFamily = 'Courier Prime, monospace';
      }
    }
  }

  // Chaos mode functionality
  setupChaosToggle() {
    const chaosToggle = document.getElementById('chaosToggle');
    if (chaosToggle) {
      chaosToggle.addEventListener('click', () => {
        this.toggleChaos();
      });
    }
  }

  toggleChaos() {
    this.chaosMode = !this.chaosMode;
    localStorage.setItem('chaos', this.chaosMode);
    this.applyChaos();
  }

  applyChaos() {
    if (this.chaosMode) {
      document.body.classList.add('chaos-mode');
    } else {
      document.body.classList.remove('chaos-mode');
    }
  }

  // Easter egg functionality (click About title 7 times)
  setupEasterEgg() {
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle && window.location.pathname.includes('about')) {
      pageTitle.addEventListener('click', () => {
        this.easterEggClicks++;
        if (this.easterEggClicks >= 7) {
          this.revealEasterEgg();
        }
      });
    }
  }

  revealEasterEgg() {
    const easterEgg = document.getElementById('easterEgg');
    if (easterEgg) {
      easterEgg.innerHTML = `
        <p><strong>Found it.</strong></p>
        <p>This site was built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no unnecessary complexity. Just raw code doing exactly what it needs to do.</p>
        <p>The custom cursor is an SVG data URI. The chaos mode uses CSS custom properties and keyframe animations. The CMS is a simple JSON file structure.</p>
        <p>Sometimes the most experimental thing you can do is keep it simple.</p>
      `;
      easterEgg.classList.add('revealed');
    }
  }

  // Apply stored settings on page load
  applyStoredSettings() {
    this.applyFont();
    this.applyChaos();
  }

  // Content loading functionality
  async loadContent() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      
      // Route-specific content loading
      const path = window.location.pathname;
      
      if (path === '/' || path === '/index.html') {
        this.loadHomepage(data);
      } else if (path === '/projects.html') {
        this.loadProjectsPage(data);
      } else if (path === '/log.html') {
        this.loadLogPage(data);
      } else if (path === '/project.html') {
        this.loadProjectPage(data);
      }
    } catch (error) {
      console.log('Content loading fallback - using placeholder data');
      this.loadPlaceholderContent();
    }
  }

  loadHomepage(data) {
    this.loadLogEntries(data.explorerLog.slice(0, 5)); // Show latest 5 entries
    this.loadFeaturedProjects(data.projects.filter(p => p.featured));
  }

  loadProjectsPage(data) {
    const container = document.getElementById('allProjects');
    if (container && data.projects) {
      container.innerHTML = data.projects.map(project => `
        <div class="project-item">
          <div class="project-title">
            <a href="project.html?id=${project.id}">${project.title}</a>
          </div>
          <div class="project-description">${project.description}</div>
        </div>
      `).join('');
    }
  }

  loadLogPage(data) {
    const container = document.getElementById('allLogEntries');
    if (container && data.explorerLog) {
      this.loadLogEntries(data.explorerLog, container);
    }
  }

  loadProjectPage(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId && data.projects) {
      const project = data.projects.find(p => p.id === projectId);
      if (project) {
        this.displayProject(project);
        this.setupProjectShuffle(data.projects);
        this.loadOtherProjects(data.projects.filter(p => p.id !== projectId));
      }
    }
  }

  loadLogEntries(entries, container = document.getElementById('logEntries')) {
    if (container && entries) {
      container.innerHTML = entries.map(entry => `
        <div class="log-entry">
          <div class="log-date">${entry.date}</div>
          <div class="log-content">${entry.content}</div>
        </div>
      `).join('');
    }
  }

  loadFeaturedProjects(projects) {
    const container = document.getElementById('projectGrid');
    if (container && projects) {
      container.innerHTML = projects.map(project => `
        <div class="project-item">
          <div class="project-title">
            <a href="project.html?id=${project.id}">${project.title}</a>
          </div>
          <div class="project-description">${project.description}</div>
        </div>
      `).join('');
    }
  }

  displayProject(project) {
    const container = document.getElementById('projectContent');
    const titleElement = document.getElementById('projectTitle');
    
    if (titleElement) {
      titleElement.textContent = `${project.title} - Johnny Hockin`;
    }
    
    if (container) {
      container.innerHTML = `
        <h1 class="page-title">${project.title}</h1>
        <div class="project-meta">${project.date} • ${project.category}</div>
        <div class="project-description">${project.fullDescription || project.description}</div>
        ${project.process ? `<h3>Process</h3><div class="project-process">${project.process}</div>` : ''}
        ${project.links ? `<div class="project-links">${project.links.map(link => `<a href="${link.url}" target="_blank">${link.title}</a>`).join('')}</div>` : ''}
        ${project.notes ? `<h3>Notes</h3><div class="project-notes">${project.notes}</div>` : ''}
      `;
    }
  }

  setupProjectShuffle(projects) {
    const shuffleBtn = document.getElementById('shuffleBtn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        const randomProject = projects[Math.floor(Math.random() * projects.length)];
        window.location.href = `project.html?id=${randomProject.id}`;
      });
    }
  }

  loadOtherProjects(projects) {
    const container = document.getElementById('otherProjects');
    if (container && projects) {
      container.innerHTML = projects.map(project => 
        `<div class="other-project">${project.title}</div>`
      ).join('');
    }
  }

  // Fallback placeholder content
  loadPlaceholderContent() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
      this.loadLogEntries([
        { date: "2024.01.15", content: "Started building a custom mechanical keyboard. The switches arrived today—tactile, 67g actuation. The PCB design is proving more complex than expected." },
        { date: "2024.01.12", content: "Experimenting with computer vision for detecting hand gestures. OpenCV is overkill for what I need, but the precision is incredible." },
        { date: "2024.01.08", content: "Built a small app to track my daily coding sessions. No fancy frameworks—just vanilla JS and local storage. Sometimes the simplest tools are the most reliable." },
        { date: "2024.01.05", content: "Found an interesting bug in my LED matrix controller. The issue wasn't in the code—it was in my understanding of the hardware timing requirements." },
        { date: "2024.01.02", content: "New year, new experiments. Planning to document everything more thoroughly this time. Raw process notes, not polished blog posts." }
      ]);
      
      this.loadFeaturedProjects([
        { id: "mechanical-keyboard", title: "Custom Mechanical Keyboard", description: "Building a 60% keyboard from scratch. PCB design, firmware, and case machining." },
        { id: "gesture-recognition", title: "Hand Gesture Recognition", description: "Computer vision experiment for controlling devices through hand movements." },
        { id: "led-matrix", title: "LED Matrix Controller", description: "Real-time graphics on a 32x32 RGB LED matrix. Custom protocols and timing." }
      ]);
    }
  }
}

// Initialize site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SiteManager();
});