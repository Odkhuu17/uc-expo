import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';

import { Box, Text, useTheme } from './Theme';

interface Props {
  onPress: () => void;
  image?: number;
  label: string;
  selected: boolean;
}

const SelectOption = ({ onPress, image, label, selected }: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        backgroundColor="white"
        borderRadius="xl"
        py="s"
        px="m"
      >
        <Box flex={1} flexDirection="row" alignItems="center" gap="s">
          {image && (
            <Image source={image} style={css.img} resizeMode="contain" />
          )}
          <Text variant="body2">{label}</Text>
        </Box>
        {selected && (
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={theme.icon.m}
            color={theme.colors.primary}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

const css = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
  },
});

export default SelectOption;
