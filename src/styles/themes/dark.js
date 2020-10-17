import hexToRgba from '~/util/hexToRgba';

export default {
  title: 'dark',

  colors: {
    primary: '#FB5BD1',
    danger: '#FF5050',
    warning: '#FFFF50',
    success: '#50FF50',

    disabled: hexToRgba('#DDDDFF', 0.6),

    texts: {
      primary: '#DDDDFF',
      secondary: '#AAAAFF',
    },
    backgrounds: {
      primary: '#000022',
      secondary: '#000040',
    },
  },
};
