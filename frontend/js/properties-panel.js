/**
 * HTML Page Designer - Properties & Visual Styling Panel
 * Handles real-time styling: Box Model, Typography, Colors/Gradients, Layout, Flexbox/Grid, Borders, Effects & Attributes.
 */

window.TechXProperties = {
  activeElement: null,
  panel: null,
  header: null,
  tagBadge: null,
  btnPin: null,
  btnClose: null,
  isPinned: false,
  isDraggingPanel: false,
  userCustomPosition: null,

  init() {
    this.panel = document.getElementById('floatingPropertiesPanel');
    this.header = document.getElementById('floatingPanelHeader');
    this.tagBadge = document.getElementById('floatingTagBadge');
    this.btnPin = document.getElementById('btnPinFloatingPanel');
    this.btnClose = document.getElementById('btnCloseFloatingPanel');

    this.bindPropertyInputs();
    this.setupPanelEvents();
    this.setupPanelDrag();
    this.setupWindowEvents();
  },

  isOpen() {
    return this.panel && this.panel.classList.contains('is-open');
  },

  open(el) {
    if (!el) return;
    this.activeElement = el;
    this.populate(el);

    if (this.tagBadge) {
      this.tagBadge.textContent = el.tagName.toUpperCase();
    }

    if (this.panel) {
      this.panel.classList.add('is-open');
      this.positionNearElement(el);
    }
  },

  close(force = false) {
    if (this.isPinned && !force) return;
    if (this.panel) {
      this.panel.classList.remove('is-open');
    }
    this.clear();
  },

  togglePin() {
    this.isPinned = !this.isPinned;
    if (this.btnPin) {
      this.btnPin.classList.toggle('active', this.isPinned);
    }
    if (this.panel) {
      this.panel.classList.toggle('is-pinned', this.isPinned);
    }
    if (window.TechXDesignerUI) {
      window.TechXDesignerUI.showToast(this.isPinned ? 'Properties panel pinned in place' : 'Properties panel unpinned', 'info');
    }
    if (!this.isPinned && this.activeElement) {
      this.positionNearElement(this.activeElement);
    }
  },

  setupPanelEvents() {
    if (this.btnPin) {
      this.btnPin.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePin();
      });
    }
    if (this.btnClose) {
      this.btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close(true);
      });
    }
  },

  setupWindowEvents() {
    window.addEventListener('resize', () => {
      if (this.isOpen() && this.activeElement && !this.isPinned) {
        this.positionNearElement(this.activeElement);
      }
    });
  },

  positionNearElement(el) {
    if (!this.panel || !el) return;

    // Mobile viewport (<= 600px): bottom sheet takes over
    if (window.innerWidth <= 600) {
      this.panel.classList.add('mobile-bottom-sheet');
      this.panel.style.left = '';
      this.panel.style.top = '';
      this.panel.style.right = '';
      this.panel.style.bottom = '';
      return;
    }

    this.panel.classList.remove('mobile-bottom-sheet');

    // If user has dragged it and it's pinned, keep user's position
    if (this.isPinned && this.userCustomPosition) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const panelWidth = this.panel.offsetWidth || (window.innerWidth <= 992 ? 310 : 340);
    const panelHeight = Math.min(this.panel.offsetHeight || 520, window.innerHeight - 80);
    const topbarHeight = 58;
    const margin = 12;

    // Prefer placing to the right of the selected element
    let targetLeft = rect.right + margin;

    // If right side exceeds screen, check if left side has enough space
    if (targetLeft + panelWidth > window.innerWidth - margin) {
      const leftSidebar = document.getElementById('designerLeftSidebar');
      const sidebarWidth = (leftSidebar && !leftSidebar.classList.contains('is-collapsed') && window.innerWidth > 992) ? leftSidebar.offsetWidth : 0;
      const leftSpace = rect.left - margin - panelWidth;

      if (leftSpace >= sidebarWidth + margin) {
        targetLeft = leftSpace;
      } else {
        // Dock to right edge with safe margin
        targetLeft = Math.max(sidebarWidth + margin, window.innerWidth - panelWidth - margin);
      }
    }

    // Vertical positioning: align with element's top, clamped within visible viewport
    let targetTop = rect.top;
    const minTop = topbarHeight + 10;
    const maxTop = Math.max(minTop, window.innerHeight - panelHeight - margin);

    targetTop = Math.max(minTop, Math.min(targetTop, maxTop));

    this.panel.style.left = `${Math.round(targetLeft)}px`;
    this.panel.style.top = `${Math.round(targetTop)}px`;
    this.panel.style.right = 'auto';
    this.panel.style.bottom = 'auto';
  },

  setupPanelDrag() {
    if (!this.header || !this.panel) return;

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const onStart = (clientX, clientY) => {
      if (window.innerWidth <= 768) return; // Do not drag position on mobile bottom sheet
      this.isDraggingPanel = true;
      startX = clientX;
      startY = clientY;
      const rect = this.panel.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    };

    const onMove = (e) => {
      if (!this.isDraggingPanel) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const panelWidth = this.panel.offsetWidth || 340;
      const panelHeight = this.panel.offsetHeight || 500;

      let newLeft = Math.max(10, Math.min(initialLeft + deltaX, window.innerWidth - panelWidth - 10));
      let newTop = Math.max(58, Math.min(initialTop + deltaY, window.innerHeight - 50));

      this.panel.style.left = `${Math.round(newLeft)}px`;
      this.panel.style.top = `${Math.round(newTop)}px`;
      this.userCustomPosition = { left: newLeft, top: newTop };
    };

    const onTouchMove = (e) => {
      if (!this.isDraggingPanel || !e.touches[0]) return;
      e.preventDefault();
      onMove(e.touches[0]);
    };

    const onEnd = () => {
      this.isDraggingPanel = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onEnd);
    };

    this.header.addEventListener('mousedown', (e) => {
      if (e.target.closest('.floating-header-btn')) return;
      onStart(e.clientX, e.clientY);
    });

    this.header.addEventListener('touchstart', (e) => {
      if (e.target.closest('.floating-header-btn')) return;
      if (e.touches[0]) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  },

  populate(el) {
    this.activeElement = el;
    if (!el) {
      this.clear();
      return;
    }

    const computed = window.getComputedStyle(el);
    const inline = el.style;

    // Helper to get raw inline or computed value
    const getVal = (prop) => inline[prop] || computed[prop] || '';
    const getPixelNum = (val) => {
      const match = (val || '').toString().match(/^(-?\d+(\.\d+)?)/);
      return match ? match[1] : '';
    };

    // 1. Tag & Identity
    this.setInputValue('propElemTag', el.tagName.toLowerCase());
    this.setInputValue('propElemId', el.id || '');
    this.setInputValue('propElemClass', Array.from(el.classList).filter(c => !c.startsWith('designer-')).join(' '));

    // 2. Dimensions
    this.setInputValue('propWidth', getPixelNum(inline.width));
    this.setInputValue('propHeight', getPixelNum(inline.height));
    this.setInputValue('propMinWidth', getPixelNum(inline.minWidth));
    this.setInputValue('propMaxWidth', getPixelNum(inline.maxWidth));

    // 3. Spacing Box Model
    this.setInputValue('boxMarginTop', getPixelNum(inline.marginTop || computed.marginTop));
    this.setInputValue('boxMarginRight', getPixelNum(inline.marginRight || computed.marginRight));
    this.setInputValue('boxMarginBottom', getPixelNum(inline.marginBottom || computed.marginBottom));
    this.setInputValue('boxMarginLeft', getPixelNum(inline.marginLeft || computed.marginLeft));

    this.setInputValue('boxPaddingTop', getPixelNum(inline.paddingTop || computed.paddingTop));
    this.setInputValue('boxPaddingRight', getPixelNum(inline.paddingRight || computed.paddingRight));
    this.setInputValue('boxPaddingBottom', getPixelNum(inline.paddingBottom || computed.paddingBottom));
    this.setInputValue('boxPaddingLeft', getPixelNum(inline.paddingLeft || computed.paddingLeft));

    // 4. Typography
    this.setInputValue('propFontFamily', inline.fontFamily || computed.fontFamily);
    this.setInputValue('propFontSize', getPixelNum(inline.fontSize || computed.fontSize));
    this.setInputValue('propFontWeight', inline.fontWeight || computed.fontWeight);
    this.setInputValue('propLineHeight', inline.lineHeight || computed.lineHeight);
    this.setInputValue('propLetterSpacing', getPixelNum(inline.letterSpacing || computed.letterSpacing));
    this.setColorInputValue('propTextColor', inline.color || computed.color);

    // Alignment buttons
    const textAlign = inline.textAlign || computed.textAlign || 'left';
    this.setActiveSegment('alignBtns', textAlign);

    // Text decoration & transform
    this.setInputValue('propTextDecoration', inline.textDecorationLine || computed.textDecorationLine || 'none');
    this.setInputValue('propTextTransform', inline.textTransform || computed.textTransform || 'none');

    // 5. Colors & Background
    this.setColorInputValue('propBgColor', inline.backgroundColor || computed.backgroundColor);
    this.setInputValue('propBgImage', inline.backgroundImage ? inline.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '') : '');
    this.setInputValue('propBgSize', inline.backgroundSize || computed.backgroundSize || 'cover');
    this.setInputValue('propBgRepeat', inline.backgroundRepeat || computed.backgroundRepeat || 'no-repeat');

    // 6. Layout & Display
    const displayVal = inline.display || computed.display || 'block';
    this.setInputValue('propDisplay', displayVal);
    this.toggleLayoutSubsections(displayVal);

    this.setInputValue('propPosition', inline.position || computed.position || 'static');
    this.setInputValue('propZIndex', inline.zIndex || computed.zIndex || 'auto');
    this.setInputValue('propOverflow', inline.overflow || computed.overflow || 'visible');

    // Flexbox
    this.setInputValue('propFlexDirection', inline.flexDirection || computed.flexDirection || 'row');
    this.setInputValue('propJustifyContent', inline.justifyContent || computed.justifyContent || 'flex-start');
    this.setInputValue('propAlignItems', inline.alignItems || computed.alignItems || 'stretch');
    this.setInputValue('propFlexWrap', inline.flexWrap || computed.flexWrap || 'nowrap');
    this.setInputValue('propFlexGap', getPixelNum(inline.gap || computed.gap));

    // Grid
    this.setInputValue('propGridColumns', inline.gridTemplateColumns || computed.gridTemplateColumns || 'repeat(2, 1fr)');
    this.setInputValue('propGridGap', getPixelNum(inline.gap || computed.gap));

    // 7. Borders & Radius
    this.setInputValue('propBorderRadius', getPixelNum(inline.borderRadius || computed.borderRadius));
    this.setInputValue('propBorderWidth', getPixelNum(inline.borderWidth || computed.borderWidth));
    this.setInputValue('propBorderStyle', inline.borderStyle || computed.borderStyle || 'none');
    this.setColorInputValue('propBorderColor', inline.borderColor || computed.borderColor);

    // 8. Shadows & Effects
    this.setInputValue('propBoxShadow', inline.boxShadow || '');
    this.setSliderValue('propOpacity', inline.opacity !== '' ? inline.opacity : (computed.opacity || 1));
    this.setInputValue('propTransform', inline.transform || '');

    // 9. Element Tag Attributes
    this.populateTagSpecificAttributes(el);

    // 10. Custom CSS
    const customCssInput = document.getElementById('propCustomCss');
    if (customCssInput) {
      customCssInput.value = el.getAttribute('style') || '';
    }
  },

  updateDimensions(el) {
    if (this.activeElement !== el) return;
    this.setInputValue('propWidth', el.offsetWidth);
    this.setInputValue('propHeight', el.offsetHeight);
  },

  clear() {
    this.activeElement = null;
    const form = document.getElementById('propertiesForm');
    if (form) form.reset();
  },

  toggleLayoutSubsections(displayVal) {
    const flexGroup = document.getElementById('flexboxControlsGroup');
    const gridGroup = document.getElementById('gridControlsGroup');

    if (flexGroup) flexGroup.style.display = (displayVal === 'flex' || displayVal === 'inline-flex') ? 'block' : 'none';
    if (gridGroup) gridGroup.style.display = (displayVal === 'grid' || displayVal === 'inline-grid') ? 'block' : 'none';
  },

  populateTagSpecificAttributes(el) {
    const container = document.getElementById('tagAttributesContainer');
    if (!container) return;
    container.innerHTML = '';

    const tag = el.tagName.toLowerCase();
    const attrs = [];

    if (tag === 'a') {
      attrs.push({ name: 'href', label: 'Link URL (href)', value: el.getAttribute('href') || '#' });
      attrs.push({ name: 'target', label: 'Target Window', value: el.getAttribute('target') || '_self', options: ['_self', '_blank'] });
    } else if (tag === 'img') {
      attrs.push({ name: 'src', label: 'Image URL (src)', value: el.getAttribute('src') || '' });
      attrs.push({ name: 'alt', label: 'Alt Text (SEO/A11y)', value: el.getAttribute('alt') || '' });
    } else if (tag === 'iframe') {
      attrs.push({ name: 'src', label: 'Embed URL', value: el.getAttribute('src') || '' });
    } else if (['input', 'textarea', 'select'].includes(tag)) {
      attrs.push({ name: 'placeholder', label: 'Placeholder', value: el.getAttribute('placeholder') || '' });
      attrs.push({ name: 'name', label: 'Field Name', value: el.getAttribute('name') || '' });
      attrs.push({ name: 'type', label: 'Input Type', value: el.getAttribute('type') || 'text', options: ['text', 'email', 'password', 'number', 'tel', 'url'] });
    } else if (tag === 'i') {
      attrs.push({ name: 'class', label: 'Icon FontAwesome Class', value: el.className.replace('designer-selected', '').trim() });
    }

    if (attrs.length === 0) {
      container.innerHTML = '<p style="color: var(--text-dim); font-size: 11.5px; margin: 0;">No special attributes for this element.</p>';
      return;
    }

    attrs.forEach(attr => {
      const row = document.createElement('div');
      row.className = 'prop-row';
      row.style.marginBottom = '8px';

      if (attr.options) {
        row.innerHTML = `
          <label class="prop-label">${attr.label}</label>
          <select class="prop-select" data-attr-name="${attr.name}" style="max-width: 160px;">
            ${attr.options.map(opt => `<option value="${opt}" ${attr.value === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>
        `;
      } else {
        row.innerHTML = `
          <label class="prop-label">${attr.label}</label>
          <input type="text" class="prop-input" data-attr-name="${attr.name}" value="${attr.value}" style="max-width: 160px;" />
        `;
      }

      const input = row.querySelector('input, select');
      input.addEventListener('input', (e) => {
        if (!this.activeElement) return;
        const val = e.target.value;
        if (attr.name === 'class') {
          this.activeElement.className = val + (this.activeElement.classList.contains('designer-selected') ? ' designer-selected' : '');
        } else {
          this.activeElement.setAttribute(attr.name, val);
        }
      });

      input.addEventListener('change', () => {
        if (window.TechXStorage) window.TechXStorage.pushHistory(`Update attribute ${attr.name}`);
      });

      container.appendChild(row);
    });
  },

  // --------------------------------------------------------------------------
  // BIND PROPERTY INPUTS
  // --------------------------------------------------------------------------
  bindPropertyInputs() {
    // Style property mapping helper
    const bindStyle = (id, styleProp, unit = '', isNumeric = false) => {
      const input = document.getElementById(id);
      if (!input) return;

      const apply = () => {
        if (!this.activeElement) return;
        let val = input.value.trim();
        if (val !== '' && unit && isNumeric && !val.includes(unit)) {
          val = `${val}${unit}`;
        }
        this.activeElement.style[styleProp] = val;
      };

      input.addEventListener('input', apply);
      input.addEventListener('change', () => {
        apply();
        if (window.TechXStorage) window.TechXStorage.pushHistory(`Update ${styleProp}`);
      });
    };

    // Dimensions
    bindStyle('propWidth', 'width', 'px', true);
    bindStyle('propHeight', 'height', 'px', true);
    bindStyle('propMinWidth', 'minWidth', 'px', true);
    bindStyle('propMaxWidth', 'maxWidth', 'px', true);

    // Box Model Margins
    bindStyle('boxMarginTop', 'marginTop', 'px', true);
    bindStyle('boxMarginRight', 'marginRight', 'px', true);
    bindStyle('boxMarginBottom', 'marginBottom', 'px', true);
    bindStyle('boxMarginLeft', 'marginLeft', 'px', true);

    // Box Model Paddings
    bindStyle('boxPaddingTop', 'paddingTop', 'px', true);
    bindStyle('boxPaddingRight', 'paddingRight', 'px', true);
    bindStyle('boxPaddingBottom', 'paddingBottom', 'px', true);
    bindStyle('boxPaddingLeft', 'paddingLeft', 'px', true);

    // Typography
    bindStyle('propFontFamily', 'fontFamily');
    bindStyle('propFontSize', 'fontSize', 'px', true);
    bindStyle('propFontWeight', 'fontWeight');
    bindStyle('propLineHeight', 'lineHeight');
    bindStyle('propLetterSpacing', 'letterSpacing', 'px', true);
    bindStyle('propTextDecoration', 'textDecorationLine');
    bindStyle('propTextTransform', 'textTransform');

    // Color Pickers
    this.bindColorPicker('propTextColor', 'color');
    this.bindColorPicker('propBgColor', 'backgroundColor');
    this.bindColorPicker('propBorderColor', 'borderColor');

    // Background Image
    const bgImgInput = document.getElementById('propBgImage');
    if (bgImgInput) {
      bgImgInput.addEventListener('input', () => {
        if (!this.activeElement) return;
        const url = bgImgInput.value.trim();
        this.activeElement.style.backgroundImage = url ? `url('${url}')` : '';
      });
      bgImgInput.addEventListener('change', () => {
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Background Image');
      });
    }

    bindStyle('propBgSize', 'backgroundSize');
    bindStyle('propBgRepeat', 'backgroundRepeat');

    // Layout
    const displaySelect = document.getElementById('propDisplay');
    if (displaySelect) {
      displaySelect.addEventListener('change', (e) => {
        if (!this.activeElement) return;
        this.activeElement.style.display = e.target.value;
        this.toggleLayoutSubsections(e.target.value);
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Display');
      });
    }

    bindStyle('propPosition', 'position');
    bindStyle('propZIndex', 'zIndex');
    bindStyle('propOverflow', 'overflow');

    // Flexbox
    bindStyle('propFlexDirection', 'flexDirection');
    bindStyle('propJustifyContent', 'justifyContent');
    bindStyle('propAlignItems', 'alignItems');
    bindStyle('propFlexWrap', 'flexWrap');
    bindStyle('propFlexGap', 'gap', 'px', true);

    // Grid
    bindStyle('propGridColumns', 'gridTemplateColumns');
    bindStyle('propGridGap', 'gap', 'px', true);

    // Borders & Effects
    bindStyle('propBorderRadius', 'borderRadius', 'px', true);
    bindStyle('propBorderWidth', 'borderWidth', 'px', true);
    bindStyle('propBorderStyle', 'borderStyle');
    bindStyle('propBoxShadow', 'boxShadow');
    bindStyle('propTransform', 'transform');

    // Opacity Slider
    const opacitySlider = document.getElementById('propOpacity');
    const opacityValBadge = document.getElementById('propOpacityVal');
    if (opacitySlider) {
      opacitySlider.addEventListener('input', (e) => {
        if (!this.activeElement) return;
        const val = e.target.value;
        this.activeElement.style.opacity = val;
        if (opacityValBadge) opacityValBadge.textContent = `${Math.round(val * 100)}%`;
      });
      opacitySlider.addEventListener('change', () => {
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Opacity');
      });
    }

    // Alignment Segmented Buttons
    const alignBtns = document.querySelectorAll('[data-align-btn]');
    alignBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.activeElement) return;
        alignBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const align = btn.getAttribute('data-align-btn');
        this.activeElement.style.textAlign = align;
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Alignment');
      });
    });

    // Custom CSS Textarea
    const customCssInput = document.getElementById('propCustomCss');
    if (customCssInput) {
      customCssInput.addEventListener('input', () => {
        if (!this.activeElement) return;
        this.activeElement.setAttribute('style', customCssInput.value);
      });
      customCssInput.addEventListener('change', () => {
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Custom Style');
      });
    }

    // Element ID and Class edits
    const idInput = document.getElementById('propElemId');
    if (idInput) {
      idInput.addEventListener('change', () => {
        if (!this.activeElement) return;
        this.activeElement.id = idInput.value.trim();
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Element ID');
      });
    }

    const classInput = document.getElementById('propElemClass');
    if (classInput) {
      classInput.addEventListener('change', () => {
        if (!this.activeElement) return;
        const extraClasses = classInput.value.trim();
        this.activeElement.className = extraClasses + (this.activeElement.classList.contains('designer-selected') ? ' designer-selected' : '');
        if (window.TechXStorage) window.TechXStorage.pushHistory('Update Element Classes');
      });
    }
  },

  bindColorPicker(inputId, styleProp) {
    const textInput = document.getElementById(inputId);
    const nativePicker = document.getElementById(`${inputId}Native`);
    const previewBox = document.getElementById(`${inputId}Preview`);

    if (textInput && nativePicker) {
      nativePicker.addEventListener('input', (e) => {
        const hex = e.target.value;
        textInput.value = hex;
        if (previewBox) previewBox.style.backgroundColor = hex;
        if (this.activeElement) this.activeElement.style[styleProp] = hex;
      });

      nativePicker.addEventListener('change', () => {
        if (window.TechXStorage) window.TechXStorage.pushHistory(`Update ${styleProp}`);
      });

      textInput.addEventListener('input', (e) => {
        const hex = e.target.value.trim();
        if (previewBox) previewBox.style.backgroundColor = hex;
        if (this.activeElement) this.activeElement.style[styleProp] = hex;
      });

      textInput.addEventListener('change', () => {
        if (window.TechXStorage) window.TechXStorage.pushHistory(`Update ${styleProp}`);
      });
    }
  },

  setInputValue(id, val) {
    const input = document.getElementById(id);
    if (input) input.value = val;
  },

  setColorInputValue(id, val) {
    const textInput = document.getElementById(id);
    const nativePicker = document.getElementById(`${id}Native`);
    const previewBox = document.getElementById(`${id}Preview`);

    if (textInput) textInput.value = val;
    if (previewBox) previewBox.style.backgroundColor = val;
    // If hex formatted, set native picker
    if (nativePicker && /^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      nativePicker.value = val;
    }
  },

  setSliderValue(id, val) {
    const slider = document.getElementById(id);
    const badge = document.getElementById(`${id}Val`);
    if (slider) slider.value = val;
    if (badge) badge.textContent = `${Math.round(val * 100)}%`;
  },

  setActiveSegment(groupName, activeVal) {
    const btns = document.querySelectorAll('[data-align-btn]');
    btns.forEach(btn => {
      if (btn.getAttribute('data-align-btn') === activeVal) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
};

