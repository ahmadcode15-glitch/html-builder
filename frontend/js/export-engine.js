/**
 * HTML Page Designer - Export Engine
 * Generates Standalone HTML, Complete Project ZIP (index.html, css/style.css, js/script.js, assets/, README.md),
 * and Copy Source Code modal.
 */

window.TechXExport = {
  modal: null,

  init() {
    this.modal = document.getElementById('exportModal');
    this.bindButtons();
  },

  open() {
    if (this.modal) {
      this.populateCopyTabs();
      this.modal.classList.add('open');
    }
  },

  close() {
    if (this.modal) {
      this.modal.classList.remove('open');
    }
  },

  bindButtons() {
    // Topbar Export HTML button
    const btnTopHtml = document.getElementById('btnExportHtml');
    if (btnTopHtml) {
      btnTopHtml.addEventListener('click', () => this.downloadStandaloneHTML());
    }

    // Topbar Export ZIP button
    const btnTopZip = document.getElementById('btnExportZip');
    if (btnTopZip) {
      btnTopZip.addEventListener('click', () => this.downloadCompleteProjectZip());
    }

    // Export Modal Open button
    const btnOpenExport = document.getElementById('btnOpenExportModal');
    if (btnOpenExport) {
      btnOpenExport.addEventListener('click', () => this.open());
    }

    // Modal internal buttons
    const btnModalDownloadHtml = document.getElementById('btnModalDownloadHtml');
    if (btnModalDownloadHtml) {
      btnModalDownloadHtml.addEventListener('click', () => this.downloadStandaloneHTML());
    }

    const btnModalDownloadZip = document.getElementById('btnModalDownloadZip');
    if (btnModalDownloadZip) {
      btnModalDownloadZip.addEventListener('click', () => this.downloadCompleteProjectZip());
    }

    const btnCloseExport = document.getElementById('btnCloseExport');
    if (btnCloseExport) {
      btnCloseExport.addEventListener('click', () => this.close());
    }

    // Copy source code buttons
    ['Html', 'Css', 'Js'].forEach(lang => {
      const btn = document.getElementById(`btnCopy${lang}`);
      if (btn) {
        btn.addEventListener('click', () => this.copyToClipboard(lang));
      }
    });
  },

  // --------------------------------------------------------------------------
  // OPTION 1: DOWNLOAD STANDALONE HTML
  // --------------------------------------------------------------------------
  downloadStandaloneHTML() {
    const title = document.getElementById('docTitleInput')?.value || 'My HTML Page';
    const cleanHTML = window.TechXCodeEditor ? window.TechXCodeEditor.getCleanCanvasHTML() : window.TechXDesigner.canvas.innerHTML;

    // Generate animation CSS & scroll script
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = cleanHTML;
    const animCSS = window.TechXAnimations ? window.TechXAnimations.generateExportCSS(tempContainer) : '';
    const scrollScript = window.TechXAnimations ? window.TechXAnimations.generateScrollScript() : '';
    const finalBodyHTML = tempContainer.innerHTML;

    const userCSS = window.TechXCodeEditor ? window.TechXCodeEditor.customCss : '';
    const userJS = window.TechXCodeEditor ? window.TechXCodeEditor.customJs : '';

    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(title)}</title>

  <!-- Google Fonts & FontAwesome -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    /* Baseline Reset & Typography */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #0F172A;
      background-color: #FFFFFF;
      overflow-x: hidden;
    }
    img, video, iframe { max-width: 100%; height: auto; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; }

    /* Custom Page Styles */
${userCSS}

    /* Animation Styles */
${animCSS}
  </style>
</head>
<body>
${finalBodyHTML}

  <script>
    /* Interactive & Animation Scripts */
${scrollScript}

${userJS}
  </script>
</body>
</html>`;

    this.triggerDownload(`${this.slugify(title)}.html`, fullDoc, 'text/html');

    if (window.TechXDesignerUI) {
      window.TechXDesignerUI.showToast(`Downloaded "${title}.html"`, 'success');
    }
  },

  // --------------------------------------------------------------------------
  // OPTION 2: DOWNLOAD COMPLETE PROJECT (ZIP)
  // --------------------------------------------------------------------------
  async downloadCompleteProjectZip() {
    if (typeof JSZip === 'undefined') {
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast('JSZip library loading, please wait...', 'warning');
      }
      return;
    }

    const title = document.getElementById('docTitleInput')?.value || 'My HTML Page';
    const folderName = this.slugify(title) || 'my-html-page';
    const cleanHTML = window.TechXCodeEditor ? window.TechXCodeEditor.getCleanCanvasHTML() : window.TechXDesigner.canvas.innerHTML;

    // Generate animation CSS & scroll script
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = cleanHTML;
    const animCSS = window.TechXAnimations ? window.TechXAnimations.generateExportCSS(tempContainer) : '';
    const scrollScript = window.TechXAnimations ? window.TechXAnimations.generateScrollScript() : '';
    const finalBodyHTML = tempContainer.innerHTML;

    const userCSS = window.TechXCodeEditor ? window.TechXCodeEditor.customCss : '';
    const userJS = window.TechXCodeEditor ? window.TechXCodeEditor.customJs : '';

    const zip = new JSZip();
    const root = zip.folder(folderName);

    // 1. index.html
    const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(title)}</title>

  <!-- Google Fonts & FontAwesome -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <!-- External Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
${finalBodyHTML}

  <!-- External Script -->
  <script src="js/script.js"></script>
</body>
</html>`;

    root.file('index.html', indexHTML);

    // 2. css/style.css
    const combinedCSS = `/* ==========================================================================
   Styles for: ${title}
   Generated by HTML Page Designer
   ========================================================================== */

/* Baseline Reset & Typography */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #0F172A;
  background-color: #FFFFFF;
  overflow-x: hidden;
}

img, video, iframe {
  max-width: 100%;
  height: auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif;
}

/* Custom Page Styles */
${userCSS}

/* Animations */
${animCSS}
`;
    root.folder('css').file('style.css', combinedCSS);

    // 3. js/script.js
    const combinedJS = `/**
 * Scripts for: ${title}
 * Generated by HTML Page Designer
 */

${scrollScript}

${userJS}
`;
    root.folder('js').file('script.js', combinedJS);

    // 4. assets subfolders
    const assetsFolder = root.folder('assets');
    assetsFolder.folder('images').file('.gitkeep', '');
    assetsFolder.folder('icons').file('.gitkeep', '');
    assetsFolder.folder('fonts').file('.gitkeep', '');

    // 5. README.md
    const readme = `# ${title}

This web page was designed and exported using the **HTML Page Designer** (Visual Web Canvas Studio).

---

## 📁 Directory Structure

\`\`\`text
${folderName}/
├── index.html       # The main HTML structure
├── css/
│   └── style.css    # Clean styles, typography, and animation keyframes
├── js/
│   └── script.js    # Interactive features and scroll observers
├── assets/
│   ├── images/      # Place local images here
│   ├── icons/       # Custom vector or raster icons
│   └── fonts/       # Custom web fonts
└── README.md        # Project guide
\`\`\`

---

## 🚀 How to Run & View

1. **Directly in Browser**:
   Double click \`index.html\` to open the page directly in any modern browser (Chrome, Edge, Safari, Firefox).

2. **Local HTTP Server**:
   You can serve the folder using any local server, for example with Node.js:
   \`\`\`bash
   npx serve .
   \`\`\`
   or with Python:
   \`\`\`bash
   python -m http.server 8000
   \`\`\`

3. **Deploy Anywhere**:
   Upload the folder to Netlify, Vercel, GitHub Pages, or any web hosting without modification.

---
*Generated by HTML Page Designer — Visual Web Canvas Studio.*
`;
    root.file('README.md', readme);

    // Generate ZIP blob and trigger download
    try {
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${folderName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`Downloaded complete project "${folderName}.zip"`, 'success');
      }
    } catch (err) {
      console.error('ZIP generation error:', err);
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`ZIP Export Failed: ${err.message}`, 'error');
      }
    }
  },

  // --------------------------------------------------------------------------
  // OPTION 3: COPY SOURCE CODE MODAL
  // --------------------------------------------------------------------------
  populateCopyTabs() {
    const cleanHTML = window.TechXCodeEditor ? window.TechXCodeEditor.getCleanCanvasHTML() : window.TechXDesigner.canvas.innerHTML;
    const formattedHTML = window.TechXCodeEditor ? window.TechXCodeEditor.prettifyHTML(cleanHTML) : cleanHTML;

    const copyHtmlArea = document.getElementById('copyHtmlArea');
    if (copyHtmlArea) copyHtmlArea.value = formattedHTML;

    const copyCssArea = document.getElementById('copyCssArea');
    if (copyCssArea) {
      const userCSS = window.TechXCodeEditor ? window.TechXCodeEditor.customCss : '';
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleanHTML;
      const animCSS = window.TechXAnimations ? window.TechXAnimations.generateExportCSS(tempDiv) : '';
      copyCssArea.value = `${userCSS}\n\n${animCSS}`.trim();
    }

    const copyJsArea = document.getElementById('copyJsArea');
    if (copyJsArea) {
      const userJS = window.TechXCodeEditor ? window.TechXCodeEditor.customJs : '';
      const scrollScript = window.TechXAnimations ? window.TechXAnimations.generateScrollScript() : '';
      copyJsArea.value = `${scrollScript}\n\n${userJS}`.trim();
    }
  },

  copyToClipboard(lang) {
    const area = document.getElementById(`copy${lang}Area`);
    if (!area) return;

    area.select();
    navigator.clipboard.writeText(area.value).then(() => {
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`Copied ${lang.toUpperCase()} source to clipboard!`, 'success');
      }
    }).catch(() => {
      document.execCommand('copy');
      if (window.TechXDesignerUI) {
        window.TechXDesignerUI.showToast(`Copied ${lang.toUpperCase()} source!`, 'success');
      }
    });
  },

  // Utilities
  triggerDownload(filename, text, mimeType) {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  slugify(text) {
    return (text || 'page')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
};

