import {
  BoxContainer,
  Container,
  ContentScrollable,
  HeaderNormal,
} from '@/components';
import { Box, Text } from '@/components/Theme';

const Notifications = () => {
  return (
    <Container>
      <HeaderNormal title="Мэдэгдлүүд" hasBack />
      <ContentScrollable edges={['bottom']}>
        <Box flex={1} gap="m">
          {Array.from({ length: 20 }).map((_, index) => (
            <BoxContainer key={index}>
              <Text variant="body2">Мэдэгдэл {index + 1}</Text>
            </BoxContainer>
          ))}
        </Box>
      </ContentScrollable>
    </Container>
  );
};

export default Notifications;
