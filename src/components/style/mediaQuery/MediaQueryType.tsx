export const BREAKPOINT_PC = 'pc';
export const BREAKPOINT_TABLET = 'tablet';
export const BREAKPOINT_MOBILE = 'mobile';

const device = {
  mobile: 375,
  tablet: 720,
  // tablet: 768,
  pc: 1024,
};

export const mediaQuery = (key: keyof typeof device) => {
  return `@media screen and (max-width: ${device[key]}px)`;
};
