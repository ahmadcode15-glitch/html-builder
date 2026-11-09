/**
 * HTML Page Designer - Source Code Editor (HTML, CSS, JS)
 * Handles syntax display, manual editing, formatting, conflict detection, and two-way visual synchronization.
 */

window.TechXCodeEditor = {
  currentTab: 'html', // 'html' | 'css' | 'js'
  modal: null,
  htmlTextarea: null,
  cssTextarea: null,
  jsTextarea: null,
  customCss: '',
  customJs: '',
  lastVisualHTML: '',
  isCodeManuallyModified: false,

  init() {
    this.modal = document.getElementById('codeEditorModal');
    this.htmlTextarea = document.getElementById('codeEditorHtml');
    this.cssTextarea = document.getElementById('codeEditorCss');
    this.jsTextarea = document.getElementById('codeEditorJs');

    this.bindTabs();
    this.bindActionButtons();
    this.bindChangeListeners();
  },

  open() {
    this.syncVisualToCode();
    if (this.modal) {
      this.modal.classList.add('open');
    }
  },

  close() {
    if (this.modal) {
      this.modal.classList.remove('open');
    }
  },

  bindTabs() {
    const tabs = document.querySelectorAll('.code-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-code-tab');
        this.currentTab = target;

        // Toggle textarea visibility
        if (this.htmlTextarea) this.htmlTextarea.style.display = target === 'html' ? 'block' : 'none';
        if (this.cssTextarea) this.cssTextarea.style.display = target === 'css' ? 'block' : 'none';
        if (this.jsTextarea) this.jsTextarea.style.display = target === 'js' ? 'block' : 'none';
      });
    });
  },

  bindChangeListeners() {
    [this.htmlTextarea, this.cssTextarea, this.jsTextarea].forEach(ta => {
      if (!ta) return;
      ta.addEventListener('input', () => {
        this.isCodeManuallyModified = true;
        const alertBox = document.getElementById('codeConflictAlert');
        if (alertBox) alertBox.style.display = 'flex';
      });
    });
  },

  bindActionButtons() {
    // Format button
    const formatBtn = document.getElementById('btnFormatCode');
    if (formatBtn) {
      formatBtn.addEventListener('click', () => {
        this.formatActiveCode();
      });
    }

    // Apply Changes Button
    const applyBtn = document.getElementById('btnApplyCodeChanges');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.syncCodeToVisual();
      });
    }

    // Close button
    const closeBtn = document.getElementById('btnCloseCodeEditor');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.close();
      });
    }
  },

  // Extract clean HTML from canvas (excluding editor handles and action bars)
  getCleanCanvasHTML() {
    if (!window.TechXDesigner || !window.TechXDesigner.canvas) return '';

    // Clone canvas to manipulate without touching live DOM
    const clone = window.TechXDesigner.canvas.cloneNode(true);

    // Remove editor artifacts: empty state, action bar, resize handles, drop indicators
    clone.querySelectorAll('.canvas-empty-state, .selection-action-bar, .resize-handle, .designer-drop-indicator').forEach(el => el.remove());

    // Clean classes (remove designer-selected, designer-hovered, is-dragging-element)
    clone.querySelectorAll('.designer-selected, .designer-hovered, .is-dragging-element').forEach(el => {
      el.classList.remove('designer-selected', 'designer-hovered', 'is-dragging-element');
      if (el.classList.length === 0) el.removeAttribute('class');
    });

    return clone.innerHTML.trim();
  },

  // 1. VISUAL TO CODE SYNCHRONIZATION
  syncVisualToCode() {
    const rawHTML = this.getCleanCanvasHTML();
    this.lastVisualHTML = rawHTML;

    if (this.htmlTextarea) {
      this.htmlTextarea.value = this.prettifyHTML(rawHTML);
    }
    if (this.cssTextarea) {
      this.cssTextarea.value = this.customCss || '/* Add custom CSS rules here */\n';
    }
    if (this.jsTextarea) {
      this.jsTextarea.value = this.customJs || '// Add custom JavaScript interactions here\n';
    }

    this.isCodeManuallyModified = false;
    const alertBox = document.getElementById('codeConflictAlert');
    if (alertBox) alertBox.style.display = 'none';
  },

  // 2. CODE TO VISUAL SYNCHRONIZATION
  syncCodeToVisual() {
    if (!window.TechXDesigner || !window.TechXDesigner.canvas) return;

    try {
      const newHTML = this.htmlTextarea.value.trim();
      this.customCss = this.cssTextarea ? this.cssTextarea.value : '';
      this.customJs = this.jsTextarea ? this.jsTextarea.value : '';

      // Deselect before updating
      window.TechXDesigner.deselect();

      // Update Canvas HTML safely
      window.TechXDesigner.canvas.innerHTML = newHTML;

      // Inject / update custom preview stylesheet in head
      let customStyle = document.getElementById('txUserCustomCSS');
      if (!customStyle) {
        customStyle = document.createElement('style');
        customStyle.id = 'txUserCustomCSS';
        document.head.appendChild(customStyle);
      }
      customStyle.innerHTML = this.customCss;

      // Update empty state & layers
      window.TechXDesigner.updateEmptyState();

      if (window.TechXStorage) {
        window.TechXStorage.pushHistory('Manual Source Code Edit');
      }

      this.isCodeManuallyModified = false;
      const alertBox = document.getElementById('codeConflictAlert');
      if (alertBox) alertBox.style.display = 'none';

      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast('Code successfully synchronized with canvas!', 'success');
      }

      this.close();
    } catch (err) {
      console.error(err);
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`HTML Parsing Error: ${err.message}`, 'error');
      }
    }
  },

  // HTML Formatter / Beautifier
  prettifyHTML(html) {
    let tab = '  ';
    let result = '';
    let indent = '';

    html.split(/>\s*</).forEach(element => {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }

      result += indent + '<' + element + '>\r\n';

      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('hr') && !element.startsWith('br')) {
        indent += tab;
      }
    });

    return result.substring(1, result.length - 3);
  },

  formatActiveCode() {
    if (this.currentTab === 'html' && this.htmlTextarea) {
      this.htmlTextarea.value = this.prettifyHTML(this.htmlTextarea.value);
    }
    if (window.TechXDesignerUI) {
      window.TechXDesignerUI.showToast('Code formatted', 'info');
    }
  }
};

