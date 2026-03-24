// Main Application Script
class MGZONApp {
    constructor() {
        this.currentPage = 'home';
        this.terminal = null;
        this.router = null;
        this.docsLoader = null;
        
        this.init();
    }
    
    init() {
        console.log('MGZON CLI Docs App Initializing...');
        
        // Initialize router with app reference
        this.router = new DocRouter(this);
        
        // Initialize docs loader
        this.docsLoader = new DocsLoader();
        
        // Set up navigation
        this.setupNavigation();
        
        // Set up copy buttons
        this.setupCopyButtons();
        
        // Start typewriter effect
        this.startTypewriter();
        
        // Initialize terminal if on terminal page
        if (window.location.hash === '#terminal') {
            this.initTerminal();
        }
        
        console.log('✅ MGZON CLI Docs App Ready');
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Get page from data attribute or href
                const page = link.dataset.page || 
                            link.getAttribute('href').substring(1);
                
                // Update URL
                window.location.hash = page;
                
                // Handle page change
                this.handlePageChange(page);
            });
        });
    }
    
    handlePageChange(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`page-${page}`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            // Initialize terminal if on terminal page
            if (page === 'terminal' && !this.terminal) {
                this.initTerminal();
            }
            
            // Load docs if on docs page
            if (page === 'docs') {
                this.docsLoader.loadInitialDocs();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }
    
    initTerminal() {
        console.log('Initializing terminal...');
        this.terminal = new RealTerminal();
    }
    
    setupCopyButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.copy-btn')) {
                const button = e.target.closest('.copy-btn');
                const code = button.dataset.code;
                
                if (code) {
                    navigator.clipboard.writeText(code)
                        .then(() => {
                            const originalHTML = button.innerHTML;
                            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                            button.classList.add('success');
                            
                            setTimeout(() => {
                                button.innerHTML = originalHTML;
                                button.classList.remove('success');
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy:', err);
                        });
                }
            }
        });
    }
    
    startTypewriter() {
        const texts = [
            "Welcome to MGZON CLI",
            "Type 'help' for commands",
            "mz init my-app --template=nextjs",
            "mz deploy --env=production"
        ];
        
        const typewriterEl = document.getElementById('typewriter');
        if (!typewriterEl) return;
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (!isDeleting && charIndex <= currentText.length) {
                typewriterEl.innerHTML = currentText.substring(0, charIndex) + 
                    '<span class="cursor">|</span>';
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex >= 0) {
                typewriterEl.innerHTML = currentText.substring(0, charIndex) + 
                    '<span class="cursor">|</span>';
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                setTimeout(type, 1000);
            }
        }
        
        // Start typing after a delay
        setTimeout(type, 1000);
    }
}


// Router Class
class DocRouter {
    constructor(app) {
        this.app = app;
        this.init();
    }
    
    init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Handle initial load - use setTimeout to ensure DOM is ready
        setTimeout(() => this.handleHashChange(), 100);
    }
    
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        
        // If it's a docs page (starts with docs/)
        if (hash.startsWith('docs/')) {
            const docName = hash.replace('docs/', '');
            if (this.app.docsLoader) {
                this.app.docsLoader.loadDoc(docName);
            }
            return;
        }
        
        // Handle regular pages
        const pages = ['home', 'docs', 'terminal', 'download'];
        const page = pages.includes(hash) ? hash : 'home';
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Trigger page change in main app
        this.app.handlePageChange(page);
    }
}


// Docs Loader
// Docs Loader for MGZON CLI Documentation
// class DocsLoader {
//     constructor() {
//         this.cache = {};
//         this.init();
//     }
    
//     init() {
//         console.log('📚 Docs Loader initialized');
//     }
    
//     async loadInitialDocs() {
//         try {
//             const response = await fetch('/api/docs');
//             const data = await response.json();
            
//             if (data.docs && data.docs.length > 0) {
//                 this.updateDocsLinks(data.docs);
//             }
//         } catch (error) {
//             console.error('Failed to load docs list:', error);
//         }
//     }
    
//     async loadDoc(docName) {
//         console.log('Loading doc:', docName);
        
//         if (this.cache[docName]) {
//             this.renderDoc(this.cache[docName]);
//             return;
//         }
        
//         const contentEl = document.getElementById('docs-content');
//         if (contentEl) {
//             contentEl.innerHTML = `
//                 <div class="loading">
//                     <i class="fas fa-spinner fa-spin fa-2x"></i>
//                     <p>Loading documentation...</p>
//                 </div>
//             `;
//         }
        
//         try {
//             const response = await fetch(`/api/docs/${docName}`);
            
//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.success) {
//                     this.cache[docName] = data;
//                     this.renderDoc(data);
//                 } else {
//                     this.showError(`Failed to load document: ${data.error}`);
//                 }
//             } else {
//                 await this.loadLocalMDX(docName);
//             }
//         } catch (error) {
//             console.error('Error loading doc:', error);
//             this.showError('Document not found or cannot be loaded.');
//         }
//     }
    
//     async loadLocalMDX(docName) {
//         try {
//             const response = await fetch(`/${docName}.mdx`);
            
//             if (response.ok) {
//                 const text = await response.text();
//                 const html = this.convertMDXtoHTML(text);
                
//                 this.cache[docName] = {
//                     title: this.extractTitle(text),
//                     content: html
//                 };
                
//                 this.renderDoc(this.cache[docName]);
//             } else {
//                 this.showError('Document file not found.');
//             }
//         } catch (error) {
//             console.error('Error loading local MDX:', error);
//             this.showError('Cannot read documentation file.');
//         }
//     }
    
//     renderDoc(docData) {
//         const contentEl = document.getElementById('docs-content');
//         if (!contentEl) return;
        
//         const html = `
//             <div class="mdx-content">
//                 <h1>${docData.title || 'Documentation'}</h1>
//                 <div class="doc-meta">
//                     <span class="doc-date">Last updated: ${new Date().toLocaleDateString()}</span>
//                 </div>
//                 <div class="doc-body">
//                     ${docData.content}
//                 </div>
//             </div>
//         `;
        
//         contentEl.innerHTML = html;
//     }
    
//     convertMDXtoHTML(text) {
//         return text
//             .replace(/^# (.*$)/gim, '<h1>$1</h1>')
//             .replace(/^## (.*$)/gim, '<h2>$1</h2>')
//             .replace(/^### (.*$)/gim, '<h3>$1</h3>')
//             .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
//             .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
//             .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
//             .replace(/\*(.*?)\*/gim, '<em>$1</em>')
//             .replace(/`(.*?)`/gim, '<code>$1</code>')
//             .replace(/```([a-z]*)\n([\s\S]*?)\n```/gim, '<pre><code class="language-$1">$2</code></pre>')
//             .replace(/\n\n/g, '</p><p>')
//             .replace(/\n/g, '<br>');
//     }
    
//     extractTitle(text) {
//         const match = text.match(/^# (.*)$/m);
//         return match ? match[1] : 'Documentation';
//     }
    
//     updateDocsLinks(docs) {
//         const linksContainer = document.querySelector('.docs-links');
//         if (!linksContainer) return;
        
//         linksContainer.innerHTML = '';
        
//         docs.forEach(doc => {
//             const link = document.createElement('a');
//             link.href = `#docs/${doc.name}`;
//             link.className = 'doc-link';
//             link.dataset.doc = doc.name;
//             link.innerHTML = `
//                 <i class="fas fa-file-alt"></i>
//                 ${doc.title}
//             `;
            
//             link.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 this.loadDoc(doc.name);
//             });
            
//             linksContainer.appendChild(link);
//         });
//     }
    
//     showError(message) {
//         const contentEl = document.getElementById('docs-content');
//         if (contentEl) {
//             contentEl.innerHTML = `
//                 <div class="error-content">
//                     <i class="fas fa-exclamation-triangle fa-3x"></i>
//                     <h3>Error Loading Documentation</h3>
//                     <p>${message}</p>
//                     <a href="#docs" class="btn">Back to Documentation</a>
//                 </div>
//             `;
//         }
//     }
// }

// Make it globally available
// window.DocsLoader = DocsLoader;
// Global function for install instructions
function showInstallInstructions(platform) {
    const instructions = {
        linux: `
# Linux Installation Instructions

1. Download the AppImage:
   curl -LO https://github.com/Mark-Lasfar/mgzon-cli/releases/download/v2.0.8/mgzon-linux

2. Make it executable:
   chmod +x mgzon-linux

3. Run it:
   ./mgzon-linux --version

4. (Optional) Move to PATH:
   sudo mv mgzon-linux /usr/local/bin/mgzon

5. Test:
   mgzon --version
        `,
        macos: `
# macOS Installation Instructions

1. Download the .dmg file
2. Open the downloaded file
3. Drag MGZON CLI to Applications folder
4. Open Terminal and run:
   /Applications/MGZON\\ CLI.app/Contents/MacOS/mgzon-macos --version

Alternative (via terminal):
curl -LO https://github.com/Mark-Lasfar/mgzon-cli/releases/download/v2.0.8/mgzon-macos
chmod +x mgzon-macos
sudo mv mgzon-macos /usr/local/bin/mgzon
mgzon --version
        `,
        windows: `
# Windows Installation Instructions

1. Download mgzon-win.exe
2. Run from Command Prompt or PowerShell:
   .\\mgzon-win.exe --version

3. For global access:
   - Create a folder for CLI tools (e.g., C:\\CLI)
   - Add it to PATH
   - Move mgzon-win.exe to that folder
   - Rename to mgzon.exe
   - Now you can run: mgzon --version

Alternative (PowerShell as Admin):
Set-ExecutionPolicy RemoteSigned
Invoke-WebRequest -Uri "https://github.com/Mark-Lasfar/mgzon-cli/releases/download/v2.0.8/mgzon-win.exe" -OutFile "mgzon.exe"
Move-Item mgzon.exe "C:\\Windows\\System32"
mgzon --version
        `
    };
    
    alert(instructions[platform] || 'Instructions not available for this platform.');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mgzonApp = new MGZONApp();
});