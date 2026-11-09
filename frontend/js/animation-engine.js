/**
 * HTML Page Designer - Animation Engine
 * Visual animation configuration, live canvas playback, and CSS @keyframes generation.
 */

window.TechXAnimations = {
  activeElement: null,

  // Defined Keyframe presets with their CSS keyframe definitions
  presets: {
    'none': { label: 'None', keyframes: '' },
    'fadeIn': {
      label: 'Fade In',
      keyframes: `@keyframes txFadeIn { from { opacity: 0; } to { opacity: 1; } }`
    },
    'fadeInUp': {
      label: 'Fade In Up',
      keyframes: `@keyframes txFadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`
    },
    'fadeInDown': {
      label: 'Fade In Down',
      keyframes: `@keyframes txFadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }`
    },
    'slideInLeft': {
      label: 'Slide In Left',
      keyframes: `@keyframes txSlideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }`
    },
    'slideInRight': {
      label: 'Slide In Right',
      keyframes: `@keyframes txSlideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }`
    },
    'zoomIn': {
      label: 'Zoom In',
      keyframes: `@keyframes txZoomIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }`
    },
    'zoomOut': {
      label: 'Zoom Out',
      keyframes: `@keyframes txZoomOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.7); } }`
    },
    'bounce': {
      label: 'Bounce',
      keyframes: `@keyframes txBounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-20px); } 60% { transform: translateY(-10px); } }`
    },
    'pulse': {
      label: 'Pulse Scale',
      keyframes: `@keyframes txPulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }`
    },
    'rotate': {
      label: 'Rotate 360°',
      keyframes: `@keyframes txRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`
    },
    'flipX': {
      label: 'Flip Horizontal',
      keyframes: `@keyframes txFlipX { from { transform: perspective(400px) rotateY(90deg); opacity: 0; } to { transform: perspective(400px) rotateY(0deg); opacity: 1; } }`
    }
  },

  init() {
    this.injectKeyframeStyles();
    this.bindControls();
  },

  // Injects keyframe CSS rules into document head so live preview works immediately
  injectKeyframeStyles() {
    let styleTag = document.getElementById('txAnimationKeyframes');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'txAnimationKeyframes';
      document.head.appendChild(styleTag);
    }

    let css = '';
    for (const [key, preset] of Object.entries(this.presets)) {
      if (preset.keyframes) {
        css += `${preset.keyframes}\n`;
      }
    }
    styleTag.innerHTML = css;
  },

  populate(el) {
    this.activeElement = el;
    if (!el) {
      this.clear();
      return;
    }

    // Read existing animation data attributes
    const preset = el.getAttribute('data-tx-anim-preset') || 'none';
    const duration = el.getAttribute('data-tx-anim-duration') || '0.8';
    const delay = el.getAttribute('data-tx-anim-delay') || '0';
    const timing = el.getAttribute('data-tx-anim-timing') || 'ease';
    const iteration = el.getAttribute('data-tx-anim-iteration') || '1';
    const trigger = el.getAttribute('data-tx-anim-trigger') || 'load'; // 'load' | 'hover' | 'scroll'

    const presetSelect = document.getElementById('animPresetSelect');
    if (presetSelect) presetSelect.value = preset;

    const durationInput = document.getElementById('animDuration');
    if (durationInput) durationInput.value = duration;

    const delayInput = document.getElementById('animDelay');
    if (delayInput) delayInput.value = delay;

    const timingSelect = document.getElementById('animTimingSelect');
    if (timingSelect) timingSelect.value = timing;

    const iterSelect = document.getElementById('animIterSelect');
    if (iterSelect) iterSelect.value = iteration;

    const triggerSelect = document.getElementById('animTriggerSelect');
    if (triggerSelect) triggerSelect.value = trigger;
  },

  clear() {
    this.activeElement = null;
    const presetSelect = document.getElementById('animPresetSelect');
    if (presetSelect) presetSelect.value = 'none';
  },

  bindControls() {
    const applyAnimationSettings = () => {
      if (!this.activeElement) return;

      const preset = document.getElementById('animPresetSelect')?.value || 'none';
      const duration = document.getElementById('animDuration')?.value || '0.8';
      const delay = document.getElementById('animDelay')?.value || '0';
      const timing = document.getElementById('animTimingSelect')?.value || 'ease';
      const iteration = document.getElementById('animIterSelect')?.value || '1';
      const trigger = document.getElementById('animTriggerSelect')?.value || 'load';

      if (preset === 'none') {
        this.activeElement.removeAttribute('data-tx-anim-preset');
        this.activeElement.removeAttribute('data-tx-anim-duration');
        this.activeElement.removeAttribute('data-tx-anim-delay');
        this.activeElement.removeAttribute('data-tx-anim-timing');
        this.activeElement.removeAttribute('data-tx-anim-iteration');
        this.activeElement.removeAttribute('data-tx-anim-trigger');
        this.activeElement.style.animation = '';
      } else {
        this.activeElement.setAttribute('data-tx-anim-preset', preset);
        this.activeElement.setAttribute('data-tx-anim-duration', duration);
        this.activeElement.setAttribute('data-tx-anim-delay', delay);
        this.activeElement.setAttribute('data-tx-anim-timing', timing);
        this.activeElement.setAttribute('data-tx-anim-iteration', iteration);
        this.activeElement.setAttribute('data-tx-anim-trigger', trigger);

        // If trigger is load, we can preview immediately
        if (trigger === 'load') {
          this.previewAnimation();
        }
      }

      if (window.TechXStorage) window.TechXStorage.pushHistory('Update Animation');
    };

    const inputs = ['animPresetSelect', 'animDuration', 'animDelay', 'animTimingSelect', 'animIterSelect', 'animTriggerSelect'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', applyAnimationSettings);
      }
    });

    const previewBtn = document.getElementById('btnPreviewAnimation');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        this.previewAnimation();
      });
    }
  },

  // Live Canvas Animation Playback
  previewAnimation() {
    if (!this.activeElement) {
      if (window.TechXDesignerUI) window.TechXDesignerUI.showToast('Please select an element first', 'warning');
      return;
    }

    const preset = document.getElementById('animPresetSelect')?.value || 'none';
    if (preset === 'none') {
      if (window.TechXDesignerUI) window.TechXDesignerUI.showToast('Choose an animation preset to preview', 'info');
      return;
    }

    const duration = parseFloat(document.getElementById('animDuration')?.value || '0.8');
    const delay = parseFloat(document.getElementById('animDelay')?.value || '0');
    const timing = document.getElementById('animTimingSelect')?.value || 'ease';
    const iteration = document.getElementById('animIterSelect')?.value || '1';

    // Map preset to animation keyframe name
    const animMap = {
      'fadeIn': 'txFadeIn',
      'fadeInUp': 'txFadeInUp',
      'fadeInDown': 'txFadeInDown',
      'slideInLeft': 'txSlideInLeft',
      'slideInRight': 'txSlideInRight',
      'zoomIn': 'txZoomIn',
      'zoomOut': 'txZoomOut',
      'bounce': 'txBounce',
      'pulse': 'txPulse',
      'rotate': 'txRotate',
      'flipX': 'txFlipX'
    };

    const animName = animMap[preset] || 'txFadeIn';

    // Reset and replay animation cleanly
    this.activeElement.style.animation = 'none';
    void this.activeElement.offsetWidth; // trigger reflow
    this.activeElement.style.animation = `${animName} ${duration}s ${timing} ${delay}s ${iteration} normal both`;

    if (window.TechXDesignerUI) {
      window.TechXDesignerUI.showToast(`Previewing ${this.presets[preset]?.label}`, 'info');
    }
  },

  // Generates complete CSS styles and keyframes for export
  generateExportCSS(container) {
    const animatedElements = container.querySelectorAll('[data-tx-anim-preset]');
    if (animatedElements.length === 0) return '';

    let css = '/* --- Exported Animations --- */\n';
    const usedPresets = new Set();

    animatedElements.forEach((el, index) => {
      const preset = el.getAttribute('data-tx-anim-preset');
      const duration = el.getAttribute('data-tx-anim-duration') || '0.8';
      const delay = el.getAttribute('data-tx-anim-delay') || '0';
      const timing = el.getAttribute('data-tx-anim-timing') || 'ease';
      const iteration = el.getAttribute('data-tx-anim-iteration') || '1';
      const trigger = el.getAttribute('data-tx-anim-trigger') || 'load';

      usedPresets.add(preset);

      const animMap = {
        'fadeIn': 'txFadeIn',
        'fadeInUp': 'txFadeInUp',
        'fadeInDown': 'txFadeInDown',
        'slideInLeft': 'txSlideInLeft',
        'slideInRight': 'txSlideInRight',
        'zoomIn': 'txZoomIn',
        'zoomOut': 'txZoomOut',
        'bounce': 'txBounce',
        'pulse': 'txPulse',
        'rotate': 'txRotate',
        'flipX': 'txFlipX'
      };

      const animName = animMap[preset] || 'txFadeIn';
      const className = `tx-anim-${index + 1}`;
      el.classList.add(className);

      if (trigger === 'hover') {
        css += `.${className}:hover { animation: ${animName} ${duration}s ${timing} ${delay}s ${iteration} normal both; }\n`;
      } else if (trigger === 'scroll') {
        css += `.${className}.tx-in-view { animation: ${animName} ${duration}s ${timing} ${delay}s ${iteration} normal both; }\n`;
      } else {
        css += `.${className} { animation: ${animName} ${duration}s ${timing} ${delay}s ${iteration} normal both; }\n`;
      }
    });

    // Append keyframes
    usedPresets.forEach(p => {
      if (this.presets[p] && this.presets[p].keyframes) {
        css += `${this.presets[p].keyframes}\n`;
      }
    });

    return css;
  },

  // Generates scroll trigger observer script for export
  generateScrollScript() {
    return `
// Scroll-triggered animations observer
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('tx-in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-tx-anim-trigger="scroll"]').forEach(el => {
    observer.observe(el);
  });
});
    `.trim();
  }
};

