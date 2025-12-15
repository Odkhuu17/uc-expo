import { useRouter } from 'expo-router';
import { Box as BoxIcon, Truck, UserOctagon } from 'iconsax-react-nativejs';

import {
  BoxContainer,
  Container,
  Content,
  NormalHeader,
  Warning,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { useAppSelector } from '@/redux/hooks';
import SingleMenu from './SingleMenu';

const ProfileScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { mode } = useAppSelector(state => state.general);
  const { user } = useAppSelector(state => state.auth);

  const hasVerifiedTruck = user?.trucks?.some(truck => truck.verified);

  return (
    <Container>
      <NormalHeader
        title="Миний мэдээлэл"
        hasBack
        noMenu={!hasVerifiedTruck && mode === 'driver'}
      />
      <Content edges={[]}>
        <Box gap="m">
          <BoxContainer flexDirection="row" alignItems="center" gap="m">
            <UserOctagon size={theme.icon.l} />
            <Box>
              <Text variant="header" numberOfLines={1}>
                {`${user?.lastName}`} {user?.firstName}
              </Text>
              <Text variant="body1" opacity={0.8}>
                {user?.mobile}
              </Text>
            </Box>
          </BoxContainer>
          <BoxContainer>
            {mode === 'shipper' && (
              <SingleMenu
                title="Миний захиалгууд"
                icon={BoxIcon}
                onPress={() => router.navigate('/profile/orders')}
              />
            )}
            {mode === 'driver' && (
              <>
                {!hasVerifiedTruck && (
                  <Box gap="s" pb="m">
                    <Warning description="Танд бүртгэлтэй машин байхгүй байна! Та машин нэмсний дараагаар манай системийг ашиглах боломжтой." />
                  </Box>
                )}
                <SingleMenu
                  title="Миний машин"
                  icon={Truck}
                  onPress={() => router.navigate('/profile/trucks')}
                />
              </>
            )}
          </BoxContainer>
        </Box>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
