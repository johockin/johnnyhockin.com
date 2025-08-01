// Main site functionality
class SiteManager {
  constructor() {
    this.currentFont = localStorage.getItem('font') || 'courier';
    this.chaosMode = localStorage.getItem('chaos') === 'true';
    this.easterEggClicks = 0;
    
    console.log('🚀 SiteManager initializing...');
    
    // Initialize WorkshopManager for live editing capabilities
    try {
      this.workshop = new WorkshopManager();
      console.log('✅ WorkshopManager initialized successfully');
    } catch (error) {
      console.error('❌ WorkshopManager failed to initialize:', error);
    }
    
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
        this.notifyContentReady(); // Notify even for placeholder content
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
    
    // Notify that site content is ready for Workshop Mode
    this.notifyContentReady();
  }

  // Notify WorkshopManager that dynamic content has loaded
  notifyContentReady() {
    console.log('📢 Notifying that content is ready for Workshop Mode');
    
    // Dispatch custom event that WorkshopManager can listen for
    const contentReadyEvent = new CustomEvent('siteContentReady', {
      detail: { timestamp: Date.now() }
    });
    document.dispatchEvent(contentReadyEvent);
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
        container.innerHTML = data.projects.map(project => {
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
              <div class="project-table-description">${project.fullDescription || project.description}</div>
            </div>
          `;
        }).join('');
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
        { id: "mechanical-keyboard", title: "01 Custom Mechanical Keyboard", description: "Building a 60% keyboard from scratch. PCB design, firmware, and case machining." },
        { id: "gesture-recognition", title: "02 Hand Gesture Recognition", description: "Computer vision experiment for controlling devices through hand movements." }
      ]);
    }
  }
}

// Workshop Mode - Live Content Management System
class WorkshopManager {
  constructor() {
    console.log('🔧 WorkshopManager constructor starting...');
    
    this.KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    this.sequence = [];
    this.sequenceTimeout = null;
    this.isWorkshopMode = false;
    this.session = null;
    this.undoStack = [];
    this.redoStack = [];
    this.maxUndoSteps = 20;
    
    console.log('🎮 Konami sequence ready:', this.KONAMI_SEQUENCE);
    
    // Check for existing valid session
    this.checkExistingSession();
    
    this.init();
  }

  checkExistingSession() {
    const sessionToken = localStorage.getItem('workshop-session');
    const expiresStr = localStorage.getItem('workshop-expires');
    
    if (sessionToken && expiresStr) {
      const expires = parseInt(expiresStr);
      if (Date.now() < expires) {
        console.log('🔧 Valid workshop session found - activating Workshop Mode');
        this.isWorkshopMode = true;
        this.activateWorkshopMode();
      } else {
        console.log('🔧 Workshop session expired - clearing storage');
        localStorage.removeItem('workshop-session');
        localStorage.removeItem('workshop-expires');
      }
    }
  }
  
  init() {
    this.setupKonamiDetection();
    this.setupContentListener();
  }
  
  setupContentListener() {
    // Listen for content ready events to refresh Workshop Mode elements
    document.addEventListener('siteContentReady', (event) => {
      console.log('🔧 Workshop received content ready notification:', event.detail);
      
      // If Workshop Mode is active, refresh editable elements
      if (this.isWorkshopMode) {
        console.log('♻️ Refreshing Workshop Mode for new content');
        this.refreshWorkshopMode();
      }
    });
    
    // Also listen for page visibility changes (handles navigation edge cases)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isWorkshopMode) {
        // Small delay to ensure content has loaded after navigation
        setTimeout(() => {
          const currentEditableCount = document.querySelectorAll('.workshop-editable').length;
          if (currentEditableCount === 0) {
            console.log('🔄 Page became visible with no editable elements - refreshing Workshop Mode');
            this.refreshWorkshopMode();
          }
        }, 100);
      }
    });
  }
  
  refreshWorkshopMode() {
    // Update indicator to show we're refreshing
    const indicator = document.querySelector('.workshop-text');
    if (indicator) {
      indicator.textContent = 'Refreshing...';
    }
    
    // Clean up existing editable elements first
    this.cleanupEditableElements();
    
    // Re-enable editing with new content
    this.enableInlineEditing();
    
    // Reset indicator
    if (indicator) {
      indicator.textContent = 'Workshop Mode';
    }
    
    console.log('✅ Workshop Mode refreshed for new content');
  }
  
  setupContentListener() {
    // Listen for when site content is ready
    document.addEventListener('siteContentReady', () => {
      console.log('🔧 WorkshopManager received content ready notification');
      if (this.isWorkshopMode) {
        this.refreshWorkshopMode();
      }
    });
    
    // Backup: Also check when page visibility changes (handles navigation edge cases)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isWorkshopMode) {
        setTimeout(() => this.refreshWorkshopMode(), 100);
      }
    });
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
    console.log('🔧 Current workshop mode status:', this.isWorkshopMode);
    
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
    try {
      const response = await fetch('/.netlify/functions/workshop-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      const result = await response.json();
      
      if (result.success && result.sessionToken) {
        // Store session token for authenticated requests
        console.log('🔐 Authentication successful, storing session:', {
          tokenReceived: !!result.sessionToken,
          tokenLength: result.sessionToken ? result.sessionToken.length : 0,
          expires: result.expires,
          expiresDate: new Date(result.expires),
          currentTime: Date.now(),
          currentDate: new Date(),
          timeUntilExpiry: result.expires - Date.now()
        });
        
        localStorage.setItem('workshop-session', result.sessionToken);
        localStorage.setItem('workshop-expires', result.expires);
        
        // Immediately verify what we stored
        const storedToken = localStorage.getItem('workshop-session');
        const storedExpiry = localStorage.getItem('workshop-expires');
        console.log('🔐 Verification - stored session:', {
          storedTokenMatches: storedToken === result.sessionToken,
          storedExpiryMatches: storedExpiry == result.expires,
          storedToken: storedToken ? storedToken.substring(0, 20) + '...' : null,
          storedExpiry: storedExpiry
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Workshop authentication failed:', error);
      return false;
    }
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
  
  
  activateWorkshopMode() {
    console.log('🔧 Workshop Mode activated');
    this.isWorkshopMode = true;
    
    // Add workshop mode class to body
    document.body.classList.add('workshop-mode');
    
    // Show workshop indicator
    this.showWorkshopIndicator();
    
    // Enable inline editing - this will work even if content hasn't loaded yet
    // The content listener will refresh it when content is ready
    this.enableInlineEditing();
    
    // Show success message
    this.showWorkshopMessage('Workshop Mode activated - Edit content by clicking', 'success');
  }
  
  enableInlineEditing() {
    console.log('✏️ Enabling inline editing capabilities');
    
    // Make content elements editable
    this.makeContentEditable();
    
    // Setup edit event handlers (only once)
    if (!this.editHandlersSetup) {
      this.setupEditHandlers();
      this.editHandlersSetup = true;
    }
    
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
    
    let elementsFound = 0;
    
    editableSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elementsFound += elements.length;
      
      elements.forEach(element => {
        // Skip if already marked as editable
        if (!element.classList.contains('workshop-editable')) {
          element.classList.add('workshop-editable');
          element.setAttribute('data-workshop-type', this.getContentType(selector));
          element.setAttribute('data-workshop-original', element.textContent);
          
          // Ensure element has a workshop ID for backend persistence
          if (!element.getAttribute('data-workshop-id') && !element.id) {
            const workshopId = this.generateElementId(element);
            element.setAttribute('data-workshop-id', workshopId);
          }
        }
      });
    });
    
    console.log(`🎯 Made ${elementsFound} elements editable`);
    
    // If no elements found, content likely hasn't loaded yet
    if (elementsFound === 0) {
      console.log('⏳ No editable elements found - content may still be loading');
    }
  }
  
  getContentType(selector) {
    const typeMap = {
      '.log-content': 'explorer-log',
      '.log-date': 'explorer-log-date', 
      '.project-title a': 'project-title',
      '.project-description': 'project-description',
      '.project-table-title': 'project-table-title',
      '.project-table-description': 'project-table-description',
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
      
      // Ctrl+Z undo
      if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }
      
      // Ctrl+Shift+Z or Ctrl+Y redo
      if ((e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) || 
          (e.key === 'y' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        this.redo();
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
    
    // Save current state for undo
    this.saveToUndoStack(element, element.textContent);
    
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
    
    // Focus and select - ensure content is visible and selected
    editor.focus();
    
    // For better UX, select all content initially but allow cursor positioning
    setTimeout(() => {
      if (document.activeElement === editor) {
        editor.select();
      }
    }, 0);
    
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
    
    // Track if user has interacted beyond initial selection
    let hasUserInteracted = false;
    
    // Handle user interaction to preserve cursor position
    editor.addEventListener('keydown', (e) => {
      // Mark as interacted on any key except Tab/Shift/Ctrl/etc
      if (!['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
        hasUserInteracted = true;
      }
      
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
    
    // Handle mouse clicks to allow cursor positioning
    editor.addEventListener('mousedown', (e) => {
      hasUserInteracted = true;
    });
    
    // Handle arrow keys to allow cursor movement
    editor.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        hasUserInteracted = true;
      }
    });
    
    // Handle blur (click outside) - but only save if content changed
    editor.addEventListener('blur', () => {
      setTimeout(() => {
        if (this.currentEdit === element) {
          this.finishEditing(element, editor.value);
        }
      }, 100);
    });
    
    // Set up initial selection after a brief moment to ensure focus
    setTimeout(() => {
      if (!hasUserInteracted && document.activeElement === editor) {
        editor.select();
      }
    }, 10);
    
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
    
    // Prevent empty content - use placeholder if empty
    const safeContent = finalContent.trim() || '[Click to edit]';
    
    // Show optimistic update immediately
    this.applyOptimisticUpdate(element, safeContent);
    
    // Save to backend
    try {
      await this.saveContentChange(element, safeContent, originalContent);
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
    const elementId = element.getAttribute('data-workshop-id') || 
                      element.id || 
                      this.generateElementId(element);
    
    // Get session token
    const sessionToken = localStorage.getItem('workshop-session');
    const sessionExpires = localStorage.getItem('workshop-expires');
    
    console.log('🔧 Workshop session check:', {
      hasToken: !!sessionToken,
      tokenLength: sessionToken ? sessionToken.length : 0,
      expires: sessionExpires,
      currentTime: Date.now(),
      isExpired: sessionExpires ? Date.now() > parseInt(sessionExpires) : 'no expiry set'
    });
    
    if (!sessionToken) {
      console.error('❌ No workshop session token found');
      throw new Error('No valid workshop session');
    }
    
    // Check if session is expired
    if (sessionExpires && Date.now() > parseInt(sessionExpires)) {
      console.error('❌ Workshop session expired');
      localStorage.removeItem('workshop-session');
      localStorage.removeItem('workshop-expires');
      throw new Error('Workshop session expired - please re-authenticate');
    }
    
    try {
      const response = await fetch('/.netlify/functions/workshop-edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          contentType,
          elementId,
          newContent,
          originalContent,
          timestamp: Date.now(),
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          // Session expired, redirect to re-auth
          this.exitWorkshopMode();
          throw new Error('Workshop session expired. Please re-authenticate.');
        }
        throw new Error(result.error || 'Failed to save changes');
      }
      
      // Store change locally for backup
      this.storeLocalChange({
        type: contentType,
        elementId,
        content: newContent,
        original: originalContent,
        timestamp: result.timestamp || Date.now(),
      });
      
      return result;
    } catch (error) {
      console.error('Failed to save content change:', error);
      throw error;
    }
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

  generateElementId(element) {
    // Generate a unique ID for elements that don't have one
    const type = element.getAttribute('data-workshop-type') || 'content';
    const textHash = this.simpleHash(element.textContent.substring(0, 50));
    return `${type}-${textHash}`;
  }

  simpleHash(str) {
    // Simple hash function for generating element IDs
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
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
  
  // Undo/Redo System
  saveToUndoStack(element, content) {
    const undoStep = {
      element: element,
      selector: this.generateSelector(element),
      content: content,
      timestamp: Date.now()
    };
    
    this.undoStack.push(undoStep);
    
    // Limit undo stack size
    if (this.undoStack.length > this.maxUndoSteps) {
      this.undoStack.shift();
    }
    
    // Clear redo stack when new action is performed
    this.redoStack = [];
    
    console.log('💾 Saved to undo stack:', undoStep);
  }
  
  undo() {
    if (this.undoStack.length === 0) {
      this.showWorkshopMessage('Nothing to undo', 'info');
      return;
    }
    
    const undoStep = this.undoStack.pop();
    console.log('↶ Undoing:', undoStep);
    
    // Save current state to redo stack
    const currentContent = undoStep.element.textContent;
    this.redoStack.push({
      element: undoStep.element,
      selector: undoStep.selector,
      content: currentContent,
      timestamp: Date.now()
    });
    
    // Apply undo
    this.applyOptimisticUpdate(undoStep.element, undoStep.content);
    this.showWorkshopMessage('Undid last change', 'success');
  }
  
  redo() {
    if (this.redoStack.length === 0) {
      this.showWorkshopMessage('Nothing to redo', 'info');
      return;
    }
    
    const redoStep = this.redoStack.pop();
    console.log('↷ Redoing:', redoStep);
    
    // Save current state back to undo stack
    const currentContent = redoStep.element.textContent;
    this.undoStack.push({
      element: redoStep.element,
      selector: redoStep.selector,
      content: currentContent,
      timestamp: Date.now()
    });
    
    // Apply redo
    this.applyOptimisticUpdate(redoStep.element, redoStep.content);
    this.showWorkshopMessage('Redid last change', 'success');
  }
  
  showWorkshopIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'workshop-indicator';
    indicator.innerHTML = `
      <div class="workshop-status">
        <span class="workshop-icon">🔧</span>
        <span class="workshop-text">Workshop Mode</span>
        <span class="workshop-shortcuts">Ctrl+Z: Undo | Ctrl+Y: Redo</span>
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
    localStorage.removeItem('workshop-expires');
    this.session = null;
  }

  exitWorkshopMode() {
    // Alias for deactivateWorkshopMode - used when session expires
    this.deactivateWorkshopMode();
    this.showWorkshopMessage('Workshop session expired - please re-authenticate', 'error');
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