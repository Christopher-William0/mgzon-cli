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