/**
 * HTML Page Designer - UI Controller
 * Manages Elements Library rendering, tab switching, preview mode toggle, and toasts.
 */

window.TechXDesignerUI = {
  isPreviewMode: false,

  init() {
    this.renderElementsLibrary();
    this.bindSidebarTabs();
    this.bindElementSearch();
    this.bindSidebarToggle();
    this.bindPreviewToggle();
    this.bindModalCloseBackdrops();
  },

  // --------------------------------------------------------------------------
  // SIDEBAR TOGGLE & RESPONSIVE DRAWER
  // --------------------------------------------------------------------------
  bindSidebarToggle() {
    const btnToggle = document.getElementById('btnToggleLeftSidebar');
    const sidebar = document.getElementById('designerLeftSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const btnClose = document.getElementById('btnCloseLeftSidebar');

    const toggle = () => {
      if (!sidebar) return;
      if (window.innerWidth <= 992) {
        sidebar.classList.toggle('is-open');
        if (backdrop) backdrop.classList.toggle('is-active', sidebar.classList.contains('is-open'));
      } else {
        sidebar.classList.toggle('is-collapsed');
      }
    };

    const closeMobile = () => {
      if (sidebar) sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
    };

    if (btnToggle) btnToggle.addEventListener('click', toggle);
    if (btnClose) btnClose.addEventListener('click', closeMobile);
    if (backdrop) backdrop.addEventListener('click', closeMobile);

    // Ctrl+B shortcut for toggling sidebar
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b' && !['input', 'textarea'].includes(e.target.tagName.toLowerCase())) {
        e.preventDefault();
        toggle();
      }
    });
  },

  // --------------------------------------------------------------------------
  // RENDER ELEMENTS LIBRARY
  // --------------------------------------------------------------------------
  renderElementsLibrary() {
    const basicContainer = document.getElementById('basicElementsGrid');
    const layoutContainer = document.getElementById('layoutElementsGrid');
    const contentContainer = document.getElementById('contentElementsGrid');
    const formContainer = document.getElementById('formElementsGrid');
    const advContainer = document.getElementById('advancedElementsGrid');

    if (!window.TechXElements) return;

    if (basicContainer && window.TechXElements.basic) {
      basicContainer.innerHTML = '';
      window.TechXElements.basic.forEach(el => basicContainer.appendChild(this.createElementCard(el)));
    }
    if (layoutContainer && window.TechXElements.layout) {
      layoutContainer.innerHTML = '';
      window.TechXElements.layout.forEach(el => layoutContainer.appendChild(this.createElementCard(el)));
    }
    if (contentContainer && window.TechXElements.content) {
      contentContainer.innerHTML = '';
      window.TechXElements.content.forEach(el => contentContainer.appendChild(this.createElementCard(el)));
    }
    if (formContainer && window.TechXElements.form) {
      formContainer.innerHTML = '';
      window.TechXElements.form.forEach(el => formContainer.appendChild(this.createElementCard(el)));
    }
    if (advContainer && window.TechXElements.advanced) {
      advContainer.innerHTML = '';
      window.TechXElements.advanced.forEach(el => advContainer.appendChild(this.createElementCard(el)));
    }
  },

  createElementCard(el) {
    const card = document.createElement('div');
    card.className = 'element-card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-type', el.type);
    card.title = el.description || el.label;

    card.innerHTML = `
      <i class="${el.icon}"></i>
      <span>${el.label}</span>
    `;

    // Drag start
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', el.type);
      card.style.opacity = '0.5';
    });

    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
    });

    // Also support 1-click add to bottom of canvas for quick convenience!
    card.addEventListener('dblclick', () => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = el.defaultHTML.trim();
      const newEl = tempDiv.firstElementChild;
      if (newEl && window.TechXDesigner && window.TechXDesigner.canvas) {
        newEl.setAttribute('data-tx-id', window.TechXDesigner.generateId(el.type));
        window.TechXDesigner.canvas.appendChild(newEl);
        window.TechXDesigner.updateEmptyState();
        window.TechXDesigner.selectElement(newEl);
        if (window.TechXStorage) window.TechXStorage.pushHistory(`Add ${el.label}`);
        this.showToast(`Added ${el.label}`, 'success');
      }
    });

    return card;
  },

  // --------------------------------------------------------------------------
  // TAB SWITCHING (LEFT & RIGHT SIDEBARS)
  // --------------------------------------------------------------------------
  bindSidebarTabs() {
    // Left Sidebar tabs (Elements vs Layers)
    const leftTabs = document.querySelectorAll('.left-nav-tab');
    leftTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        leftTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-left-tab');
        const elementsView = document.getElementById('leftTabElements');
        const layersView = document.getElementById('leftTabLayers');

        if (elementsView) elementsView.style.display = target === 'elements' ? 'flex' : 'none';
        if (layersView) {
          layersView.style.display = target === 'layers' ? 'flex' : 'none';
          if (target === 'layers' && window.TechXLayers) {
            window.TechXLayers.refresh();
          }
        }
      });
    });

    // Right Sidebar tabs (Style vs Settings vs Animations vs Custom CSS)
    const rightTabs = document.querySelectorAll('.right-nav-tab');
    rightTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        rightTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-right-tab');
        ['style', 'settings', 'animations', 'customcss'].forEach(view => {
          const viewEl = document.getElementById(`rightTab-${view}`);
          if (viewEl) {
            viewEl.style.display = target === view ? 'flex' : 'none';
          }
        });
      });
    });

    // Accordions collapse toggle
    const headers = document.querySelectorAll('.prop-accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const accordion = header.closest('.prop-accordion');
        if (accordion) {
          accordion.classList.toggle('collapsed');
        }
      });
    });
  },

  // --------------------------------------------------------------------------
  // SEARCH FILTER IN ELEMENTS LIBRARY
  // --------------------------------------------------------------------------
  bindElementSearch() {
    const input = document.getElementById('elementSearchInput');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.element-card');

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const type = (card.getAttribute('data-type') || '').toLowerCase();
        if (text.includes(query) || type.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  },

  // --------------------------------------------------------------------------
  // PREVIEW MODE TOGGLE
  // --------------------------------------------------------------------------
  bindPreviewToggle() {
    const btnPreview = document.getElementById('btnTogglePreview');
    if (!btnPreview) return;

    btnPreview.addEventListener('click', () => {
      this.isPreviewMode = !this.isPreviewMode;
      const canvasArea = document.getElementById('canvasArea');

      if (this.isPreviewMode) {
        window.TechXDesigner.deselect();
        if (window.TechXProperties) window.TechXProperties.close(true);
        btnPreview.classList.add('active');
        btnPreview.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Exit Preview';
        if (canvasArea) canvasArea.classList.add('preview-mode-active');
        this.showToast('Entered Preview Mode — interactive testing enabled', 'info');
      } else {
        btnPreview.classList.remove('active');
        btnPreview.innerHTML = '<i class="fa-solid fa-eye"></i> Preview';
        if (canvasArea) canvasArea.classList.remove('preview-mode-active');
        this.showToast('Exited Preview Mode', 'info');
      }
    });
  },

  // Backdrop click to close modals
  bindModalCloseBackdrops() {
    document.querySelectorAll('.designer-modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    });
  },

  // --------------------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // --------------------------------------------------------------------------
  showToast(message, type = 'info') {
    let container = document.getElementById('designerToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'designerToastContainer';
      container.className = 'designer-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `designer-toast ${type}`;

    const iconMap = {
      info: 'fa-solid fa-circle-info',
      success: 'fa-solid fa-circle-check',
      warning: 'fa-solid fa-triangle-exclamation',
      error: 'fa-solid fa-circle-xmark'
    };

    toast.innerHTML = `
      <i class="${iconMap[type] || iconMap.info}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

