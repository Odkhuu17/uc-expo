import {
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export const theme = createTheme({
  colors: {
    bg: '#EAEAEA',
    border: '#DADADA',
    lightBlue: '#45C4FA',
    lightBlue2: '#429AFF',
    darkBlue: '#00235C',
    baseBlue: '#1265FF',
    // Gradient colors
    gradientBlue1: '#003A91',
    gradientBlue2: '#1265FF',
    gradientBlue3: '#00235C',
    white: '#fff',
    black: '#000',
    grey: '#DDDDDD',
    grey2: '#838383',
    grey3: '#DADADA',
    grey4: '#323232',
    darkGrey: '#101D25',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    red: '#DC2626',
    green: '#52C41A',
    greenLight: '#d0fae5',
    transparent: 'transparent',
    error: '#DC2626',
    success: '#52C41A',
    warning: '#FAAD14',
  },
  gradients: {
    primary: ['#003A91', '#1265FF'] as const,
    primaryLocations: [0, 1] as const,
  },
  spacing: {
    xs2: 3,
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 25,
    xl2: 50,
    xl3: 70,
  },
  borderRadii: {
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 25,
    xl2: 33,
    xl3: 40,
    full: 999,
  },
  icon: {
    s: 15,
    m: 20,
    l: 25,
    xl: 35,
    xl2: 50,
  },
  button: {
    s: 30,
    m: 40,
    l: 60,
  },
  textVariants: {
    defaults: { fontSize: 16, fontFamily: 'Roboto_400Regular' },
    body1: { fontSize: 16, fontFamily: 'Roboto_400Regular' },
    body2: {
      fontSize: 14,
      fontFamily: 'Roboto_400Regular',
    },
    body3: {
      fontSize: 12,
      fontFamily: 'Roboto_400Regular',
    },
    body4: {
      fontSize: 10,
      fontFamily: 'Roboto_400Regular',
    },
    error: { fontSize: 14, fontFamily: 'Roboto_400Regular' },
    label: {
      fontSize: 14,
      fontFamily: 'Roboto_500Medium',
    },
    button: { fontSize: 16, fontFamily: 'Roboto_500Medium' },
    button2: { fontSize: 12, fontFamily: 'Roboto_400Regular' },
    heading: { fontSize: 25, fontFamily: 'Roboto_700Bold' },
    header: { fontSize: 16, fontFamily: 'Roboto_500Medium' },
  },
  breakpoints: { phone: 0, tablet: 600 },
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
