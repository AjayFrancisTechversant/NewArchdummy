const name = {
  white: '#ffffff',
  whiteTint: '#fff',
  black: '#000000',
  secondaryGrey: '#6e6e6e',
  safeBlue: '#128abc',
  lightBlue: '#0179d8',
  blueWhite: '#e8f5fe',
  lightGreen: '#51b943',
  lightGrey: '#b8babe',
  greyWhite: '#e8e8e8',
  openFooterGrey: '#656565',
  openFooterGreen: '#50b842',
  lightDarkGreen: '#6AAC00',
  purple: '#af64b8',
  navyBlue: '#5477b3',
  lightNavyBlue: '#4795e3',
  blue: '#0080e1',
  darkGrey: '#737373',
  courseFooterGrey: '#b3b3b3',
  borderGrey: '#9a9a9a',
  silver: '#C0C0C0',
  red: '#FF0000',
  redWhite: '#FBF9FA',
  redBrown: '#c03d3c',
  littleLightRed: '#f3d9da',
  darkRed: '#bd2828',
  brown: '#b64c45',
  transLusentGray: '#8e8e8e',
  transparent: 'transparent',
  green: '#008000',
  yellow: '#eed202',
  lightSilver: '#f2f2f2',
  lightYellow: '#ffcc00',
  seaBlue: '#b3e0ff',
  goldYellow: '#fcf8e3',
  disable: '#4a4a4a',
  greenWhite: '#d4edda',
  darkGreen: '#1b5927',
  darkYellow: '#ff8e02',
  mediumYellow: '#e0b13d',
  deepRed: '#570303',
  whiteBlue: '#00b8ff',
  skyBlue: '#dbf0fd',
  lightRed: '#f2d5d7',
  whiteGreen: '#c9f3c5',
  gold: '#f1df8d',
  littlelightBlue: '#009ACC',
  lightdarkYellow: '#F5C74D',
  lightwhiteYellow: '#F4DFA7',
  darkBrown: '#848382',
  lightGray: '#F0F0F0',
  lightMediumGrey: '#D8D8D8',
  darkPink: '#C45858',
  lightMediumDarkGrey: '#C5C5C5',
  darkSkyBlue: '#039CCB',
  littleLightGrey: '#eeeeee',
  violet: '#6c40d5',
  deepGrey: '#383838',
  lightTransBlack: '#00000035',
  mediumTransBlack: '#00000050',
  darkTransBlack: '#00000080',
  transBlack: 'rgba(0,0,0,0.8)',
  greyLightest: '#efefef',
  whiteMediumTrans: '#ffffff99',
  whiteGray: '#F9F9F9',
  veryLightBlue: '#A8DDED',
  lightBg: '#F9F9F9',
  lightYellowBg: '#EBC501',
  lightWhiteIcon: '#F5E37F',
  lightPurple: '#3d62a6',
  whitePurple: '#aabad4',
  gray: '#DDDDDD',
  DarkTextGray: '#636363',
  mediumGreen: '#6AAC00',
};

const theme = {
  backgroundPrimary: name.white,
  backgroundSecondary: name.black,
  appPrimary: name.lightBlue,
  appSecondary: name.safeBlue,
};

// Primitive Colors - Should never change and never be used directly.
const primitive = {
  red: {
    0: '#FFF2F2',
    50: '#FDD4D4',
    100: '#FBB7B7',
    150: '#F99A9A',
    200: '#F77E7E',
    300: '#E95B5B',
    400: '#DA3D3D',
    500: '#CC2222',
    600: '#A43232',
    700: '#FDD4D4',
    800: '#553232',
    900: '#2D2121',
  },
  blue: {
    0: '#F2FCFF',
    50: '#C9EFFA',
    100: '#A1E2F6',
    150: '#7BD7F1',
    200: '#56CBEC',
    300: '#26B1DC',
    400: '#009ACB',
    500: '#047AAC',
    600: '#095F8C',
    700: '#0D476D',
    800: '#0E324E',
    900: '#0C1E2F',
  },
  green: {
    0: '#FAFFF2',
    50: '#DDF1BA',
    100: '#C2E387',
    150: '#ABD559',
    200: '#97C730',
    300: '#6BAC00',
    400: '#399300',
    500: '#167B00',
    600: '#016200',
    700: '#004A0B',
    800: '#00310E',
    900: '#00190A',
  },
  yellow: {
    0: '#FFFFC2',
    50: '#FCEFC1',
    100: '#F9E291',
    150: '#F5D561',
    200: '#F2C934',
    300: '#E2B203',
    400: '#C29C14',
    500: '#A1851F',
    600: '#816D24',
    700: '#615424',
    800: '#41391E',
    900: '#201D12',
  },
  orange: {
    0: '#FFFAF2',
    50: '#FFECF7',
    100: '#FFDEAB',
    150: '#FFD086',
    200: '#FFC162',
    300: '#F6A62F',
    400: '#EA8D00',
    500: '#C37900',
    600: '#9C6300',
    700: '#754C00',
    800: '#4E3400',
    900: '#271B00',
  },
  indigo: {
    0: '#F2F7FF',
    50: '#D9E4F8',
    100: '#C1D2F0',
    150: '#AAC1E9',
    200: '#94B1E2',
    300: '#7092CE',
    400: '#5378BB',
    500: '#3D63A7',
    600: '#2F4F87',
    700: '#233C67',
    800: '#182947',
    900: '#0E1728',
  },
  violet: {
    0: '#FBF2FF',
    50: '#EEDCF7',
    100: '#E1C8EE',
    150: '#D5B4E6',
    200: '#CAA1DE',
    300: '#B181C9',
    400: '#9B66B5',
    500: '#815099',
    600: '#693E7E',
    700: '#512F62',
    800: '#3A2147',
    900: '#23142B',
  },
  neutrals: {
    0: '#FEFFFF',
    50: '#F8F8F9',
    100: '#F2F2F2',
    150: '#E5E5E6',
    200: '#CCCCCC',
    300: '#B2B2B3',
    400: '#999999',
    500: '#814F99',
    600: '#666666',
    700: '#4D4C4C',
    800: '#333333',
    900: '#191919',
  },
};

// Tokens to use for colors - DO NOT UPDATE THIS UNLESS CHECKED WITH UX/UI TEAM

const text = {
  default: primitive.neutrals[900],
  defaultOnSurface: primitive.neutrals[0],
  primary: primitive.blue[500],
  primaryAlt: primitive.indigo[400],
  secondary: primitive.neutrals[600],
  secondaryLight: primitive.neutrals[400],
  success: primitive.green[500],
  error: primitive.red[500],
  notice: primitive.orange[500],
  warning: primitive.yellow[500],
};

const surface = {
  default: primitive.neutrals[0],
  defaultInverse: primitive.neutrals[900],
  defaultAlt: `${primitive.neutrals[0]}90`,
  disabled: primitive.neutrals[100],
  disabledDark: primitive.neutrals[300],

  primary: primitive.blue[500],
  primaryLight: primitive.blue[300],
  primaryLighter: primitive.blue[50],
  primaryLightest: primitive.blue[0],
  primaryDark: primitive.blue[600],
  primaryDarker: primitive.blue[700],
  primaryDarkest: primitive.blue[800],

  primaryAlt: primitive.indigo[500],
  primaryAltLight: primitive.indigo[300],
  primaryAltLighter: primitive.indigo[50],
  primaryAltLightest: primitive.indigo[0],
  primaryAltDark: primitive.indigo[600],
  primaryAltDarker: primitive.indigo[700],
  primaryAltDarkest: primitive.indigo[800],

  secondary: primitive.neutrals[600],
  secondaryLight: primitive.neutrals[400],
  secondaryLighter: primitive.neutrals[150],
  secondaryLightest: primitive.neutrals[100],

  success: primitive.green[500],
  successLight: primitive.green[300],
  successLighter: primitive.green[50],
  successLightest: primitive.green[0],
  successDark: primitive.green[600],
  successDarker: primitive.green[700],
  successDarkest: primitive.green[800],

  error: primitive.red[500],
  errorLight: primitive.red[300],
  errorLighter: primitive.red[50],
  errorLightest: primitive.red[0],
  errorDark: primitive.red[600],
  errorDarker: primitive.red[700],
  errorDarkest: primitive.red[800],

  notice: primitive.orange[500],
  noticeLight: primitive.orange[300],
  noticeLighter: primitive.orange[50],
  noticeLightest: primitive.orange[0],
  noticeDark: primitive.orange[600],
  noticeDarker: primitive.orange[700],
  noticeDarkest: primitive.orange[800],

  warning: primitive.yellow[500],
  warningLight: primitive.yellow[300],
  warningLighter: primitive.yellow[50],
  warningLightest: primitive.yellow[0],
  warningDark: primitive.yellow[600],
  warningDarker: primitive.yellow[700],
  warningDarkest: primitive.yellow[800],

  transparent: 'transparent',
  overlay: `${primitive.neutrals[900]}50`,
};

const icon = {
  default: primitive.neutrals[700],
  defaultLight: primitive.neutrals[300],
  defaultInverse: `${primitive.neutrals[0]}90`,
  defaultAlt: primitive.neutrals[0],
  primary: primitive.blue[400],
  primaryInverse: primitive.blue[150],
  primaryAlt: primitive.indigo[400],
  primaryAltInverse: primitive.indigo[150],
  secondary: primitive.neutrals[600],
  success: primitive.green[500],
  successInverse: primitive.green[150],
  error: primitive.red[500],
  errorInverse: primitive.red[200],
  notice: primitive.orange[500],
  noticeInverse: primitive.orange[200],
  warning: primitive.yellow[400],
  warningInverse: primitive.yellow[150],
  disabled: primitive.neutrals[300],
};

const stroke = {
  default: primitive.neutrals[300],
  defaultBold: primitive.neutrals[700],
  primary: primitive.blue[400],
  primaryLighter: primitive.blue[50],
  primaryAlt: primitive.indigo[400],
  secondary: primitive.neutrals[600],
  success: primitive.green[400],
  error: primitive.red[500],
  notice: primitive.orange[500],
  warning: primitive.yellow[500],
};

export const Colors = {
  name,
  theme,
  text,
  surface,
  icon,
  stroke,
};
