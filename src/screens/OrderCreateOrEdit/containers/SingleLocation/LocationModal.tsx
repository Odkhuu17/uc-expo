import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowRight01Icon, Location05Icon } from '@hugeicons/core-free-icons';
import { useGoogleAutocomplete } from '@appandflow/react-native-google-autocomplete';

import {
  Button,
  ModalBottomSheet,
  Input,
  CustomKeyboardAvoidingView,
} from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface Props {
  ref: RefObject<BottomSheetModal | null>;
  setShowChooseFromMap: Dispatch<SetStateAction<boolean>>;
  setLocation: Dispatch<
    SetStateAction<
      | {
          address: string;
          lat: number;
          lng: number;
        }
      | undefined
    >
  >;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  title: string;
  isRent?: boolean;
}

const LocationModal = ({
  ref,
  setLocation,
  location,
  isRent,
  setShowChooseFromMap,
}: Props) => {
  const theme = useTheme();

  const { locationResults, setTerm, clearSearch, searchDetails, term } =
    useGoogleAutocomplete(GOOGLE_MAPS_API_KEY, {
      language: 'mn',
      debounce: 300,
      queryTypes: 'geocode|establishment',
    });

  useEffect(() => {
    setTerm(location?.address || '');
  }, [location]);

  const onChooseFromMap = () => {
    ref.current?.dismiss();
    setShowChooseFromMap(true);
  };

  return (
    <>
      <ModalBottomSheet ref={ref}>
        <Box px="m">
          <Input
            clearButtonMode="always"
            placeholder="Хаягаа бичих"
            autoFocus
            onChangeText={setTerm}
            value={term}
          />
        </Box>
        <Box p="m">
          {!isRent && (
            <Button
              variant="outlined"
              title="Газрын зургаас сонгох"
              onPress={onChooseFromMap}
            />
          )}
        </Box>
        <CustomKeyboardAvoidingView keyboardVerticalOffset={100}>
          <BottomSheetScrollView keyboardShouldPersistTaps="handled">
            <Box px="m" gap="m">
              {locationResults.map((address, index) => {
                const onPress = async () => {
                  const details = await searchDetails(address.place_id);
                  setLocation({
                    address: details.formatted_address,
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng,
                  });
                  clearSearch();
                  ref.current?.dismiss();
                };

                return (
                  <TouchableOpacity key={index} onPress={onPress}>
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      gap="s"
                      borderBottomWidth={1}
                      borderBottomColor="border"
                      pb="m"
                    >
                      <Box
                        p="s"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="full"
                      >
                        <HugeiconsIcon
                          icon={Location05Icon}
                          size={theme.icon.s}
                        />
                      </Box>
                      <Box flex={1} gap="xs">
                        <Box flex={1}>
                          <Text variant="title" numberOfLines={1}>
                            {address?.structured_formatting?.main_text}
                          </Text>
                        </Box>
                        <Box flex={1}>
                          <Text variant="body2" color="grey4" numberOfLines={1}>
                            {address?.structured_formatting?.secondary_text}
                          </Text>
                        </Box>
                      </Box>
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={theme.icon.m}
                      />
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </BottomSheetScrollView>
        </CustomKeyboardAvoidingView>
      </ModalBottomSheet>
    </>
  );
};

export default LocationModal;
