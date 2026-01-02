import {
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export const theme = createTheme({
  colors: {
    bg: '#f5f5f5',
    border: '#e0e0e0',
    error: '#d50000',
    success: '#00c853',
    primary: '#1265FF',
    pending: '#ffab00',
    secondary: '#45C4FA',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    rent: '#ffab00',
    delivery: '#429AFF',

    white: '#FFFFFF',
    black: '#000000',

    amber1: '#fff8e1',
    amber2: '#ffd740',
    amber3: '#ffc400',
    amber4: '#ffab00',

    red1: '#ff8a80',
    red2: '#ff5252',
    red3: '#ff1744',
    red4: '#d50000',

    grey1: '#f5f5f5',
    grey2: '#e0e0e0',
    grey3: '#bdbdbd',
    grey4: '#616161',

    green1: '#b9f6ca',
    green2: '#69f0ae',
    green3: '#00e676',
    green4: '#00c853',

    blue1: '#82b1ff',
    blue2: '#448aff',
    blue3: '#2979ff',
    blue4: '#1265FF',

    facebook: '#1877F2',

    transparent: 'transparent',
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
    xl2: 40,
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
    defaults: { fontSize: 16 },
    title: {
      fontSize: 16,
      fontWeight: '600',
    },
    body1: { fontSize: 16 },
    body2: {
      fontSize: 14,
    },
    body3: {
      fontSize: 12,
    },
    body4: {
      fontSize: 10,
    },
    error: { fontSize: 14 },
    label: {
      fontSize: 14,
      fontWeight: '600',
    },
    button: { fontSize: 16, fontWeight: '600' },
    button2: { fontSize: 14, fontWeight: '600' },
    button3: { fontSize: 12, fontWeight: '600' },
    header: { fontSize: 16, fontWeight: '600' },
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
