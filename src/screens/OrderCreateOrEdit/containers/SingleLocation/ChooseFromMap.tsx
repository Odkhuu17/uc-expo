import React, { Dispatch, SetStateAction } from 'react';
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowLeft01Icon, Location04Icon } from '@hugeicons/core-free-icons';

import { Button, MapPin, Marquee } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import { useSearchAddressLazyQuery } from '@/gql/queries/searchAddressQuery.generated';

interface Props {
  title: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
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
  setShowChooseFromMap: Dispatch<SetStateAction<boolean>>;
}

const ChooseFromMap = ({
  title,
  location,
  setLocation,
  setShowChooseFromMap,
}: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [searchAddress, { loading }] = useSearchAddressLazyQuery();

  const onRegionChangeComplete = async (region: Region) => {
    const { data } = await searchAddress({
      variables: {
        query: '',
        location: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      },
    });

    if (data?.searchAddress?.[0]) {
      setLocation({
        lat: region.latitude,
        lng: region.longitude,
        address: data?.searchAddress?.[0]?._source.nameMn || '',
      });
    }
  };

  const onSubmit = async () => {
    setShowChooseFromMap(false);
  };

  return (
    <>
      <MapView
        style={css.map}
        initialRegion={{
          latitude: location?.lat || 47.92123,
          longitude: location?.lng || 106.918556,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <Box
        flex={1}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        alignItems="center"
        justifyContent="center"
      >
        <MapPin />
        <Box
          bottom={0}
          position="absolute"
          left={0}
          right={0}
          backgroundColor="white"
        >
          <Box style={{ paddingBottom: insets.bottom }}>
            <TouchableOpacity onPress={() => setShowChooseFromMap(false)}>
              <Box
                flexDirection="row"
                alignItems="center"
                p="m"
                gap="s"
                borderBottomWidth={1}
                borderColor="border"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} />
                <Text variant="title">{title}</Text>
              </Box>
            </TouchableOpacity>
            <Box p="m" gap="m">
              <Box
                flexDirection="row"
                alignItems="center"
                gap="xs"
                borderWidth={1}
                borderRadius="s"
                borderColor="border"
                p="s"
              >
                {loading ? (
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    width={theme.icon.l}
                    height={theme.icon.l}
                  >
                    <ActivityIndicator />
                  </Box>
                ) : (
                  <HugeiconsIcon
                    size={theme.icon.l}
                    icon={Location04Icon}
                    color={theme.colors.primary}
                  />
                )}
                <Box flex={1} gap="xs">
                  <Marquee duration={5000}>
                    <Text paddingRight="xl" variant="body2" color="grey4">
                      {location?.address || ''}
                    </Text>
                  </Marquee>
                </Box>
              </Box>
              <Button title="Үргэлжлүүлэх" onPress={onSubmit} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const css = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChooseFromMap;
