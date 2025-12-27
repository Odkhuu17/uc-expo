import { Dispatch, SetStateAction } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Delete03Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { BoxContainer, ButtonIcon, Loader } from '@/components';
import { Box, useTheme } from '@/components/Theme';
import InputLabel from '@/components/InputLabel';
import { useAttachOrderVideoMutation } from '@/gql/mutations/attachOrderVideo.generated';
import { videoToFile } from '@/utils/fileHelpers';
import { useDestroyOrderVideoMutation } from '@/gql/mutations/destroyOrderVideo.generated';

interface Props {
  number: string;
  label: string;
  video: string | null;
  setVideo: Dispatch<SetStateAction<string | null>>;
  isRequired?: boolean;
}

const InputVideo = ({ video, setVideo, label, isRequired, number }: Props) => {
  const [attachOrderVideo, { loading }] = useAttachOrderVideoMutation();
  const [destroyOrderVideo, { loading: destroying }] =
    useDestroyOrderVideoMutation();

  const theme = useTheme();
  const onLaunchCamera = async () => {
    const result = await launchCamera({
      mediaType: 'video',
      cameraType: 'back',
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      setVideo(result.assets[0].uri || null);
    }
  };

  const onLauncImageLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      attachOrderVideo({
        variables: {
          number,
          video: videoToFile(result.assets[0].uri || ''),
        },
      });
    }
  };

  const onPickImage = async () => {
    Alert.alert('Бичлэг оруулах', 'Бичлэг оруулах төрлөө сонгоно уу!', [
      {
        text: 'Камер нээх',
        onPress: onLaunchCamera,
      },
      {
        text: 'Бичлэг сонгох',
        onPress: onLauncImageLibrary,
      },
      { text: 'Буцах', style: 'cancel' },
    ]);
  };

  const onDeleteVideo = () => {
    setVideo(null);
  };

  return (
    <Box>
      <InputLabel label={label} isRequired={isRequired} />
      <BoxContainer
        borderWidth={2}
        borderStyle="dashed"
        borderRadius="m"
        height={100}
        p={undefined}
      >
        {video ? (
          <Box width="100%" height="100%">
            <Box overflow="hidden" borderRadius="s" width="100%" height="100%">
              <Image
                source={{ uri: video }}
                style={css.img}
                resizeMode="contain"
              />
            </Box>
            {destroying ? (
              <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                alignItems="center"
                justifyContent="center"
                backgroundColor='backdrop'
              >
                <Loader color={theme.colors.white} />
              </Box>
            ) : (
              <Box
                position="absolute"
                top={theme.spacing.m}
                right={theme.spacing.m}
              >
                <ButtonIcon icon={Delete03Icon} onPress={onDeleteVideo} />
              </Box>
            )}
          </Box>
        ) : (
          <TouchableOpacity onPress={onPickImage}>
            <Box
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              gap="s"
              p="m"
            >
              {loading ? (
                <Loader />
              ) : (
                <HugeiconsIcon icon={PlusSignIcon} size={theme.icon.m} />
              )}
            </Box>
          </TouchableOpacity>
        )}
      </BoxContainer>
    </Box>
  );
};

const css = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});

export default InputVideo;
