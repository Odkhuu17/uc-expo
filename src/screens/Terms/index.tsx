import { Container, HeaderNormal, ContentScrollable } from '@/components';

const Terms = () => {
  return (
    <Container>
      <HeaderNormal title="Үйлчилгээний нөхцөл" hasBack />
      <ContentScrollable edges={['bottom']}>
        <Terms />
      </ContentScrollable>
    </Container>
  );
};

export default Terms;
