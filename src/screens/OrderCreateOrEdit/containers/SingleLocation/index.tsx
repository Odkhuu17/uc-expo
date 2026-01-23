import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { PencilEdit02Icon } from '@hugeicons/core-free-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Box, Text, useTheme } from '@/components/Theme';
import { Marquee } from '@/components';
import LocationModal from './LocationModal';
import ChooseFromMap from './ChooseFromMap';

interface Props {
  title: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  loading?: boolean;
  isRent?: boolean;
  setLocation: Dispatch<
    SetStateAction<
      | {
          lat: number;
          lng: number;
          address: string;
        }
      | undefined
    >
  >;
}

const SingleLocation = ({
  location,
  title,
  isRent,
  setLocation,
  loading,
}: Props) => {
  const theme = useTheme();
  const modalRef = useRef<BottomSheetModal | null>(null);
  const [showChooseFromMap, setShowChooseFromMap] = useState(false);

  const onPress = () => {
    modalRef.current?.present();
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Box flexDirection="row" alignItems="center" gap="xs">
          {loading ? (
            <Box
              height={theme.icon.l}
              width={theme.icon.l}
              justifyContent="center"
              alignItems="center"
            >
              <ActivityIndicator />
            </Box>
          ) : (
            <HugeiconsIcon
              icon={PencilEdit02Icon}
              size={theme.icon.l}
              color={theme.colors.black}
            />
          )}
          <Box flex={1} gap="xs">
            <Text color="black" variant="label">
              {title}
            </Text>
            <Marquee duration={5000}>
              <Text paddingRight="xl" variant="body2" color="grey4">
                {location?.address || ''}
              </Text>
            </Marquee>
          </Box>
        </Box>
      </TouchableOpacity>
      <LocationModal
        setShowChooseFromMap={setShowChooseFromMap}
        title={title}
        ref={modalRef}
        setLocation={setLocation}
        location={location}
        isRent={isRent}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showChooseFromMap}
      >
        <ChooseFromMap
          title={title}
          setShowChooseFromMap={setShowChooseFromMap}
          setLocation={setLocation}
          location={location}
        />
      </Modal>
    </>
  );
};

export default SingleLocation;
