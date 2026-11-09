# HTML Page Designer — Visual Web Canvas Studio

A professional, advanced, standalone Visual HTML Page Designer. Design visually, customize typography, styling, animations, edit HTML/CSS/JS source, and export standalone HTML or complete ZIP projects.

---

## 🎨 Official Design System (FusionTrail Reference)
Adheres strictly to the official design palette:
- **Light Gray** (`#EDEFF5`, 90%): Surfaces, sidebars, modal backdrops, editor panels
- **Deep Blue** (`#253763`, 6%): Top toolbar, primary buttons, headers, active controls
- **Purple** (`#8A87F9`, 3%): Selection outlines, drop indicators, resize handles, interactive highlights
- **Gray** (`#8A91A1`, 1%): Secondary labels, borders, subtle icons

---

## 🚀 Quick Start (Local Execution)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server on Port 3000
```bash
npm run dev
```

Open your browser at:
**`http://localhost:3000`**

---

## 📁 Project Architecture

```text
HTML/
├── public/
│   ├── favicon.ico              # Independent favicon
│   ├── favicon.svg              # Vector HTML Designer icon
│   └── assets/
│       └── logo.svg             # Brand logo mark
├── frontend/
│   ├── css/
│   │   └── designer.css         # FusionTrail palette (#EDEFF5, #253763, #8A87F9, #8A91A1)
│   └── js/
│       ├── elements-library.js  # 33 elements across 5 categories (Basic, Layout, Content, Form, Advanced)
│       ├── designer-core.js     # Drag-and-drop, canvas, 8 resize handles, text editing
│       ├── properties-panel.js  # Box Model visual diagram, typography, colors, flex/grid
│       ├── animation-engine.js  # 12 animation presets, live canvas preview, CSS exporter
│       ├── code-editor.js       # HTML, CSS, JS source code editor with live 2-way sync
│       ├── import-parser.js     # HTML file upload & raw code importer
│       ├── storage-manager.js   # Undo/Redo stack, autosave, layers tree, shortcuts
│       ├── export-engine.js     # Standalone HTML, Complete ZIP bundler (JSZip), Copy code
│       └── ui-controller.js     # UI event handling, search filtering, tabs, toasts
├── backend/
│   └── server.js                # Dedicated, isolated server listening strictly on port 3000
├── index.html                   # Independent application entry point
├── package.json                 # Dedicated scripts and dependencies
└── README.md                    # Project documentation
```

---

## ✨ Features
1. **Visual Drag & Drop**: 33 elements in 5 categories (Basic, Layout, Content, Form, Advanced).
2. **Interactive Canvas**: Selection borders, 8 resize handles, floating action toolbar, inline text editing.
3. **Visual Box Model**: Real-time margin and padding diagram with individual direction controls.
4. **Animation Engine**: 12 keyframe presets, triggers (Load, Hover, Scroll), live canvas playback.
5. **HTML/CSS/JS Source Code Editor**: Tabbed code editor with 2-way sync and conflict protection.
6. **HTML Import**: Upload `.html` files or paste raw HTML code to parse and load into the canvas.
7. **Responsive Viewports**: Desktop (`1200px`), Tablet (`768px`), Mobile (`375px`) switcher with zoom controls.
8. **3-Tier Export System**:
   - Standalone HTML (100% self-contained)
   - Complete Project ZIP (`index.html`, `css/style.css`, `js/script.js`, `assets/`, `README.md`)
   - 1-Click Copy Source Code
9. **Persistence**: 50-step Undo/Redo stack, automatic 15-second `localStorage` autosave, keyboard shortcuts.
