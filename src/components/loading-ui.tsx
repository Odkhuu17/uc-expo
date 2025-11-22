import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content } from '@/components';
import { Box, Text } from '@/components/Theme';

const LoadingUI = () => {
  return (
    <Container>
      <Content edges={['bottom']} scrollable>
        <Box flex={1} justifyContent="center" alignItems="center" gap="m">
          <ActivityIndicator size="large" color="#0066CC" />
          <Text variant="body1" color="grey">
            Ачаалж байна...
          </Text>
        </Box>
      </Content>
    </Container>
  );
};

export default LoadingUI;
