// Admin Panel - GitHub API Integration for Content Management
class AdminPanel {
    constructor() {
        this.data = null;
        this.hasChanges = false;
        this.githubToken = localStorage.getItem('github-token');
        this.repo = 'johockin/johnnyhockin.com';
        this.branch = 'main';
        this.dataFile = 'data.json';
        
        console.log('🔧 Admin Panel initializing...');
        this.init();
    }

    async init() {
        if (!this.githubToken) {
            this.showAuthForm();
            return;
        }

        try {
            await this.loadData();
            this.setupEventListeners();
            this.renderContent();
            this.showStatus('Content loaded successfully', 'success');
        } catch (error) {
            console.error('Failed to initialize admin panel:', error);
            this.showStatus('Failed to load content. Check your GitHub token.', 'error');
        }
    }

    showAuthForm() {
        document.body.innerHTML = `
            <div class="auth-form">
                <h2>GitHub Authentication Required</h2>
                <p>Enter your GitHub Personal Access Token to manage content.</p>
                <p><small>Token needs 'repo' scope. <a href="https://github.com/settings/tokens" target="_blank">Create one here</a></small></p>
                <input type="password" id="github-token" placeholder="ghp_xxxxxxxxxxxx..." />
                <button class="auth-btn" onclick="adminPanel.authenticate()">Connect to GitHub</button>
            </div>
        `;
    }

    authenticate() {
        const token = document.getElementById('github-token').value.trim();
        if (!token) {
            alert('Please enter a GitHub token');
            return;
        }

        localStorage.setItem('github-token', token);
        this.githubToken = token;
        
        // Reload the page to reinitialize
        window.location.reload();
    }

    async loadData() {
        const url = `https://api.github.com/repos/${this.repo}/contents/${this.dataFile}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${this.githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const fileData = await response.json();
        const content = atob(fileData.content);
        this.data = JSON.parse(content);
        this.fileSha = fileData.sha; // Needed for updates
        
        console.log('📦 Data loaded from GitHub:', this.data);
    }

    async saveData() {
        if (!this.hasChanges) {
            this.showStatus('No changes to save', 'success');
            return;
        }

        try {
            this.showStatus('Saving changes to GitHub...', 'info');
            
            const content = btoa(JSON.stringify(this.data, null, 2));
            const url = `https://api.github.com/repos/${this.repo}/contents/${this.dataFile}`;
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Update content via admin panel - ${new Date().toISOString()}`,
                    content: content,
                    sha: this.fileSha,
                    branch: this.branch
                })
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const result = await response.json();
            this.fileSha = result.content.sha; // Update SHA for next save
            this.hasChanges = false;
            this.updateSaveButton();
            
            this.showStatus('Changes saved successfully! Site will update in ~1 minute.', 'success');
            
        } catch (error) {
            console.error('Save failed:', error);
            this.showStatus(`Save failed: ${error.message}`, 'error');
        }
    }

    setupEventListeners() {
        // Save button
        document.getElementById('save-all').addEventListener('click', () => {
            this.saveData();
        });

        // Add entry buttons
        document.getElementById('add-log-entry').addEventListener('click', () => {
            this.addLogEntry();
        });

        document.getElementById('add-project').addEventListener('click', () => {
            this.addProject();
        });
    }

    renderContent() {
        this.renderLogEntries();
        this.renderProjects();
        this.renderSiteConfig();
    }

    renderLogEntries() {
        const container = document.getElementById('log-entries');
        container.innerHTML = '';

        // Sort by date (newest first)
        const sortedEntries = [...this.data.explorerLog].sort((a, b) => 
            new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-'))
        );

        sortedEntries.forEach(entry => {
            const form = this.createLogEntryForm(entry);
            container.appendChild(form);
        });
    }

    createLogEntryForm(entry) {
        const div = document.createElement('div');
        div.className = 'entry-form';
        div.innerHTML = `
            <div class="form-row">
                <div class="form-group small">
                    <label>Date</label>
                    <input type="text" value="${entry.date}" 
                           onchange="adminPanel.updateLogEntry('${entry.id}', 'date', this.value)" />
                </div>
                <div class="form-group small">
                    <label>ID</label>
                    <input type="text" value="${entry.id}" 
                           onchange="adminPanel.updateLogEntry('${entry.id}', 'id', this.value)" />
                </div>
                <div class="form-group actions">
                    <button class="delete-btn" onclick="adminPanel.deleteLogEntry('${entry.id}')">Delete</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Content</label>
                    <textarea onchange="adminPanel.updateLogEntry('${entry.id}', 'content', this.value)">${entry.content}</textarea>
                </div>
            </div>
        `;
        return div;
    }

    renderProjects() {
        const container = document.getElementById('projects');
        container.innerHTML = '';

        if (this.data.projects) {
            this.data.projects.forEach(project => {
                const form = this.createProjectForm(project);
                container.appendChild(form);
            });
        }
    }

    createProjectForm(project) {
        const div = document.createElement('div');
        div.className = 'entry-form';
        div.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" value="${project.title || ''}" 
                           onchange="adminPanel.updateProject('${project.id}', 'title', this.value)" />
                </div>
                <div class="form-group small">
                    <label>ID</label>
                    <input type="text" value="${project.id}" 
                           onchange="adminPanel.updateProject('${project.id}', 'id', this.value)" />
                </div>
                <div class="form-group actions">
                    <button class="delete-btn" onclick="adminPanel.deleteProject('${project.id}')">Delete</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Description</label>
                    <textarea onchange="adminPanel.updateProject('${project.id}', 'description', this.value)">${project.description || ''}</textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="text" value="${project.image || ''}" 
                           onchange="adminPanel.updateProject('${project.id}', 'image', this.value)" />
                </div>
                <div class="form-group">
                    <label>Link URL</label>
                    <input type="text" value="${project.link || ''}" 
                           onchange="adminPanel.updateProject('${project.id}', 'link', this.value)" />
                </div>
            </div>
        `;
        return div;
    }

    renderSiteConfig() {
        const container = document.getElementById('site-config');
        container.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Site Title</label>
                    <input type="text" value="${this.data.site.title}" 
                           onchange="adminPanel.updateSiteConfig('title', this.value)" />
                </div>
                <div class="form-group">
                    <label>Site URL</label>
                    <input type="text" value="${this.data.site.url}" 
                           onchange="adminPanel.updateSiteConfig('url', this.value)" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Site Description</label>
                    <textarea onchange="adminPanel.updateSiteConfig('description', this.value)">${this.data.site.description}</textarea>
                </div>
            </div>
        `;
    }

    // Update methods
    updateLogEntry(id, field, value) {
        const entry = this.data.explorerLog.find(e => e.id === id);
        if (entry) {
            if (field === 'id') {
                // Handle ID changes carefully
                entry.id = value;
            } else {
                entry[field] = value;
            }
            this.markChanged();
        }
    }

    updateProject(id, field, value) {
        if (!this.data.projects) this.data.projects = [];
        const project = this.data.projects.find(p => p.id === id);
        if (project) {
            if (field === 'id') {
                project.id = value;
            } else {
                project[field] = value;
            }
            this.markChanged();
        }
    }

    updateSiteConfig(field, value) {
        this.data.site[field] = value;
        this.markChanged();
    }

    // Add methods
    addLogEntry() {
        const newId = `log-${String(this.data.explorerLog.length + 1).padStart(3, '0')}`;
        const newEntry = {
            id: newId,
            date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
            content: 'New log entry - click to edit'
        };
        
        this.data.explorerLog.push(newEntry);
        this.markChanged();
        this.renderLogEntries();
    }

    addProject() {
        if (!this.data.projects) this.data.projects = [];
        
        const newId = `project-${this.data.projects.length + 1}`;
        const newProject = {
            id: newId,
            title: 'New Project',
            description: 'Project description...',
            image: '',
            link: ''
        };
        
        this.data.projects.push(newProject);
        this.markChanged();
        this.renderProjects();
    }

    // Delete methods
    deleteLogEntry(id) {
        if (confirm('Delete this log entry?')) {
            this.data.explorerLog = this.data.explorerLog.filter(e => e.id !== id);
            this.markChanged();
            this.renderLogEntries();
        }
    }

    deleteProject(id) {
        if (confirm('Delete this project?')) {
            this.data.projects = this.data.projects.filter(p => p.id !== id);
            this.markChanged();
            this.renderProjects();
        }
    }

    // Utility methods
    markChanged() {
        this.hasChanges = true;
        this.updateSaveButton();
    }

    updateSaveButton() {
        const btn = document.getElementById('save-all');
        btn.disabled = !this.hasChanges;
        btn.textContent = this.hasChanges ? 'Save All Changes' : 'No Changes';
    }

    showStatus(message, type = 'info') {
        const status = document.getElementById('status');
        status.innerHTML = `<p>${message}</p>`;
        status.className = `admin-status ${type}`;
    }
}

// Initialize admin panel
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});