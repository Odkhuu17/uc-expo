import { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Box } from './Theme';

interface Props {
  children: ReactNode;
  bg?: 'dark-car' | 'light' | 'light-car';
}

const getImage = (bg: Props['bg']) => {
  switch (bg) {
    case 'dark-car':
      return require('assets/images/bg-dark-car.png');
    case 'light-car':
      return require('assets/images/bg-light-car.png');
    case 'light':
    default:
      return require('assets/images/bg-light.png');
  }
};

const Container = ({ children, bg = 'light' }: Props) => {
  if (bg === 'light') {
    return (
      <Box backgroundColor="bg" flex={1}>
        {children}
      </Box>
    );
  }

  return (
    <ImageBackground style={css.imageBackground} source={getImage(bg)}>
      {children}
    </ImageBackground>
  );
};

const css = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
});

export default Container;
