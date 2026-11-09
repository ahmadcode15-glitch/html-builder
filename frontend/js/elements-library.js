/**
 * HTML Page Designer - Elements Library Registry
 * 5 Expanded Categories: Basic, Layout, Content, Form, and Advanced Elements
 * Adheres to the FusionTrail design system palette.
 */

window.TechXElements = {
  // 1. Basic Elements
  basic: [
    {
      type: 'heading',
      label: 'Heading',
      icon: 'fa-solid fa-heading',
      category: 'basic',
      description: 'H1, H2, or H3 Title element',
      defaultTag: 'h2',
      defaultHTML: '<h2 style="font-family: \'Outfit\', sans-serif; font-size: 28px; font-weight: 700; color: #253763; margin-bottom: 12px;">Craft Stunning Headlines</h2>',
      defaultStyles: {
        'font-family': "'Outfit', sans-serif",
        'font-size': '28px',
        'font-weight': '700',
        'color': '#253763',
        'margin-bottom': '12px'
      }
    },
    {
      type: 'paragraph',
      label: 'Paragraph',
      icon: 'fa-solid fa-paragraph',
      category: 'basic',
      description: 'Multi-line body text paragraph',
      defaultTag: 'p',
      defaultHTML: '<p style="font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 15px; color: #4A5568; line-height: 1.6; margin-bottom: 16px;">This is a customizable paragraph element. You can visually format its typography, line spacing, margins, and color right from the properties panel.</p>',
      defaultStyles: {
        'font-family': "'Plus Jakarta Sans', sans-serif",
        'font-size': '15px',
        'color': '#4A5568',
        'line-height': '1.6',
        'margin-bottom': '16px'
      }
    },
    {
      type: 'text',
      label: 'Text / Span',
      icon: 'fa-solid fa-font',
      category: 'basic',
      description: 'Inline text element',
      defaultTag: 'span',
      defaultHTML: '<span style="font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; color: #253763;">Inline text content</span>',
      defaultStyles: {
        'font-family': "'Plus Jakarta Sans', sans-serif",
        'font-size': '14px',
        'color': '#253763'
      }
    },
    {
      type: 'link',
      label: 'Link',
      icon: 'fa-solid fa-link',
      category: 'basic',
      description: 'Hyperlink to page or URL',
      defaultTag: 'a',
      defaultHTML: '<a href="#" style="color: #8A87F9; text-decoration: underline; font-weight: 600; font-size: 14px;">Explore Solutions &rarr;</a>',
      defaultStyles: {
        'color': '#8A87F9',
        'text-decoration': 'underline',
        'font-weight': '600',
        'font-size': '14px'
      }
    },
    {
      type: 'button',
      label: 'Button',
      icon: 'fa-solid fa-square-check',
      category: 'basic',
      description: 'Call-to-action interactive button',
      defaultTag: 'button',
      defaultHTML: '<button style="background-color: #253763; color: #FFFFFF; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; font-weight: 700; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 14px rgba(37, 55, 99, 0.25); transition: all 0.2s ease;">Get Started Now</button>',
      defaultStyles: {
        'background-color': '#253763',
        'color': '#FFFFFF',
        'font-family': "'Plus Jakarta Sans', sans-serif",
        'font-size': '14px',
        'font-weight': '700',
        'padding': '12px 24px',
        'border': 'none',
        'border-radius': '8px',
        'cursor': 'pointer',
        'box-shadow': '0 4px 14px rgba(37, 55, 99, 0.25)'
      }
    },
    {
      type: 'image',
      label: 'Image',
      icon: 'fa-solid fa-image',
      category: 'basic',
      description: 'Image with customizable source and styling',
      defaultTag: 'img',
      defaultHTML: '<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Sample Visual" style="width: 100%; max-width: 600px; height: auto; border-radius: 12px; display: block; margin: 16px auto; box-shadow: 0 10px 25px rgba(37, 55, 99, 0.1);" />',
      defaultStyles: {
        'width': '100%',
        'max-width': '600px',
        'height': 'auto',
        'border-radius': '12px',
        'display': 'block',
        'margin': '16px auto',
        'box-shadow': '0 10px 25px rgba(37, 55, 99, 0.1)'
      }
    },
    {
      type: 'video',
      label: 'Video',
      icon: 'fa-solid fa-video',
      category: 'basic',
      description: 'Embedded responsive video container',
      defaultTag: 'div',
      defaultHTML: '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 16px 0; box-shadow: 0 10px 25px rgba(37, 55, 99, 0.15);"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe></div>',
      defaultStyles: {
        'margin': '16px 0'
      }
    },
    {
      type: 'audio',
      label: 'Audio Player',
      icon: 'fa-solid fa-music',
      category: 'basic',
      description: 'HTML5 Audio player with controls',
      defaultTag: 'audio',
      defaultHTML: '<div style="padding: 12px; background: #EDEFF5; border-radius: 8px; margin: 12px 0;"><audio controls style="width: 100%;"><source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio></div>',
      defaultStyles: {
        'padding': '12px',
        'background-color': '#EDEFF5',
        'border-radius': '8px',
        'margin': '12px 0'
      }
    },
    {
      type: 'icon',
      label: 'Icon',
      icon: 'fa-solid fa-icons',
      category: 'basic',
      description: 'Vector FontAwesome icon',
      defaultTag: 'i',
      defaultHTML: '<i class="fa-solid fa-bolt" style="font-size: 28px; color: #8A87F9; display: inline-block; padding: 12px; background: rgba(138, 135, 249, 0.12); border-radius: 50%;"></i>',
      defaultStyles: {
        'font-size': '28px',
        'color': '#8A87F9',
        'display': 'inline-block',
        'padding': '12px',
        'background': 'rgba(138, 135, 249, 0.12)',
        'border-radius': '50%'
      }
    },
    {
      type: 'divider',
      label: 'Divider',
      icon: 'fa-solid fa-minus',
      category: 'basic',
      description: 'Horizontal separator line',
      defaultTag: 'hr',
      defaultHTML: '<hr style="border: none; border-top: 1px solid #D8DCE6; margin: 24px 0; width: 100%;" />',
      defaultStyles: {
        'border': 'none',
        'border-top': '1px solid #D8DCE6',
        'margin': '24px 0',
        'width': '100%'
      }
    },
    {
      type: 'spacer',
      label: 'Spacer',
      icon: 'fa-solid fa-arrows-up-down',
      category: 'basic',
      description: 'Vertical spacing block',
      defaultTag: 'div',
      defaultHTML: '<div style="height: 40px; width: 100%;"></div>',
      defaultStyles: {
        'height': '40px',
        'width': '100%'
      }
    }
  ],

  // 2. Layout Elements
  layout: [
    {
      type: 'section',
      label: 'Section',
      icon: 'fa-solid fa-layer-group',
      category: 'layout',
      isContainer: true,
      description: 'Full width page section wrapper',
      defaultTag: 'section',
      defaultHTML: '<section style="padding: 60px 24px; background-color: #EDEFF5; width: 100%;"><div style="max-width: 1100px; margin: 0 auto;"><h2 style="font-family: \'Outfit\', sans-serif; font-size: 26px; color: #253763; margin-bottom: 8px;">Modern Section</h2><p style="color: #4A5568;">Drop any content inside this section.</p></div></section>',
      defaultStyles: {
        'padding': '60px 24px',
        'background-color': '#EDEFF5',
        'width': '100%'
      }
    },
    {
      type: 'container',
      label: 'Container',
      icon: 'fa-regular fa-square',
      category: 'layout',
      isContainer: true,
      description: 'Centered content wrapper',
      defaultTag: 'div',
      defaultHTML: '<div style="max-width: 1140px; margin: 0 auto; padding: 24px; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #D8DCE6; box-shadow: 0 4px 12px rgba(37, 55, 99, 0.04);"><p style="color: #4A5568; margin: 0;">Container content area</p></div>',
      defaultStyles: {
        'max-width': '1140px',
        'margin': '0 auto',
        'padding': '24px',
        'background-color': '#FFFFFF',
        'border-radius': '12px',
        'border': '1px solid #D8DCE6'
      }
    },
    {
      type: 'div',
      label: 'Div Box',
      icon: 'fa-solid fa-box',
      category: 'layout',
      isContainer: true,
      description: 'Generic customizable box container',
      defaultTag: 'div',
      defaultHTML: '<div style="padding: 20px; background-color: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 8px;"><p style="margin: 0; color: #4A5568;">Generic Div Container</p></div>',
      defaultStyles: {
        'padding': '20px',
        'background-color': '#FFFFFF',
        'border': '1px solid #D8DCE6',
        'border-radius': '8px'
      }
    },
    {
      type: 'flexbox',
      label: 'Flexbox Row',
      icon: 'fa-solid fa-arrows-left-right',
      category: 'layout',
      isContainer: true,
      description: 'Flexible row with gap and alignment',
      defaultTag: 'div',
      defaultHTML: '<div style="display: flex; gap: 20px; align-items: center; justify-content: space-between; padding: 16px; border: 1px dashed #8A87F9; border-radius: 8px;"><div style="flex: 1; padding: 14px; background: #EDEFF5; border-radius: 6px; text-align: center; color: #253763; font-weight: 600;">Flex Item 1</div><div style="flex: 1; padding: 14px; background: #EDEFF5; border-radius: 6px; text-align: center; color: #253763; font-weight: 600;">Flex Item 2</div></div>',
      defaultStyles: {
        'display': 'flex',
        'gap': '20px',
        'align-items': 'center',
        'justify-content': 'space-between',
        'padding': '16px'
      }
    },
    {
      type: 'grid',
      label: 'CSS Grid (2-Col)',
      icon: 'fa-solid fa-table-cells',
      category: 'layout',
      isContainer: true,
      description: 'Two-column responsive grid layout',
      defaultTag: 'div',
      defaultHTML: '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 16px;"><div style="padding: 20px; background: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 8px; box-shadow: 0 4px 10px rgba(37, 55, 99, 0.04);"><h4 style="color: #253763; margin-bottom: 6px;">Grid Column 1</h4><p style="color: #4A5568; font-size: 13.5px; margin: 0;">Add card content or widgets here.</p></div><div style="padding: 20px; background: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 8px; box-shadow: 0 4px 10px rgba(37, 55, 99, 0.04);"><h4 style="color: #253763; margin-bottom: 6px;">Grid Column 2</h4><p style="color: #4A5568; font-size: 13.5px; margin: 0;">Add card content or widgets here.</p></div></div>',
      defaultStyles: {
        'display': 'grid',
        'grid-template-columns': 'repeat(2, 1fr)',
        'gap': '20px',
        'padding': '16px'
      }
    },
    {
      type: 'columns-3',
      label: '3 Columns',
      icon: 'fa-solid fa-table-columns',
      category: 'layout',
      isContainer: true,
      description: 'Three equal columns layout',
      defaultTag: 'div',
      defaultHTML: '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px;"><div style="padding: 18px; background: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 8px; text-align: center; box-shadow: 0 2px 6px rgba(37, 55, 99, 0.04);"><i class="fa-solid fa-rocket" style="font-size: 24px; color: #8A87F9; margin-bottom: 8px;"></i><h5 style="color: #253763; font-size: 15px; margin: 0;">Fast</h5></div><div style="padding: 18px; background: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 8px; text-align: center; box-shadow: 0 2px 6px rgba(37, 55, 99, 0.04);"><i class="fa-solid fa-shield-halved" style="font-size: 24px; color: #8A87F9; margin-bottom: 8px;"></i><h5 style="color: #253763; font-size: 15px; margin: 0;">Secure</h5></div><div style="padding: 18px; background: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 8px; text-align: center; box-shadow: 0 2px 6px rgba(37, 55, 99, 0.04);"><i class="fa-solid fa-chart-line" style="font-size: 24px; color: #8A87F9; margin-bottom: 8px;"></i><h5 style="color: #253763; font-size: 15px; margin: 0;">Scalable</h5></div></div>',
      defaultStyles: {
        'display': 'grid',
        'grid-template-columns': 'repeat(3, 1fr)',
        'gap': '16px',
        'padding': '16px'
      }
    }
  ],

  // 3. Content Elements
  content: [
    {
      type: 'list',
      label: 'Lists',
      icon: 'fa-solid fa-list-ul',
      category: 'content',
      isContainer: true,
      description: 'Bullet list items',
      defaultTag: 'ul',
      defaultHTML: '<ul style="list-style: disc; padding-left: 24px; font-family: \'Plus Jakarta Sans\', sans-serif; color: #253763; line-height: 1.8;"><li style="margin-bottom: 6px;">Visual drag-and-drop workflow</li><li style="margin-bottom: 6px;">Real-time styling & typography</li><li style="margin-bottom: 6px;">Standalone HTML and ZIP export</li></ul>',
      defaultStyles: {
        'list-style': 'disc',
        'padding-left': '24px',
        'color': '#253763',
        'line-height': '1.8'
      }
    },
    {
      type: 'table',
      label: 'Tables',
      icon: 'fa-solid fa-table',
      category: 'content',
      isContainer: true,
      description: 'Structured data table with styled headers',
      defaultTag: 'div',
      defaultHTML: '<div style="overflow-x: auto; width: 100%; margin: 16px 0;"><table style="width: 100%; border-collapse: collapse; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 13.5px;"><thead style="background-color: #EDEFF5; border-bottom: 2px solid #D8DCE6;"><tr><th style="padding: 10px 14px; text-align: left; font-weight: 700; color: #253763;">Feature</th><th style="padding: 10px 14px; text-align: left; font-weight: 700; color: #253763;">HTML Page Designer</th><th style="padding: 10px 14px; text-align: left; font-weight: 700; color: #253763;">Standard Editor</th></tr></thead><tbody><tr style="border-bottom: 1px solid #EDEFF5;"><td style="padding: 10px 14px; font-weight: 600; color: #253763;">Visual Canvas</td><td style="padding: 10px 14px; color: #8A87F9; font-weight: 700;">&#10003; Live Drag & Drop</td><td style="padding: 10px 14px; color: #8A91A1;">Code only</td></tr><tr style="border-bottom: 1px solid #EDEFF5;"><td style="padding: 10px 14px; font-weight: 600; color: #253763;">Standalone Export</td><td style="padding: 10px 14px; color: #8A87F9; font-weight: 700;">&#10003; 100% Free HTML/ZIP</td><td style="padding: 10px 14px; color: #8A91A1;">Restricted</td></tr></tbody></table></div>',
      defaultStyles: {
        'width': '100%',
        'margin': '16px 0'
      }
    },
    {
      type: 'card',
      label: 'Feature Card',
      icon: 'fa-solid fa-id-card',
      category: 'content',
      isContainer: true,
      description: 'Professional visual card with icon and description',
      defaultTag: 'div',
      defaultHTML: '<div style="background: #FFFFFF; border: 1px solid #D8DCE6; border-radius: 12px; padding: 24px; box-shadow: 0 4px 14px rgba(37, 55, 99, 0.05); max-width: 360px;"><div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(138, 135, 249, 0.15); display: flex; align-items: center; justify-content: center; margin-bottom: 14px;"><i class="fa-solid fa-wand-magic-sparkles" style="color: #8A87F9; font-size: 20px;"></i></div><h4 style="font-family: \'Outfit\', sans-serif; font-size: 18px; color: #253763; margin-bottom: 8px;">Modern Solution</h4><p style="color: #4A5568; font-size: 14px; line-height: 1.5; margin: 0;">Engineered for high performance, accessibility, and clean visual design standards.</p></div>',
      defaultStyles: {
        'background-color': '#FFFFFF',
        'border': '1px solid #D8DCE6',
        'border-radius': '12px',
        'padding': '24px',
        'max-width': '360px'
      }
    },
    {
      type: 'quote',
      label: 'Quote Block',
      icon: 'fa-solid fa-quote-left',
      category: 'content',
      description: 'Blockquote with author citation',
      defaultTag: 'blockquote',
      defaultHTML: '<blockquote style="border-left: 4px solid #8A87F9; background-color: #EDEFF5; padding: 18px 20px; border-radius: 0 8px 8px 0; margin: 16px 0;"><p style="font-style: italic; font-size: 15px; color: #253763; margin-bottom: 8px;">"Design is not just what it looks like and feels like. Design is how it works."</p><cite style="font-size: 13px; font-weight: 700; color: #8A87F9; display: block;">— Steve Jobs</cite></blockquote>',
      defaultStyles: {
        'border-left': '4px solid #8A87F9',
        'background-color': '#EDEFF5',
        'padding': '18px 20px',
        'margin': '16px 0'
      }
    },
    {
      type: 'text-block',
      label: 'Text Callout',
      icon: 'fa-solid fa-message',
      category: 'content',
      description: 'Highlighted notice or callout block',
      defaultTag: 'div',
      defaultHTML: '<div style="background-color: rgba(138, 135, 249, 0.08); border: 1px solid #8A87F9; border-radius: 8px; padding: 16px; margin: 16px 0; display: flex; align-items: flex-start; gap: 12px;"><i class="fa-solid fa-circle-info" style="color: #8A87F9; font-size: 20px; margin-top: 2px;"></i><div><h5 style="color: #253763; font-size: 14px; margin-bottom: 4px;">Important Notice</h5><p style="color: #4A5568; font-size: 13px; margin: 0;">This callout block highlights critical instructions or features for users.</p></div></div>',
      defaultStyles: {
        'background-color': 'rgba(138, 135, 249, 0.08)',
        'border': '1px solid #8A87F9',
        'border-radius': '8px',
        'padding': '16px',
        'margin': '16px 0'
      }
    }
  ],

  // 4. Form Elements
  form: [
    {
      type: 'form',
      label: 'Form Wrapper',
      icon: 'fa-solid fa-square-envelope',
      category: 'form',
      isContainer: true,
      description: 'Complete interactive contact or lead form',
      defaultTag: 'form',
      defaultHTML: '<form style="display: flex; flex-direction: column; gap: 14px; background: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #D8DCE6; max-width: 480px; box-shadow: 0 4px 12px rgba(37, 55, 99, 0.05);"><h3 style="font-family: \'Outfit\', sans-serif; color: #253763; margin-bottom: 4px;">Contact Us</h3><input type="text" placeholder="Your Name" style="padding: 10px 14px; border: 1px solid #D8DCE6; border-radius: 6px; font-size: 14px; outline: none;" /><input type="email" placeholder="Your Email Address" style="padding: 10px 14px; border: 1px solid #D8DCE6; border-radius: 6px; font-size: 14px; outline: none;" /><button type="submit" style="background: #253763; color: #FFF; padding: 12px; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">Send Message</button></form>',
      defaultStyles: {
        'display': 'flex',
        'flex-direction': 'column',
        'gap': '14px',
        'background-color': '#FFFFFF',
        'padding': '24px',
        'border-radius': '12px',
        'border': '1px solid #D8DCE6',
        'max-width': '480px'
      }
    },
    {
      type: 'label',
      label: 'Form Label',
      icon: 'fa-solid fa-tag',
      category: 'form',
      description: 'Label description for inputs',
      defaultTag: 'label',
      defaultHTML: '<label style="font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 13.5px; font-weight: 700; color: #253763; display: block; margin-bottom: 6px;">Input Label</label>',
      defaultStyles: {
        'font-size': '13.5px',
        'font-weight': '700',
        'color': '#253763',
        'display': 'block',
        'margin-bottom': '6px'
      }
    },
    {
      type: 'input',
      label: 'Input Field',
      icon: 'fa-regular fa-keyboard',
      category: 'form',
      description: 'Text, email, or number input',
      defaultTag: 'input',
      defaultHTML: '<input type="text" placeholder="Enter text here..." style="width: 100%; padding: 10px 14px; border: 1px solid #D8DCE6; border-radius: 6px; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; outline: none; background: #FFFFFF;" />',
      defaultStyles: {
        'width': '100%',
        'padding': '10px 14px',
        'border': '1px solid #D8DCE6',
        'border-radius': '6px',
        'font-size': '14px'
      }
    },
    {
      type: 'textarea',
      label: 'Textarea',
      icon: 'fa-regular fa-comment-dots',
      category: 'form',
      description: 'Multi-line text message input',
      defaultTag: 'textarea',
      defaultHTML: '<textarea placeholder="Write your message here..." style="width: 100%; min-height: 100px; padding: 10px 14px; border: 1px solid #D8DCE6; border-radius: 6px; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; outline: none; background: #FFFFFF;"></textarea>',
      defaultStyles: {
        'width': '100%',
        'min-height': '100px',
        'padding': '10px 14px',
        'border': '1px solid #D8DCE6',
        'border-radius': '6px',
        'font-size': '14px'
      }
    },
    {
      type: 'select',
      label: 'Select Dropdown',
      icon: 'fa-solid fa-circle-chevron-down',
      category: 'form',
      description: 'Option selection dropdown menu',
      defaultTag: 'select',
      defaultHTML: '<select style="width: 100%; padding: 10px 14px; border: 1px solid #D8DCE6; border-radius: 6px; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; background-color: #FFFFFF; outline: none; color: #253763;"><option value="1">Option 1 - Starter Plan</option><option value="2">Option 2 - Professional Plan</option><option value="3">Option 3 - Enterprise Plan</option></select>',
      defaultStyles: {
        'width': '100%',
        'padding': '10px 14px',
        'border': '1px solid #D8DCE6',
        'border-radius': '6px',
        'font-size': '14px',
        'background-color': '#FFFFFF'
      }
    },
    {
      type: 'checkbox',
      label: 'Checkbox',
      icon: 'fa-regular fa-square-check',
      category: 'form',
      description: 'Toggleable checkbox item with label',
      defaultTag: 'label',
      defaultHTML: '<label style="display: flex; align-items: center; gap: 8px; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; cursor: pointer; color: #253763;"><input type="checkbox" checked style="width: 16px; height: 16px; accent-color: #8A87F9;" /> <span>I accept the terms and conditions</span></label>',
      defaultStyles: {
        'display': 'flex',
        'align-items': 'center',
        'gap': '8px',
        'font-size': '14px',
        'cursor': 'pointer'
      }
    },
    {
      type: 'radio',
      label: 'Radio Button',
      icon: 'fa-regular fa-circle-dot',
      category: 'form',
      description: 'Single choice radio button',
      defaultTag: 'label',
      defaultHTML: '<label style="display: flex; align-items: center; gap: 8px; font-family: \'Plus Jakarta Sans\', sans-serif; font-size: 14px; cursor: pointer; color: #253763;"><input type="radio" name="demo-radio" checked style="width: 16px; height: 16px; accent-color: #8A87F9;" /> <span>Select this preference</span></label>',
      defaultStyles: {
        'display': 'flex',
        'align-items': 'center',
        'gap': '8px',
        'font-size': '14px',
        'cursor': 'pointer'
      }
    }
  ],

  // 5. Advanced Elements
  advanced: [
    {
      type: 'custom-html',
      label: 'Custom HTML',
      icon: 'fa-solid fa-code',
      category: 'advanced',
      description: 'Raw embeddable HTML snippet container',
      defaultTag: 'div',
      defaultHTML: '<div class="custom-embed" style="padding: 16px; background: rgba(138, 135, 249, 0.05); border: 1px dashed #8A87F9; border-radius: 8px;"><div style="font-weight: 700; color: #253763; font-size: 13px; margin-bottom: 4px;"><i class="fa-solid fa-code" style="color: #8A87F9;"></i> Custom HTML Snippet</div><p style="margin: 0; font-size: 12.5px; color: #4A5568;">You can customize this block using the Code Editor or properties panel.</p></div>',
      defaultStyles: {
        'padding': '16px',
        'border': '1px dashed #8A87F9',
        'border-radius': '8px'
      }
    },
    {
      type: 'svg',
      label: 'SVG Vector',
      icon: 'fa-solid fa-bezier-curve',
      category: 'advanced',
      description: 'Scalable vector graphic graphic container',
      defaultTag: 'div',
      defaultHTML: '<div style="display: inline-block; padding: 12px;"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8A87F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12 12 8"></polygon></svg></div>',
      defaultStyles: {
        'display': 'inline-block',
        'padding': '12px'
      }
    },
    {
      type: 'iframe',
      label: 'Iframe Embed',
      icon: 'fa-regular fa-window-maximize',
      category: 'advanced',
      description: 'Web page or map embed iframe',
      defaultTag: 'div',
      defaultHTML: '<div style="width: 100%; height: 320px; border-radius: 10px; overflow: hidden; border: 1px solid #D8DCE6;"><iframe src="https://example.com" style="width: 100%; height: 100%; border: none;" title="Webpage Embed"></iframe></div>',
      defaultStyles: {
        'width': '100%',
        'height': '320px',
        'border-radius': '10px'
      }
    },
    {
      type: 'custom-component',
      label: 'Hero Banner',
      icon: 'fa-solid fa-star',
      category: 'advanced',
      isContainer: true,
      description: 'Pre-styled Call to Action hero component',
      defaultTag: 'div',
      defaultHTML: '<div style="background: linear-gradient(135deg, #253763, #1A284A); color: #FFFFFF; padding: 48px 32px; border-radius: 16px; text-align: center; box-shadow: 0 10px 30px rgba(37, 55, 99, 0.2);"><h2 style="font-family: \'Outfit\', sans-serif; font-size: 32px; margin-bottom: 12px; color: #FFFFFF;">Build High-Impact Experiences</h2><p style="color: #D8DCE6; max-width: 600px; margin: 0 auto 24px; font-size: 15px; line-height: 1.6;">Designed visually with HTML Page Designer. Fast, responsive, and standalone.</p><button style="background: #8A87F9; color: #FFFFFF; font-weight: 700; padding: 12px 28px; border: none; border-radius: 8px; cursor: pointer; font-size: 14.5px;">Get Started Today</button></div>',
      defaultStyles: {
        'padding': '48px 32px',
        'border-radius': '16px',
        'text-align': 'center'
      }
    }
  ],

  // Helper to find definition by type
  findElement(type) {
    const all = [...this.basic, ...this.layout, ...this.content, ...this.form, ...this.advanced];
    return all.find(el => el.type === type);
  }
};
