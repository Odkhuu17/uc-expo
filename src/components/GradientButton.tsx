import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';

import { Text, makeStyles } from './Theme';

interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
  colors?: [string, string, string];
  locations?: [number, number, number];
  fontSize?: number;
  textStyle?: TextStyle;
}

const GradientButton = ({
  title,
  subtitle,
  onPress,
  style,
  disabled = false,
  colors = ['#003A91', '#1265FF', '#00235C'],
  locations = [0.0364, 0.4964, 1.0],
  fontSize,
  textStyle,
}: Props) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, style]}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        locations={locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.gradientButton, disabled && { opacity: 0.6 }]}
      >
        <Text
          style={[
            styles.buttonText,
            fontSize ? { fontSize } : undefined,
            textStyle,
          ]}
        >
          {title}
        </Text>
        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: '100%',
  },
  gradientButton: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.buttonPaddingHorizontal,
    borderRadius: theme.borderRadii.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: theme.textVariants.error.fontSize,
    fontWeight: '400',
    fontFamily: theme.textVariants.button.fontFamily,
  },
  subtitleText: {
    color: theme.colors.white,
    fontSize: theme.textVariants.button2.fontSize,
    fontWeight: '400',
    fontFamily: theme.textVariants.button2.fontFamily,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
}));

export default GradientButton;
