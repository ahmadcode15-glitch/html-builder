/**
 * HTML Page Designer - HTML Import & DOM Parser
 * Handles reading user HTML files or pasted markup, extracting styles/scripts, and loading into visual canvas.
 */

window.TechXImport = {
  modal: null,
  fileInput: null,
  pasteTextarea: null,
  importedStyles: '',
  importedScripts: '',

  init() {
    this.modal = document.getElementById('importHtmlModal');
    this.fileInput = document.getElementById('importFileInput');
    this.pasteTextarea = document.getElementById('importPasteArea');

    this.bindEvents();
  },

  open() {
    if (this.modal) {
      this.modal.classList.add('open');
    }
  },

  close() {
    if (this.modal) {
      this.modal.classList.remove('open');
    }
  },

  bindEvents() {
    // File upload change
    if (this.fileInput) {
      this.fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const htmlContent = event.target.result;
          if (this.pasteTextarea) {
            this.pasteTextarea.value = htmlContent;
          }
          if (window.TechXDesignerUI) {
            window.TechXDesignerUI.showToast(`Loaded "${file.name}" into preview`, 'info');
          }
        };
        reader.readAsText(file);
      });
    }

    // Drag and drop onto upload box
    const dropZone = document.getElementById('importDropZone');
    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--accent-cyan)';
      });
      dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--border-light)';
      });
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border-light)';
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.html') || file.name.endsWith('.htm'))) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (this.pasteTextarea) this.pasteTextarea.value = ev.target.result;
            if (window.TechXDesignerUI) window.TechXDesignerUI.showToast(`Loaded "${file.name}"`, 'info');
          };
          reader.readAsText(file);
        }
      });
    }

    // Execute Import Button
    const btnExecute = document.getElementById('btnExecuteImport');
    if (btnExecute) {
      btnExecute.addEventListener('click', () => {
        this.executeImport();
      });
    }

    // Close button
    const btnClose = document.getElementById('btnCloseImport');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.close();
      });
    }
  },

  executeImport() {
    const rawHTML = this.pasteTextarea ? this.pasteTextarea.value.trim() : '';
    if (!rawHTML) {
      if (window.TechXDesignerUI) window.TechXDesignerUI.showToast('Please upload or paste HTML code to import', 'warning');
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHTML, 'text/html');

      // Check for parsing errors
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Malformed HTML document structure');
      }

      // Extract custom styles
      let combinedStyles = '';
      doc.querySelectorAll('style').forEach(st => {
        combinedStyles += `${st.innerHTML}\n`;
        st.remove();
      });

      // Extract external stylesheet links
      doc.querySelectorAll('link[rel="stylesheet"]').forEach(lk => {
        // preserve link in head if external
        const href = lk.getAttribute('href');
        if (href && !document.querySelector(`link[href="${href}"]`)) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = href;
          document.head.appendChild(newLink);
        }
        lk.remove();
      });

      // Extract scripts
      let combinedScripts = '';
      doc.querySelectorAll('script').forEach(sc => {
        if (!sc.src) {
          combinedScripts += `${sc.innerHTML}\n`;
        }
        sc.remove();
      });

      // Get body contents or root contents
      const bodyContent = doc.body ? doc.body.innerHTML : rawHTML;

      // Deselect before populating
      window.TechXDesigner.deselect();

      // Load into canvas
      window.TechXDesigner.canvas.innerHTML = bodyContent;

      // Assign tx IDs to elements missing them
      window.TechXDesigner.canvas.querySelectorAll('*').forEach((el, idx) => {
        if (!el.getAttribute('data-tx-id') && !el.classList.contains('selection-action-bar')) {
          el.setAttribute('data-tx-id', `tx-imported-${idx + 1}`);
        }
      });

      // Inject imported styles into user custom CSS
      if (combinedStyles) {
        let customStyle = document.getElementById('txUserCustomCSS');
        if (!customStyle) {
          customStyle = document.createElement('style');
          customStyle.id = 'txUserCustomCSS';
          document.head.appendChild(customStyle);
        }
        customStyle.innerHTML += `\n/* --- Imported Styles --- */\n${combinedStyles}`;
        if (window.TechXCodeEditor) {
          window.TechXCodeEditor.customCss += `\n/* --- Imported Styles --- */\n${combinedStyles}`;
        }
      }

      if (combinedScripts && window.TechXCodeEditor) {
        window.TechXCodeEditor.customJs += `\n// --- Imported Scripts ---\n${combinedScripts}`;
      }

      // Update empty state
      window.TechXDesigner.updateEmptyState();

      // Push history
      if (window.TechXStorage) {
        window.TechXStorage.pushHistory('Import HTML File');
      }

      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast('HTML imported successfully!', 'success');
      }

      this.close();
    } catch (err) {
      console.error(err);
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`Import Failed: ${err.message}`, 'error');
      }
    }
  }
};

