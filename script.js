// Main site functionality
class SiteManager {
  constructor() {
    this.currentFont = localStorage.getItem('font') || 'courier';
    this.chaosMode = localStorage.getItem('chaos') === 'true';
    this.easterEggClicks = 0;
    
    // Initialize WorkshopManager for live editing capabilities
    this.workshop = new WorkshopManager();
    
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
        return;
      }
    }
    
    // Route-specific content loading using the loaded data
    const path = window.location.pathname;
    console.log('🔀 Current path:', path, '| Data source:', data === window.EMBEDDED_SITE_DATA ? 'embedded' : 'external');
    
    if (path === '/' || path === '/index.html') {
      this.loadHomepage(data);
    } else if (path === '/projects.html' || path.endsWith('/projects.html')) {
      this.loadProjectsPage(data);
    } else if (path === '/log.html' || path.endsWith('/log.html')) {
      this.loadLogPage(data);
    } else if (path === '/project.html' || path.endsWith('/project.html')) {
      this.loadProjectPage(data);
    }
  }

  loadHomepage(data) {
    this.loadLogEntries(data.explorerLog.slice(0, 3)); // Show latest 3 entries
    this.loadFeaturedProjects(data.projects.filter(p => p.featured).slice(0, 2)); // Show exactly 2 projects
  }

  loadProjectsPage(data) {
    const container = document.getElementById('allProjects');
    if (container && data.projects) {
      // Check if we're using the new table layout
      if (container.classList.contains('projects-table') || container.parentElement.classList.contains('projects-layout')) {
        container.innerHTML = data.projects.map(project => `
          <div class="project-table-item">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-table-image">` : '<div class="project-table-image-placeholder">NO IMAGE</div>'}
          </div>
          <div class="project-table-item">
            <div class="project-table-title">${project.title}</div>
            <div class="project-table-location">${project.location || 'Personal Studio, Toronto'}</div>
            <div class="project-table-date">${project.date || new Date().getFullYear()}</div>
            <div class="project-table-category">${project.category || ''}</div>
          </div>
          <div class="project-table-item">
            <div class="project-table-description">${project.description}</div>
          </div>
        `).join('');
      } else {
        // Legacy grid layout
        container.innerHTML = data.projects.map(project => `
          <div class="project-item">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
            <div class="project-title">
              <a href="project.html?id=${project.id}">${project.title}</a>
            </div>
            <div class="project-description">${project.description}</div>
          </div>
        `).join('');
      }
    } else {
      console.log('Container or data.projects not found', container, data.projects);
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
          <div class="log-content">${entry.content}</div>
        </div>
      `).join('');
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
      const projectsHTML = projects.map(project => `
        <div class="project-item">
          ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
          <div class="project-title">
            <a href="project.html?id=${project.id}">${project.title}</a>
          </div>
          <div class="project-description">${project.description}</div>
        </div>
      `).join('');
      
      // Add the "MORE PROJECTS" link outside the grid
      container.innerHTML = projectsHTML;
      
      // Add the more projects link after the grid
      const moreProjectsLink = container.parentElement.querySelector('.more-projects-link') || 
        document.createElement('div');
      moreProjectsLink.className = 'more-projects-link';
      moreProjectsLink.innerHTML = '<a href="projects.html">MORE PROJECTS...</a>';
      
      if (!container.parentElement.querySelector('.more-projects-link')) {
        container.parentElement.appendChild(moreProjectsLink);
      }
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
        { id: "mechanical-keyboard", title: "01 Custom Mechanical Keyboard", description: "Building a 60% keyboard from scratch. PCB design, firmware, and case machining." },
        { id: "gesture-recognition", title: "02 Hand Gesture Recognition", description: "Computer vision experiment for controlling devices through hand movements." }
      ]);
    }
  }
}

// Workshop Mode - Live Content Management System
class WorkshopManager {
  constructor() {
    this.KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    this.sequence = [];
    this.sequenceTimeout = null;
    this.isWorkshopMode = false;
    this.session = null;
    
    this.init();
  }
  
  init() {
    this.setupKonamiDetection();
    this.checkExistingSession();
  }
  
  setupKonamiDetection() {
    document.addEventListener('keydown', (e) => {
      // Reset sequence on timeout or wrong key
      if (this.sequenceTimeout) {
        clearTimeout(this.sequenceTimeout);
      }
      
      // Check if key matches next in sequence
      const expectedKey = this.KONAMI_SEQUENCE[this.sequence.length];
      
      if (e.code === expectedKey) {
        this.sequence.push(e.code);
        
        // Complete sequence detected
        if (this.sequence.length === this.KONAMI_SEQUENCE.length) {
          this.onKonamiComplete();
          this.sequence = [];
          return;
        }
        
        // Set timeout to reset sequence if too slow
        this.sequenceTimeout = setTimeout(() => {
          this.sequence = [];
        }, 2000);
        
      } else {
        // Wrong key, reset sequence
        this.sequence = [];
      }
    });
  }
  
  onKonamiComplete() {
    console.log('🎮 Konami code detected - Workshop access requested');
    
    // Subtle visual feedback
    document.body.style.transition = 'filter 0.3s ease';
    document.body.style.filter = 'brightness(1.1)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 300);
    
    // Show PIN entry modal
    this.showPinModal();
  }
  
  showPinModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'workshop-modal-overlay';
    modal.innerHTML = `
      <div class="workshop-modal">
        <div class="workshop-header">
          <h2>Workshop Access</h2>
          <p>Enter PIN to activate Workshop Mode</p>
        </div>
        <div class="workshop-form">
          <input type="password" id="workshop-pin" placeholder="•••••" maxlength="5" autocomplete="off">
          <div class="workshop-buttons">
            <button id="workshop-submit">Enter Workshop</button>
            <button id="workshop-cancel">Cancel</button>
          </div>
        </div>
        <div class="workshop-attempts" id="workshop-attempts"></div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus PIN input
    const pinInput = document.getElementById('workshop-pin');
    pinInput.focus();
    
    // Handle form submission
    const submitBtn = document.getElementById('workshop-submit');
    const cancelBtn = document.getElementById('workshop-cancel');
    
    const handleSubmit = () => this.verifyPin(pinInput.value, modal);
    const handleCancel = () => this.closeModal(modal);
    
    submitBtn.addEventListener('click', handleSubmit);
    cancelBtn.addEventListener('click', handleCancel);
    
    // Enter key submits
    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        handleCancel();
      }
    });
  }
  
  async verifyPin(pin, modal) {
    // Check rate limiting
    const attempts = this.getRateLimitInfo();
    if (attempts.locked) {
      this.showError('Workshop access temporarily locked. Try again later.', modal);
      return;
    }
    
    try {
      const isValid = await this.validatePin(pin);
      
      if (isValid) {
        this.onAuthSuccess(modal);
      } else {
        this.onAuthFailure(modal);
      }
    } catch (error) {
      console.error('Workshop authentication error:', error);
      this.showError('Authentication system temporarily unavailable.', modal);
    }
  }
  
  async validatePin(pin) {
    // For now, use a simple PIN. Later we'll implement proper hashing
    const WORKSHOP_PIN = '12345'; // TODO: Replace with hashed PIN
    
    // Simulate async validation delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return pin === WORKSHOP_PIN;
  }
  
  onAuthSuccess(modal) {
    console.log('✅ Workshop authentication successful');
    
    // Store session
    const sessionData = {
      authenticated: true,
      timestamp: Date.now(),
      expires: Date.now() + (2 * 60 * 60 * 1000) // 2 hours
    };
    
    localStorage.setItem('workshop-session', JSON.stringify(sessionData));
    this.session = sessionData;
    
    // Clear rate limiting
    localStorage.removeItem('workshop-attempts');
    
    // Close modal with success animation
    modal.querySelector('.workshop-modal').style.transform = 'scale(1.05)';
    modal.querySelector('.workshop-modal').style.background = 'var(--color-bg)';
    
    setTimeout(() => {
      this.closeModal(modal);
      this.activateWorkshopMode();
    }, 500);
  }
  
  onAuthFailure(modal) {
    console.log('❌ Workshop authentication failed');
    
    // Update rate limiting
    const attempts = this.getRateLimitInfo();
    attempts.count++;
    attempts.lastAttempt = Date.now();
    
    if (attempts.count >= 5) {
      attempts.locked = true;
      attempts.lockUntil = Date.now() + (15 * 60 * 1000); // 15 minutes
    }
    
    localStorage.setItem('workshop-attempts', JSON.stringify(attempts));
    
    // Show error
    if (attempts.locked) {
      this.showError('Too many failed attempts. Workshop access locked for 15 minutes.', modal);
    } else {
      this.showError(`Invalid PIN. ${5 - attempts.count} attempts remaining.`, modal);
    }
    
    // Clear input
    document.getElementById('workshop-pin').value = '';
    document.getElementById('workshop-pin').focus();
  }
  
  getRateLimitInfo() {
    const stored = localStorage.getItem('workshop-attempts');
    const attempts = stored ? JSON.parse(stored) : { count: 0, lastAttempt: 0, locked: false, lockUntil: 0 };
    
    // Reset if lock expired
    if (attempts.locked && Date.now() > attempts.lockUntil) {
      attempts.locked = false;
      attempts.count = 0;
    }
    
    // Reset count after 1 hour of no attempts
    if (Date.now() - attempts.lastAttempt > 60 * 60 * 1000) {
      attempts.count = 0;
    }
    
    return attempts;
  }
  
  showError(message, modal) {
    const attemptsDiv = modal.querySelector('#workshop-attempts');
    attemptsDiv.textContent = message;
    attemptsDiv.style.color = 'var(--color-accent)';
    
    // Shake animation
    const form = modal.querySelector('.workshop-modal');
    form.style.animation = 'workshop-shake 0.5s ease-in-out';
    setTimeout(() => {
      form.style.animation = '';
    }, 500);
  }
  
  closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }
  
  checkExistingSession() {
    const stored = localStorage.getItem('workshop-session');
    if (stored) {
      const session = JSON.parse(stored);
      
      // Check if session is still valid
      if (session.authenticated && Date.now() < session.expires) {
        this.session = session;
        this.activateWorkshopMode();
      } else {
        // Clear expired session
        localStorage.removeItem('workshop-session');
      }
    }
  }
  
  activateWorkshopMode() {
    console.log('🔧 Workshop Mode activated');
    this.isWorkshopMode = true;
    
    // Add workshop mode class to body
    document.body.classList.add('workshop-mode');
    
    // Show workshop indicator
    this.showWorkshopIndicator();
    
    // Enable inline editing
    this.enableInlineEditing();
    
    // TODO: Phase III - Setup GitHub integration  
    // TODO: Phase IV - Full UI transformation
  }
  
  enableInlineEditing() {
    console.log('✏️ Enabling inline editing capabilities');
    
    // Make content elements editable
    this.makeContentEditable();
    
    // Setup edit event handlers
    this.setupEditHandlers();
    
    // Add visual edit indicators
    this.addEditIndicators();
  }
  
  makeContentEditable() {
    // Define editable content selectors
    const editableSelectors = [
      '.log-content',     // Explorer log entries
      '.log-date',        // Log dates
      '.project-title a', // Project titles
      '.project-description', // Project descriptions
      '.project-table-title', // Tom Sachs table titles
      '.project-table-description', // Tom Sachs table descriptions
      '.section-title',   // Section headings
    ];
    
    editableSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.classList.add('workshop-editable');
        element.setAttribute('data-workshop-type', this.getContentType(selector));
        element.setAttribute('data-workshop-original', element.textContent);
      });
    });
  }
  
  getContentType(selector) {
    const typeMap = {
      '.log-content': 'log-content',
      '.log-date': 'log-date', 
      '.project-title a': 'project-title',
      '.project-description': 'project-description',
      '.project-table-title': 'project-title',
      '.project-table-description': 'project-description',
      '.section-title': 'section-title'
    };
    return typeMap[selector] || 'text';
  }
  
  setupEditHandlers() {
    // Click to edit
    document.addEventListener('click', (e) => {
      if (!this.isWorkshopMode) return;
      
      const editableElement = e.target.closest('.workshop-editable');
      if (editableElement) {
        e.preventDefault();
        this.startEditing(editableElement);
      }
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!this.isWorkshopMode) return;
      
      // Escape cancels editing
      if (e.key === 'Escape' && this.currentEdit) {
        this.cancelEdit();
      }
      
      // Ctrl+S saves all changes
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.saveAllChanges();
      }
    });
  }
  
  addEditIndicators() {
    const editableElements = document.querySelectorAll('.workshop-editable');
    editableElements.forEach(element => {
      element.style.position = 'relative';
      element.style.cursor = 'text';
      
      // Add subtle hover effect
      element.addEventListener('mouseenter', () => {
        if (!this.isWorkshopMode || element.classList.contains('workshop-editing')) return;
        element.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      });
      
      element.addEventListener('mouseleave', () => {
        if (!element.classList.contains('workshop-editing')) {
          element.style.backgroundColor = '';
        }
      });
    });
  }
  
  startEditing(element) {
    // Prevent multiple simultaneous edits
    if (this.currentEdit && this.currentEdit !== element) {
      this.finishEditing(this.currentEdit);
    }
    
    console.log('✏️ Starting edit for:', element.getAttribute('data-workshop-type'));
    
    this.currentEdit = element;
    element.classList.add('workshop-editing');
    
    // Store original content
    const originalText = element.textContent;
    element.setAttribute('data-workshop-original', originalText);
    
    // Create inline editor
    const editor = this.createInlineEditor(element, originalText);
    
    // Replace content with editor
    element.innerHTML = '';
    element.appendChild(editor);
    
    // Focus and select
    editor.focus();
    editor.select();
    
    // Show editing indicators
    this.showEditingState(element);
  }
  
  createInlineEditor(element, originalText) {
    const contentType = element.getAttribute('data-workshop-type');
    
    let editor;
    
    if (contentType === 'log-content' || contentType === 'project-description') {
      // Multi-line textarea for longer content
      editor = document.createElement('textarea');
      editor.rows = Math.max(3, Math.ceil(originalText.length / 60));
    } else {
      // Single-line input for titles and short content
      editor = document.createElement('input');
      editor.type = 'text';
    }
    
    editor.className = 'workshop-inline-editor';
    editor.value = originalText;
    
    // Handle save on Enter (single-line) or Ctrl+Enter (multi-line)
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (editor.tagName === 'INPUT' || (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          this.finishEditing(element, editor.value);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.cancelEdit();
      }
    });
    
    // Handle blur (click outside)
    editor.addEventListener('blur', () => {
      setTimeout(() => {
        if (this.currentEdit === element) {
          this.finishEditing(element, editor.value);
        }
      }, 100);
    });
    
    return editor;
  }
  
  showEditingState(element) {
    // Update workshop indicator
    const indicator = document.querySelector('.workshop-text');
    if (indicator) {
      indicator.textContent = 'Editing...';
    }
    
    // Add visual editing state
    element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    element.style.border = '1px dashed var(--color-accent)';
    element.style.padding = '2px';
  }
  
  async finishEditing(element, newContent = null) {
    if (!element || !element.classList.contains('workshop-editing')) return;
    
    const editor = element.querySelector('.workshop-inline-editor');
    const finalContent = newContent || (editor ? editor.value : element.textContent);
    const originalContent = element.getAttribute('data-workshop-original');
    
    console.log('💾 Finishing edit:', { originalContent, finalContent });
    
    // Check if content actually changed
    if (finalContent === originalContent) {
      this.cancelEdit();
      return;
    }
    
    // Show optimistic update immediately
    this.applyOptimisticUpdate(element, finalContent);
    
    // Save to backend
    try {
      await this.saveContentChange(element, finalContent, originalContent);
      this.showWorkshopMessage('Changes forged successfully', 'success');
    } catch (error) {
      console.error('Failed to save changes:', error);
      this.showWorkshopMessage('Failed to forge changes', 'error');
      // Revert on failure
      this.applyOptimisticUpdate(element, originalContent);
    }
    
    this.cleanupEditor(element);
  }
  
  applyOptimisticUpdate(element, content) {
    // Clear editor and restore content
    element.innerHTML = '';
    element.textContent = content;
    
    // Update data attribute
    element.setAttribute('data-workshop-original', content);
    
    // Visual feedback for successful update
    element.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
    setTimeout(() => {
      element.style.backgroundColor = '';
    }, 1000);
  }
  
  async saveContentChange(element, newContent, originalContent) {
    const contentType = element.getAttribute('data-workshop-type');
    const changeData = {
      type: contentType,
      content: newContent,
      original: originalContent,
      timestamp: Date.now(),
      element: this.getElementIdentifier(element)
    };
    
    // For now, simulate backend call
    // TODO: Implement actual Netlify Function call
    console.log('🚀 Saving to backend:', changeData);
    
    await new Promise(resolve => {
      setTimeout(() => {
        // Simulate network delay
        resolve();
      }, Math.random() * 1000 + 500);
    });
    
    // Store change locally for now
    this.storeLocalChange(changeData);
    
    return { success: true };
  }
  
  storeLocalChange(changeData) {
    const stored = localStorage.getItem('workshop-changes') || '[]';
    const changes = JSON.parse(stored);
    changes.push(changeData);
    
    // Keep only last 50 changes
    if (changes.length > 50) {
      changes.splice(0, changes.length - 50);
    }
    
    localStorage.setItem('workshop-changes', JSON.stringify(changes));
  }
  
  getElementIdentifier(element) {
    // Create a unique identifier for the element
    const parent = element.closest('[id]') || element.closest('[class*="main"]');
    const parentId = parent ? parent.id || parent.className : 'unknown';
    const elementClass = element.className;
    const textPreview = element.textContent.substring(0, 20);
    
    return {
      parentId,
      elementClass,
      textPreview,
      selector: this.generateSelector(element)
    };
  }
  
  generateSelector(element) {
    // Generate a CSS selector for the element
    let selector = element.tagName.toLowerCase();
    
    if (element.id) {
      selector += `#${element.id}`;
    }
    
    if (element.className) {
      const classes = element.className.split(' ').filter(c => c && !c.startsWith('workshop-'));
      if (classes.length > 0) {
        selector += `.${classes.join('.')}`;
      }
    }
    
    return selector;
  }
  
  cancelEdit() {
    if (!this.currentEdit) return;
    
    console.log('❌ Cancelling edit');
    
    const element = this.currentEdit;
    const originalContent = element.getAttribute('data-workshop-original');
    
    // Restore original content
    element.innerHTML = '';
    element.textContent = originalContent;
    
    this.cleanupEditor(element);
  }
  
  cleanupEditor(element) {
    // Remove editing state
    element.classList.remove('workshop-editing');
    element.style.backgroundColor = '';
    element.style.border = '';
    element.style.padding = '';
    
    // Reset workshop indicator
    const indicator = document.querySelector('.workshop-text');
    if (indicator) {
      indicator.textContent = 'Workshop Mode';
    }
    
    this.currentEdit = null;
  }
  
  showWorkshopMessage(message, type = 'info') {
    // Create temporary message overlay
    const messageEl = document.createElement('div');
    messageEl.className = `workshop-message workshop-message-${type}`;
    messageEl.innerHTML = `
      <div class="workshop-message-content">
        <span class="workshop-message-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="workshop-message-text">${message}</span>
      </div>
    `;
    
    document.body.appendChild(messageEl);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        messageEl.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(messageEl)) {
            document.body.removeChild(messageEl);
          }
        }, 300);
      }
    }, 3000);
  }
  
  async saveAllChanges() {
    console.log('💾 Saving all pending changes...');
    
    const editingElements = document.querySelectorAll('.workshop-editing');
    for (const element of editingElements) {
      await this.finishEditing(element);
    }
    
    this.showWorkshopMessage('All changes forged successfully', 'success');
  }
  
  showWorkshopIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'workshop-indicator';
    indicator.innerHTML = `
      <div class="workshop-status">
        <span class="workshop-icon">🔧</span>
        <span class="workshop-text">Workshop Mode</span>
        <button class="workshop-exit" id="workshop-exit">Exit</button>
      </div>
    `;
    
    document.body.appendChild(indicator);
    
    // Exit functionality
    document.getElementById('workshop-exit').addEventListener('click', () => {
      this.deactivateWorkshopMode();
    });
  }
  
  deactivateWorkshopMode() {
    console.log('🔧 Workshop Mode deactivated');
    this.isWorkshopMode = false;
    
    // Cancel any active editing
    if (this.currentEdit) {
      this.cancelEdit();
    }
    
    // Clean up editable elements
    this.cleanupEditableElements();
    
    // Remove workshop mode class
    document.body.classList.remove('workshop-mode');
    
    // Remove indicator
    const indicator = document.querySelector('.workshop-indicator');
    if (indicator) {
      document.body.removeChild(indicator);
    }
    
    // Clear session
    localStorage.removeItem('workshop-session');
    this.session = null;
  }
  
  cleanupEditableElements() {
    const editableElements = document.querySelectorAll('.workshop-editable');
    editableElements.forEach(element => {
      element.classList.remove('workshop-editable', 'workshop-editing');
      element.removeAttribute('data-workshop-type');
      element.removeAttribute('data-workshop-original');
      element.style.position = '';
      element.style.cursor = '';
      element.style.backgroundColor = '';
      element.style.border = '';
      element.style.padding = '';
    });
  }
}

// Initialize site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SiteManager();
});