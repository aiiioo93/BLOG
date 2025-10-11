/**
 * Éditeur de commentaires avancé avec markdown et coloration syntaxique
 * Jour 5 - Blog Django
 */

class CommentEditor {
    constructor() {
        this.textarea = document.getElementById('comment-body');
        this.preview = document.getElementById('comment-preview');
        this.previewContent = document.querySelector('.preview-content');
        this.markdownToggle = document.getElementById('markdown-toggle');
        
        if (!this.textarea) return;
        
        this.init();
    }
    
    init() {
        this.setupToolbar();
        this.setupPreview();
        this.setupMarkdownToggle();
        this.setupCodeBlocks();
        this.setupCopyButtons();
    }
    
    setupToolbar() {
        const toolbar = document.querySelector('.editor-toolbar');
        if (!toolbar) return;
        
        // Boutons de formatage
        toolbar.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            
            e.preventDefault();
            const action = btn.dataset.action;
            this.handleToolbarAction(action, btn);
        });
    }
    
    handleToolbarAction(action, btn) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const text = this.textarea.value;
        const selectedText = text.substring(start, end);
        
        let newText = '';
        
        switch (action) {
            case 'bold':
                newText = `**${selectedText || 'texte en gras'}**`;
                break;
            case 'italic':
                newText = `*${selectedText || 'texte en italique'}*`;
                break;
            case 'code':
                newText = `\`${selectedText || 'code inline'}\``;
                break;
            case 'link':
                newText = `[${selectedText || 'texte du lien'}](https://example.com)`;
                break;
            case 'code-block':
                const language = document.getElementById('code-language').value || 'python';
                const code = selectedText || '# Votre code ici\nprint("Hello, World!")';
                newText = `\`\`\`${language}\n${code}\n\`\`\``;
                break;
            case 'preview':
                this.togglePreview();
                return;
            case 'clear':
                if (confirm('Effacer tout le contenu ?')) {
                    this.textarea.value = '';
                    this.updatePreview();
                }
                return;
            case 'hide-preview':
                this.hidePreview();
                return;
        }
        
        // Insérer le nouveau texte
        const before = text.substring(0, start);
        const after = text.substring(end);
        this.textarea.value = before + newText + after;
        
        // Repositionner le curseur
        const newStart = start + newText.length;
        this.textarea.setSelectionRange(newStart, newStart);
        this.textarea.focus();
        
        // Mettre à jour la preview
        this.updatePreview();
        
        // Animation du bouton
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 200);
    }
    
    setupPreview() {
        if (!this.preview) return;
        
        // Mise à jour en temps réel
        this.textarea.addEventListener('input', () => {
            if (this.markdownToggle && this.markdownToggle.checked) {
                this.updatePreview();
            }
        });
    }
    
    togglePreview() {
        if (!this.preview) return;
        
        const isVisible = this.preview.style.display !== 'none';
        if (isVisible) {
            this.hidePreview();
        } else {
            this.showPreview();
        }
    }
    
    showPreview() {
        this.preview.style.display = 'block';
        this.textarea.style.display = 'none';
        this.updatePreview();
    }
    
    hidePreview() {
        this.preview.style.display = 'none';
        this.textarea.style.display = 'block';
        this.textarea.focus();
    }
    
    updatePreview() {
        if (!this.previewContent || !this.markdownToggle?.checked) return;
        
        const markdown = this.textarea.value;
        const html = this.parseMarkdown(markdown);
        this.previewContent.innerHTML = html;
        
        // Réinitialiser Prism.js pour la coloration syntaxique
        if (window.Prism) {
            Prism.highlightAllUnder(this.previewContent);
        }
        
        // Ajouter les boutons de copie
        this.setupCopyButtons();
    }
    
    parseMarkdown(text) {
        // Parser markdown simple (vous pouvez utiliser marked.js pour plus de fonctionnalités)
        return text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
            .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
            .replace(/\n/gim, '<br>');
    }
    
    setupMarkdownToggle() {
        if (!this.markdownToggle) return;
        
        this.markdownToggle.addEventListener('change', () => {
            const isMarkdown = this.markdownToggle.checked;
            this.textarea.placeholder = isMarkdown 
                ? 'Tapez votre commentaire en Markdown... (Support code, liens, formatage)'
                : 'Tapez votre commentaire ici...';
            
            if (isMarkdown) {
                this.updatePreview();
            }
        });
    }
    
    setupCodeBlocks() {
        // Ajouter des boutons de copie aux blocs de code existants
        this.addCopyButtons();
    }
    
    setupCopyButtons() {
        // Ajouter des boutons de copie aux nouveaux blocs de code
        this.addCopyButtons();
    }
    
    addCopyButtons() {
        const codeBlocks = document.querySelectorAll('.markdown-content pre code, .comment-content pre code');
        
        codeBlocks.forEach(block => {
            const pre = block.parentElement;
            if (pre.querySelector('.code-copy-btn')) return; // Déjà ajouté
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.textContent = 'Copier';
            copyBtn.title = 'Copier le code';
            
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyToClipboard(block.textContent, copyBtn);
            });
            
            pre.style.position = 'relative';
            pre.appendChild(copyBtn);
        });
    }
    
    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '✓ Copié!';
            button.style.background = 'rgba(34, 197, 94, 0.8)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(() => {
            // Fallback pour les navigateurs plus anciens
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.textContent = '✓ Copié!';
            setTimeout(() => {
                button.textContent = 'Copier';
            }, 2000);
        });
    }
}

// Initialiser l'éditeur quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new CommentEditor();
});

// Réinitialiser Prism.js après le chargement des commentaires
document.addEventListener('DOMContentLoaded', () => {
    if (window.Prism) {
        Prism.highlightAll();
        
        // Observer pour les nouveaux commentaires chargés dynamiquement
        const observer = new MutationObserver(() => {
            Prism.highlightAll();
        });
        
        const commentsList = document.querySelector('.comments-list');
        if (commentsList) {
            observer.observe(commentsList, { childList: true, subtree: true });
        }
    }
});
