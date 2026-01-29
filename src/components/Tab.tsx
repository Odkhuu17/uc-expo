import { StyleSheet, TouchableOpacity } from 'react-native';

import { Box, Text } from './Theme';

interface Props {
  tabs: string[];
  onPressTab: (index: number) => void;
  activeIndex?: number;
}

const Tab = ({ tabs, onPressTab, activeIndex }: Props) => {
  return (
    <Box flexDirection="row" gap="s" backgroundColor="bg" py="s">
      {tabs.map((tab, index) => {
        const onPress = () => {
          console.log(index);
          onPressTab(index);
        };

        return (
          <TouchableOpacity style={css.button} key={index} onPress={onPress}>
            <Box
              py="s"
              flex={1}
              borderBottomWidth={3}
              borderColor={activeIndex === index ? 'primary' : 'transparent'}
              alignItems="center"
            >
              <Text variant="body2">{tab}</Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const css = StyleSheet.create({
  button: {
    flex: 1,
  },
});
export default Tab;
