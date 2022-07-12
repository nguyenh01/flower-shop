import { css } from 'styled-components';

const theme = {
  colors: {
    primary: '#e72463',
    red: '#ff0000',
    gray: '#eceff8',
    border: '#d9d9d9',
    blue: '#0d6efd',
    green: '#32a937',
    bold_gray: '#818181',
  },

  fadeInUp: (hide: number) => {
    return css`
      @keyframes fadeInUp {
        from {
          transform: translate3d(0, ${hide}, 0);
        }

        to {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }
    `;
  },

  fontCustom: (
    fontSize?: number,
    fontWeight?: number,
    lineHeight?: number,
    fontFamily = 'Poppins, sans-serif'
  ) => {
    return css`
      font-family: ${fontFamily};
      font-size: ${fontSize || 14}px;
      font-weight: ${fontWeight || 400};
      line-height: ${lineHeight || 12}px;
    `;
  },

  createGridView: (templateColumns: string, columnGap = 0, rowGap = 0) => {
    return css`
      display: grid;
      grid-template-columns: ${templateColumns};
      column-gap: ${columnGap}px;
      row-gap: ${rowGap}px;
    `;
  },

  displayFlex: (justifyContent: string, alignItems: string) => {
    return css`
      display: flex;
      justify-content: ${justifyContent};
      align-items: ${alignItems};
    `;
  },
};

export type ThemeType = typeof theme;

export default theme;
