import React, { Dispatch, SetStateAction, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft2, Location } from 'iconsax-react-nativejs';

import { Button, Marquee } from '@/components';
import { Box, Text, useTheme } from '@/components/Theme';
import {
  SearchAddressQuery,
  useSearchAddressLazyQuery,
} from '@/gql/query/searchAddressQuery.generated';
import MapPin from './MapPin';

interface Props {
  title: string;
  location: NonNullable<SearchAddressQuery['searchAddress']>[0] | null;
  setLocation: Dispatch<
    SetStateAction<NonNullable<SearchAddressQuery['searchAddress']>[0] | null>
  >;
}

const Step2 = ({ title, location, setLocation }: Props) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [localLocation, setLocalLocation] = useState<
    NonNullable<SearchAddressQuery['searchAddress']>[0] | null
  >(location);
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
    setLocalLocation(data?.searchAddress?.[0] || null);
  };

  const onSubmit = async () => {
    setLocation(localLocation);
  };

  return (
    <>
      <MapView
        style={css.map}
        initialRegion={{
          latitude: location?._source?.location.lat || 47.92123,
          longitude: location?._source?.location.lon || 106.918556,
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
            <TouchableOpacity>
              <Box
                flexDirection="row"
                alignItems="center"
                p="m"
                gap="s"
                borderBottomWidth={1}
                borderColor="border"
              >
                <ArrowLeft2 size={theme.icon.m} />
                <Text fontFamily="Roboto_500Medium">{title}</Text>
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
                  <Location size={theme.icon.l} color={theme.colors.baseBlue} />
                )}
                <Box flex={1} gap="xs">
                  <Marquee duration={5000}>
                    <Text paddingRight="xl" variant="body2" color="grey2">
                      {localLocation?._source?.nameFullMn || ''}
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

export default Step2;
