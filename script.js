// Main site functionality
class SiteManager {
  constructor() {
    this.currentFont = localStorage.getItem('font') || 'courier';
    this.chaosMode = localStorage.getItem('chaos') === 'true';
    this.easterEggClicks = 0;
    
    console.log('🚀 SiteManager initializing...');
    
    // Workshop Mode removed - using Admin Panel for content management
    
    this.init();
  }

  // Helper function to convert line breaks to HTML
  formatLineBreaks(text) {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
  }

  init() {
    console.log('🚀 SiteManager initializing...');
    console.log('📍 Current path:', window.location.pathname);
    console.log('🔍 Search params:', window.location.search);
    
    this.setupFontToggle();
    this.setupChaosToggle();
    this.setupEasterEgg();
    this.loadContent();
    this.applyStoredSettings();
  }

  // Font switching functionality
  setupFontToggle() {
    const fontToggle = document.getElementById('fontToggle');
    const fontToggleSidebar = document.getElementById('fontToggleSidebar');
    const fontToggleInline = document.getElementById('fontToggleInline');
    const fontToggleMobile = document.getElementById('fontToggleMobile');
    
    [fontToggle, fontToggleSidebar, fontToggleInline, fontToggleMobile].forEach(toggle => {
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.toggleFont();
        });
      }
    });
    
    this.updateFontToggleText();
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
    const fontToggleSidebar = document.getElementById('fontToggleSidebar');
    const fontToggleInline = document.getElementById('fontToggleInline');
    const fontToggleMobile = document.getElementById('fontToggleMobile');
    
    [fontToggle, fontToggleSidebar, fontToggleInline, fontToggleMobile].forEach(toggle => {
      if (toggle) {
        if (this.currentFont === 'courier') {
          toggle.textContent = 'Helvetica';
        } else {
          toggle.textContent = 'Courier';
        }
        // Remove any custom font styling to use the current page font
        toggle.style.fontFamily = '';
      }
    });
  }

  // Chaos mode functionality
  setupChaosToggle() {
    const chaosToggle = document.getElementById('chaosToggle');
    const chaosToggleSidebar = document.getElementById('chaosToggleSidebar');
    const chaosToggleInline = document.getElementById('chaosToggleInline');
    const chaosToggleMobile = document.getElementById('chaosToggleMobile');
    
    [chaosToggle, chaosToggleSidebar, chaosToggleInline, chaosToggleMobile].forEach(toggle => {
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.toggleChaos();
        });
      }
    });
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

  // Content loading functionality - Bulletproof hybrid approach
  async loadContent() {
    let data = null;
    
    try {
      // Primary: Try external data.json (fastest, cacheable)
      console.log('🔄 Loading external data.json...');
      const response = await fetch('data.json');
      data = await response.json();
      console.log('✅ External data loaded successfully');
    } catch (error) {
      // Secondary: Use complete embedded fallback data
      if (window.EMBEDDED_SITE_DATA) {
        console.log('📦 Using embedded fallback data');
        data = window.EMBEDDED_SITE_DATA;
      } else {
        console.log('⚠️ No embedded data available - using minimal placeholder');
        this.loadPlaceholderContent();
        this.notifyContentReady(); // Notify even for placeholder content
        return;
      }
    }
    
    // Route-specific content loading using the loaded data
    const path = window.location.pathname;
    console.log('🔀 Current path:', path, '| Data source:', data === window.EMBEDDED_SITE_DATA ? 'embedded' : 'external');
    console.log('🔍 Route matching check:');
    console.log('  - Is homepage?', path === '/' || path === '/index.html' || path.endsWith('/index.html'));
    console.log('  - Is projects page?', path === '/projects.html' || path.endsWith('/projects.html') || path === '/projects' || path === '/projects/');
    console.log('  - Is log page?', path === '/log.html' || path.endsWith('/log.html') || path === '/log' || path === '/log/');
    console.log('  - Is project page?', path === '/project.html' || path.endsWith('/project.html') || path === '/project' || path === '/project/');
    
    if (path === '/' || path === '/index.html' || path.endsWith('/index.html')) {
      console.log('📍 Loading homepage...');
      this.loadHomepage(data);
    } else if (path === '/projects.html' || path.endsWith('/projects.html') || path === '/projects' || path === '/projects/') {
      console.log('📍 Loading projects page...');
      this.loadProjectsPage(data);
    } else if (path === '/log.html' || path.endsWith('/log.html') || path === '/log' || path === '/log/') {
      console.log('📍 Loading log page...');
      this.loadLogPage(data);
    } else if (path === '/project.html' || path.endsWith('/project.html') || path === '/project' || path === '/project/') {
      console.log('🚫 Individual project pages disabled for MVP - redirecting to projects list');
      window.location.href = '/projects.html';
      return;
    } else {
      console.warn('⚠️ No route match found for path:', path);
    }
    
    // Content loading complete
  }


  loadHomepage(data) {
    this.loadLogEntries(data.explorerLog.slice(0, 3)); // Show latest 3 entries
    this.loadFeaturedProjects(data.projects.filter(p => p.featured).slice(0, 2)); // Show exactly 2 projects
  }

  loadProjectsPage(data) {
    console.log('🔍 loadProjectsPage called with:', data.projects?.length, 'projects');
    const container = document.getElementById('allProjects');
    console.log('📦 Container found:', !!container, 'with classes:', container?.className);
    
    if (!container) {
      console.error('❌ Container #allProjects not found!');
      return;
    }
    
    if (!data.projects) {
      console.error('❌ No projects data found!', data);
      return;
    }
    
    console.log('✅ About to render', data.projects.length, 'projects');
    
    try {
      // Check if we're using the new table layout
      if (container.classList.contains('projects-table') || container.parentElement.classList.contains('projects-layout')) {
        console.log('📊 Using table layout');
        const projectsHTML = data.projects.map((project, index) => {
          console.log(`🏗️ Rendering project ${index + 1}:`, project.title);
          
          // Parse metadata specs for location and other details
          const specs = project.metadata?.specs || '';
          const specLines = specs.split('\n').map(line => line.trim()).filter(line => line);
          
          return `
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-table-image">` : '<div class="project-table-image-placeholder">NO IMAGE</div>'}
            <div class="project-table-meta">
              <div class="project-table-title">${project.title}</div>
              ${project.category ? `<div class="project-table-category">${project.category}</div>` : ''}
              ${project.date ? `<div class="project-table-date">${project.date}</div>` : ''}
              ${project.status ? `<div class="project-table-status">${project.status}</div>` : ''}
              ${specLines.length > 0 ? `<div class="project-table-specs">${specLines.map(line => `<div class="spec-line">${line}</div>`).join('')}</div>` : ''}
            </div>
            <div class="project-table-content">
              <div class="project-table-description">${this.formatLineBreaks(project.fullDescription || project.description)}</div>
            </div>
          `;
        }).join('');
        
        console.log('📝 Generated HTML length:', projectsHTML.length);
        container.innerHTML = projectsHTML;
        console.log('✅ HTML inserted into container');
        
        // Make project images clickable - redirect to projects page
        const projectImages = container.querySelectorAll('.project-table-image, .project-image');
        projectImages.forEach(img => {
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => {
            window.location.href = '/projects.html';
          });
        });
        
      } else {
        console.log('📋 Using legacy grid layout');
        // Legacy grid layout
        container.innerHTML = data.projects.map(project => `
          <div class="project-item">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
            <div class="project-title">
              <a href="/projects.html">${project.title}</a>
            </div>
            <div class="project-description">${this.formatLineBreaks(project.description)}</div>
          </div>
        `).join('');
      }
      
      // Verify content was inserted
      const finalContent = container.innerHTML;
      console.log('🔍 Final container content length:', finalContent.length);
      console.log('🔍 Container children count:', container.children.length);
      
    } catch (error) {
      console.error('❌ Error rendering projects:', error);
    }
  }

  loadLogPage(data) {
    const container = document.getElementById('logArchiveEntries');
    if (container) {
      // Extended log data with placeholder links for archive
      const archiveEntries = [
        { date: "2024.01.28", content: "Keyboard project update: The PCB arrived from <a href=\"https://jlcpcb.com\" target=\"_blank\">JLCPCB</a> today. Quality looks excellent—the silkscreen is crisp and all the vias are properly filled. Time to start assembly. Found a potential issue with the USB-C footprint that might cause problems with some cables." },
        { date: "2024.01.25", content: "Deep dive into WebGL shaders for a new visualization project. The math is brutal but the results are worth it. Managed to get real-time particle systems running at 60fps with 10,000 particles. The key was batching draw calls and using <a href=\"https://webglfundamentals.org/webgl/lessons/webgl-instanced-drawing.html\" target=\"_blank\">instanced rendering</a>." },
        { date: "2024.01.22", content: "Spent the weekend building a custom MIDI controller from salvaged arcade buttons. The tactile feedback is incredible—way better than any commercial controller I've used. Posted some photos on <a href=\"#\" target=\"_blank\">my Instagram</a>." },
        { date: "2024.01.19", content: "Breakthrough on the gesture recognition project. Switched from OpenCV to <a href=\"https://mediapipe.dev/\" target=\"_blank\">MediaPipe</a> and the performance improvement is dramatic. Latency dropped from 150ms to 45ms. The hand tracking is incredibly smooth now." },
        { date: "2024.01.15", content: "Started building a custom mechanical keyboard. The switches arrived today—tactile, 67g actuation. The PCB design is proving more complex than expected. Using <a href=\"https://kicad.org/\" target=\"_blank\">KiCad</a> for the first time." },
        { date: "2024.01.12", content: "Experimenting with mesh networking protocols. ESP32 boards scattered around the house are finally talking to each other reliably. Range tests tomorrow. Following <a href=\"https://github.com/gmag11/painlessMesh\" target=\"_blank\">painlessMesh</a> examples." },
        { date: "2024.01.08", content: "Built a small app to track my daily coding sessions. No fancy frameworks—just vanilla JS and local storage. Sometimes the simplest tools are the most reliable. Code is up on <a href=\"#\" target=\"_blank\">GitHub</a>." },
        { date: "2024.01.05", content: "Found an interesting bug in my LED matrix controller. The issue wasn't in the code—it was in my understanding of the hardware timing requirements. <a href=\"https://www.adafruit.com/product/2278\" target=\"_blank\">This Adafruit guide</a> finally clarified the SPI timing." },
        { date: "2024.01.02", content: "New year, new experiments. Planning to document everything more thoroughly this time. Raw process notes, not polished blog posts. Inspired by <a href=\"https://notes.andymatuschak.org/\" target=\"_blank\">Andy Matuschak's working notes</a>." },
        { date: "2023.12.28", content: "Finished the neural network schematic parser. It can now convert hand-drawn circuit diagrams into proper schematics with 85% accuracy. The training data was the hardest part—had to draw hundreds of circuits by hand." },
        { date: "2023.12.22", content: "Modular synthesizer build is coming along. 3D printed the panels this week. The <a href=\"https://www.muffwiggler.com/\" target=\"_blank\">Muff Wiggler forums</a> have been incredibly helpful for troubleshooting the VCA circuit." },
        { date: "2023.12.18", content: "Made progress on the PCB business cards. The IR communication is working, but the range is shorter than expected. Need to experiment with different LED power levels. <a href=\"https://learn.adafruit.com/ir-sensor/overview\" target=\"_blank\">This Adafruit tutorial</a> has some good tips." }
      ];
      
      container.innerHTML = archiveEntries.map(entry => `
        <div class="log-archive-entry">
          <div class="log-date">${entry.date}</div>
          <div class="log-content">${this.formatLineBreaks(entry.content)}</div>
        </div>
      `).join('');
    }
  }

  loadProjectPage(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    console.log('🔍 loadProjectPage called with projectId:', projectId);
    console.log('📊 Available projects:', data.projects?.length);
    
    if (!projectId) {
      console.warn('⚠️ No project ID provided in URL parameters');
      return;
    }
    
    if (!data.projects) {
      console.error('❌ No projects data available');
      return;
    }
    
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      console.log('✅ Found project:', project.title);
      this.displayProject(project);
      this.setupProjectShuffle(data.projects);
      this.loadOtherProjects(data.projects.filter(p => p.id !== projectId));
    } else {
      console.error('❌ Project not found:', projectId);
      console.log('Available project IDs:', data.projects.map(p => p.id));
    }
  }

  loadLogEntries(entries, container = document.getElementById('logEntries')) {
    if (container && entries) {
      container.innerHTML = entries.map(entry => `
        <div class="log-entry">
          <div class="log-date">${entry.date}</div>
          <div class="log-content">${this.formatLineBreaks(entry.content)}</div>
        </div>
      `).join('');
    }
  }

  loadFeaturedProjects(projects) {
    const container = document.getElementById('projectGrid');
    if (container && projects) {
      const projectsHTML = projects.map(project => `
        <div class="project-item">
          ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
          <div class="project-title">
            <a href="/projects.html">${project.title}</a>
          </div>
          <div class="project-description">${this.formatLineBreaks(project.description)}</div>
        </div>
      `).join('');
      
      // Add the "MORE PROJECTS" link outside the grid
      container.innerHTML = projectsHTML;
      
      // Add the more projects link after the grid
      const moreProjectsLink = container.parentElement.querySelector('.more-projects-link') || 
        document.createElement('div');
      moreProjectsLink.className = 'more-projects-link';
      moreProjectsLink.innerHTML = '<a href="/projects.html">MORE PROJECTS...</a>';
      
      if (!container.parentElement.querySelector('.more-projects-link')) {
        container.parentElement.appendChild(moreProjectsLink);
      }
      
      // Make homepage project images clickable - redirect to projects page
      const projectImages = container.querySelectorAll('.project-image');
      projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          window.location.href = '/projects.html';
        });
      });
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
        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
        <div class="project-description">${this.formatLineBreaks(project.fullDescription || project.description)}</div>
      `;
    }
  }

  setupProjectShuffle(projects) {
    const shuffleBtn = document.getElementById('shuffleBtn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        window.location.href = '/projects.html';
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

  // Notify Workshop Mode that content is ready
  notifyContentReady() {
    console.log('📢 Notifying Workshop Mode that content is ready');
    document.dispatchEvent(new CustomEvent('siteContentReady', {
      detail: { timestamp: Date.now() }
    }));
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
        { 
          id: "mechanical-keyboard", 
          title: "01 Custom Mechanical Keyboard", 
          description: "Building a 60% keyboard from scratch. PCB design, firmware, and case machining.",
          image: "images/project-1754075814066.png",
          category: "Hardware",
          date: "2024.01.15"
        },
        { 
          id: "gesture-recognition", 
          title: "02 Hand Gesture Recognition", 
          description: "Computer vision experiment for controlling devices through hand movements.",
          image: "images/project-1754076096369.png",
          category: "Software", 
          date: "2024.01.12"
        }
      ]);
    }
  }
}

// Workshop Mode removed - Admin Panel is now the single CMS solution

// Initialize site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SiteManager();
});
