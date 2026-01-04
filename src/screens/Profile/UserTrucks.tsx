import { ContainerTruck01Icon } from '@hugeicons/core-free-icons';
import { useNavigation } from '@react-navigation/native';

import { BoxContainer, Warning } from '@/components';
import { useAppSelector } from '@/redux/hooks';
import { Box } from '@/components/Theme';
import { INavigation } from '@/navigations';
import { GetMeQuery } from '@/gql/queries/getMe.generated';
import { SingleMenu } from './components';

interface Props {
  userData: GetMeQuery['me'];
}

const UserTrucks = ({ userData }: Props) => {
  const { mode } = useAppSelector(state => state.general);
  const navigation = useNavigation<INavigation>();
  const hasVerifiedTruck = userData?.trucks?.some(truck => truck.verified);

  const onPressMyTrucks = () => {
    navigation.navigate('TrucksMy');
  };

  if (mode === 'driver') {
    return (
      <BoxContainer gap="m">
        <Box gap="m">
          <SingleMenu
            title="Миний машин"
            icon={ContainerTruck01Icon}
            onPress={onPressMyTrucks}
          />
          {!hasVerifiedTruck && (
            <Warning description="Танд баталгаажсан машин байхгүй байна! Та машинаа баталгаажуулсны дараагаар манай системийг ашиглах боломжтой." />
          )}
        </Box>
      </BoxContainer>
    );
  }

  return null;
};

export default UserTrucks;
