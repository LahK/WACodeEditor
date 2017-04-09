export default {
  // Components Library
  objects: [
    {
      name: 'Page',
      desc: 'A new page.',
      img: '../../../../static/img/objects/AL-Page.png'
    },
    {
      name: 'View',
      desc: 'Represents a rectangular region in which it draws and receives events.',
      img: '../../../../static/img/objects/AL-View.png'
    },
    {
      name: 'Label',
      desc: 'A variably sized amount of static text.',
      img: '../../../../static/img/objects/AL-Label.png'
    },
    {
      name: 'Button',
      desc: 'Intercepts touch events and sends an action message to a target object when it\'s tapped.',
      img: '../../../../static/img/objects/AL-Button.png'
    },
    {
      name: 'Image',
      desc: 'Displays a single image, or an animation described by an array of images.',
      img: '../../../../static/img/objects/AL-Image.png'
    }
  ],
  components: {
    View: 'AL-View',
    Label: 'AL-Label',
    Button: 'AL-Button',
    Image: 'AL-Image'
  },
  // Attribute-inspector Configs
  attributes: {
    'al-page': {
      style: {
        'Height': 'height',
        'Bg Color': 'background-color'
      }
    },
    'al-view': {
      style: {
        'Width': 'width',
        'Height': 'height',
        'Left': 'left',
        'Top': 'top',
        'Padding': 'padding',
        'Border': 'border',
        'Border Radius': 'border-radius',
        'Bg Color': 'background-color'
      },
      data: {}
    },
    'al-label': {
      style: {
        'Font': 'font-family',
        'Font Size': 'font-size',
        'Color': 'color',
        'Width': 'width',
        'Height': 'height',
        'Left': 'left',
        'Top': 'top',
        'Padding': 'padding',
        'Border': 'border',
        'Border Radius': 'border-radius',
        'Bg Color': 'background-color',
        'Text Align': 'Text Align'
      },
      data: {
        'Text': 'al-text'
      }
    },
    'al-button': {
      style: {
        'Font': 'font-family',
        'Font Size': 'font-size',
        'Width': 'width',
        'Height': 'height',
        'Left': 'left',
        'Top': 'top',
        'Padding': 'padding',
        'Border': 'border',
        'Border Radius': 'border-radius',
        'Bg Color': 'background-color',
        'Text Color': 'color',
        'Text Align': 'Text Align'
      },
      data: {
        'Text': 'al-text'
      }
    },
    'al-image': {
      style: {
        'Z-Index': 'z-index',
        'Width': 'width',
        'Height': 'height',
        'Left': 'left',
        'Top': 'top',
        'Border': 'border',
        'Border Radius': 'border-radius',
        'Image Url': 'background-image',
        'Image Mode': 'Image Mode'
      },
      data: {}
    }
  },
  // Constraint-inspector Configs
  constraints: {
    single: {
      Size: {
        'Width': 'c-width',
        'Height': 'c-height',
        'Equal Width To Screen': 'c-equal-width-to-box',
        'Equal Height To Screen': 'c-equal-height-to-box'
      },
      Spacing: {
        'Leading Space': 'c-leading-space',
        'Top Space': 'c-top-space',
        'Trailing Space': 'c-trailing-space',
        'Bottom Space': 'c-bottom-space'
      },
      Align: {
        'Herizontally in Screen': 'c-herizontally-in-box',
        'Vertically in Screen': 'c-vertically-in-box'
      }
    },
    multi: {
      'Equal Width': 'c-equal-width',
      'Equal Height': 'c-equal-height',
      'Align Leading Edges': 'c-align-leading-edges',
      'Align Top Edges': 'c-align-top-edges',
      'Align Trailing Edges': 'c-align-traling-edges',
      'Align Botton Edges': 'c-align-bottom-edges',
      'Horizontally Align': 'c-horizontally-align',
      'Vertically Align': 'c-vertically-align'
    }
  },
  // 自定义样式
  customStyles: {
    'Text Align': {
      'Center': {
        'justify-content': 'center',
        'align-items': 'center'
      },
      'Left': {
        'justify-content': 'flex-start',
        'align-items': 'center'
      },
      'Right': {
        'justify-content': 'flex-end',
        'align-items': 'center'
      },
      'Top Center': {
        'justify-content': 'center',
        'align-items': 'flex-start'
      },
      'Top Left': {
        'justify-content': 'flex-start',
        'align-items': 'flex-start'
      },
      'Top Right': {
        'justify-content': 'flex-end',
        'align-items': 'flex-start'
      },
      'Bottom Center': {
        'justify-content': 'center',
        'align-items': 'flex-end'
      },
      'Bottom Left': {
        'justify-content': 'flex-start',
        'align-items': 'flex-end'
      },
      'Bottom Right': {
        'justify-content': 'flex-end',
        'align-items': 'flex-end'
      }
    },
    'Image Mode': {
      'Scall To Fill': {
        'background-size': '100% 100%'
      },
      'Aspect Fit': {
        'background-size': 'contain'
      },
      'Aspect Fill': {
        'background-size': 'cover'
      }
    }
  }
}
