import {
  Container,
  HeaderNormal,
  ContentScrollable,
  Terms,
} from '@/components';

const TermsScreen = () => {
  return (
    <Container>
      <HeaderNormal title="Үйлчилгээний нөхцөл" hasBack />
      <ContentScrollable edges={['bottom']}>
        <Terms />
      </ContentScrollable>
    </Container>
  );
};

export default TermsScreen;
