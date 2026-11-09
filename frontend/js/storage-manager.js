/**
 * HTML Page Designer - Storage & Editor Utilities Manager
 * Manages Undo/Redo history stack, local persistence (localStorage), Layers Tree, clipboard, and autosave.
 */

window.TechXStorage = {
  historyStack: [],
  historyIndex: -1,
  maxHistory: 50,
  clipboardNode: null,
  storageKey: 'html_page_designer_project',
  autoSaveTimer: null,

  init() {
    this.bindToolbarButtons();
    this.startAutoSave();
    this.loadPersistedProject();
  },

  // --------------------------------------------------------------------------
  // UNDO / REDO HISTORY STACK
  // --------------------------------------------------------------------------
  pushHistory(actionName = 'Edit') {
    if (!window.TechXDesigner || !window.TechXDesigner.canvas) return;

    // Remove any undone states ahead of current index
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    }

    // Capture clean canvas HTML snapshot
    const snapshot = window.TechXCodeEditor ? window.TechXCodeEditor.getCleanCanvasHTML() : window.TechXDesigner.canvas.innerHTML;

    this.historyStack.push({
      action: actionName,
      html: snapshot,
      customCss: window.TechXCodeEditor ? window.TechXCodeEditor.customCss : '',
      customJs: window.TechXCodeEditor ? window.TechXCodeEditor.customJs : ''
    });

    if (this.historyStack.length > this.maxHistory) {
      this.historyStack.shift();
    } else {
      this.historyIndex++;
    }

    this.updateUndoRedoUI();
    this.persistProject(false); // background save
  },

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreHistoryState(this.historyStack[this.historyIndex]);
      this.updateUndoRedoUI();
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`Undo: ${this.historyStack[this.historyIndex + 1].action}`, 'info');
      }
    }
  },

  redo() {
    if (this.historyIndex < this.historyStack.length - 1) {
      this.historyIndex++;
      this.restoreHistoryState(this.historyStack[this.historyIndex]);
      this.updateUndoRedoUI();
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`Redo: ${this.historyStack[this.historyIndex].action}`, 'info');
      }
    }
  },

  restoreHistoryState(state) {
    if (!state || !window.TechXDesigner) return;
    window.TechXDesigner.deselect();
    window.TechXDesigner.canvas.innerHTML = state.html;
    if (window.TechXCodeEditor) {
      window.TechXCodeEditor.customCss = state.customCss || '';
      window.TechXCodeEditor.customJs = state.customJs || '';
    }
    window.TechXDesigner.updateEmptyState();
  },

  updateUndoRedoUI() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');

    if (btnUndo) btnUndo.disabled = this.historyIndex <= 0;
    if (btnRedo) btnRedo.disabled = this.historyIndex >= this.historyStack.length - 1;
  },

  // --------------------------------------------------------------------------
  // PROJECT PERSISTENCE & AUTOSAVE
  // --------------------------------------------------------------------------
  persistProject(notify = true) {
    if (!window.TechXDesigner || !window.TechXDesigner.canvas) return;

    const projectData = {
      title: document.getElementById('docTitleInput')?.value || 'Untitled HTML Page',
      html: window.TechXCodeEditor ? window.TechXCodeEditor.getCleanCanvasHTML() : window.TechXDesigner.canvas.innerHTML,
      customCss: window.TechXCodeEditor ? window.TechXCodeEditor.customCss : '',
      customJs: window.TechXCodeEditor ? window.TechXCodeEditor.customJs : '',
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(projectData));
      const statusPill = document.getElementById('saveStatusIndicator');
      if (statusPill) {
        statusPill.innerHTML = `<i class="fa-solid fa-cloud-arrow-up" style="color: #10B981;"></i> Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      if (notify && window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast('Project saved locally!', 'success');
      }
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  },

  loadPersistedProject() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data && data.html) {
          const docTitle = document.getElementById('docTitleInput');
          if (docTitle && data.title) docTitle.value = data.title;

          window.TechXDesigner.canvas.innerHTML = data.html;

          if (window.TechXCodeEditor) {
            window.TechXCodeEditor.customCss = data.customCss || '';
            window.TechXCodeEditor.customJs = data.customJs || '';
            if (data.customCss) {
              let styleTag = document.getElementById('txUserCustomCSS');
              if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'txUserCustomCSS';
                document.head.appendChild(styleTag);
              }
              styleTag.innerHTML = data.customCss;
            }
          }

          window.TechXDesigner.updateEmptyState();
          this.pushHistory('Session Restored');
          return true;
        }
      }
    } catch (e) {
      console.warn('Error loading project from localStorage', e);
    }
    // Push initial blank state
    this.pushHistory('Initial Canvas');
    return false;
  },

  startAutoSave() {
    this.autoSaveTimer = setInterval(() => {
      this.persistProject(false);
    }, 15000); // Autosave every 15 seconds
  },

  // --------------------------------------------------------------------------
  // TOOLBAR ACTION BUTTONS
  // --------------------------------------------------------------------------
  bindToolbarButtons() {
    const btnUndo = document.getElementById('btnUndo');
    if (btnUndo) btnUndo.addEventListener('click', () => this.undo());

    const btnRedo = document.getElementById('btnRedo');
    if (btnRedo) btnRedo.addEventListener('click', () => this.redo());

    const btnSave = document.getElementById('btnSaveProject');
    if (btnSave) btnSave.addEventListener('click', () => this.persistProject(true));

    const btnNew = document.getElementById('btnNewPage');
    if (btnNew) {
      btnNew.addEventListener('click', () => {
        if (confirm('Create a new blank HTML page? Any unsaved changes in current canvas will be cleared.')) {
          window.TechXDesigner.deselect();
          window.TechXDesigner.canvas.innerHTML = '';
          if (window.TechXCodeEditor) {
            window.TechXCodeEditor.customCss = '';
            window.TechXCodeEditor.customJs = '';
          }
          window.TechXDesigner.updateEmptyState();
          this.pushHistory('New Blank Page');
          if (window.TechXDesignerUI) window.TechXDesignerUI.showToast('New blank canvas created', 'info');
        }
      });
    }
  }
};

// --------------------------------------------------------------------------
// LAYERS TREE INSPECTOR
// --------------------------------------------------------------------------
window.TechXLayers = {
  container: null,

  init() {
    this.container = document.getElementById('layersTreeContainer');
    this.refresh();
  },

  refresh() {
    if (!this.container || !window.TechXDesigner || !window.TechXDesigner.canvas) return;
    this.container.innerHTML = '';

    const rootChildren = Array.from(window.TechXDesigner.canvas.children).filter(
      c => !c.classList.contains('canvas-empty-state') && 
           !c.classList.contains('designer-drop-indicator') &&
           !c.classList.contains('selection-action-bar') &&
           !c.classList.contains('resize-handle')
    );

    if (rootChildren.length === 0) {
      this.container.innerHTML = '<p style="color: var(--text-dim); font-size: 11.5px; padding: 12px; text-align: center;">No elements on canvas</p>';
      return;
    }

    rootChildren.forEach(child => {
      this.renderTreeNode(child, this.container, 0);
    });
  },

  renderTreeNode(el, parentDom, depth = 0) {
    if (el.classList.contains('selection-action-bar') || el.classList.contains('resize-handle')) return;

    const node = document.createElement('div');
    node.className = 'tree-node';
    if (window.TechXDesigner.selectedElement === el) {
      node.classList.add('active');
    }
    node.style.paddingLeft = `${depth * 14 + 8}px`;

    const tag = el.tagName.toLowerCase();
    const idStr = el.id ? `#${el.id}` : '';
    const classStr = el.classList.length ? `.${Array.from(el.classList).filter(c => !c.startsWith('designer-'))[0] || ''}` : '';

    node.innerHTML = `
      <div class="tree-node-left">
        <i class="fa-solid fa-code" style="color: var(--accent-cyan); font-size: 11px;"></i>
        <span>&lt;${tag}${idStr || classStr}&gt;</span>
      </div>
      <div class="tree-node-actions">
        <button class="action-bar-btn" title="Toggle Visibility" data-action="toggle-vis"><i class="fa-regular fa-eye"></i></button>
        <button class="action-bar-btn" title="Delete" data-action="delete"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;

    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        const action = actionBtn.getAttribute('data-action');
        if (action === 'toggle-vis') {
          el.style.display = el.style.display === 'none' ? '' : 'none';
          actionBtn.querySelector('i').className = el.style.display === 'none' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        } else if (action === 'delete') {
          window.TechXDesigner.handleAction('delete', el);
        }
        return;
      }
      window.TechXDesigner.selectElement(el);
    });

    parentDom.appendChild(node);

    // Recursively render child containers
    if (['div', 'section', 'form', 'ul', 'ol'].includes(tag)) {
      Array.from(el.children).forEach(childEl => {
        this.renderTreeNode(childEl, parentDom, depth + 1);
      });
    }
  },

  highlightNode(el) {
    this.refresh();
  }
};

