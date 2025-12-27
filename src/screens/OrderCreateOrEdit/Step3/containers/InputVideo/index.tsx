import { Dispatch, SetStateAction } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Delete03Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { BoxContainer, ButtonIcon, Loader } from '@/components';
import { Box, useTheme } from '@/components/Theme';
import InputLabel from '@/components/InputLabel';
import { useAttachOrderVideoMutation } from '@/gql/mutations/attachOrderVideo.generated';
import { videoToFile } from '@/utils/fileHelpers';
import { useDestroyOrderVideoMutation } from '@/gql/mutations/destroyOrderVideo.generated';
import Video from './Video';

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
      const { data } = await attachOrderVideo({
        variables: {
          number,
          video: videoToFile(result.assets[0].uri || ''),
        },
      });
      setVideo(data?.attachOrderVideo?.video || null);
    }
  };

  const onDestroyVideo = async () => {
    await destroyOrderVideo({ variables: { number } });
    setVideo(null);
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

  return (
    <Box>
      <InputLabel label={label} isRequired={isRequired} />
      <BoxContainer
        borderWidth={2}
        borderStyle="dashed"
        borderRadius="m"
        height={80}
        p={undefined}
        overflow="hidden"
      >
        {loading || destroying ? (
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            backgroundColor="backdrop"
          >
            <Loader color={theme.colors.white} />
          </Box>
        ) : video ? (
          <Box flex={1} flexDirection="row" alignItems="center" px="m">
            <Video video={video} />
            <ButtonIcon icon={Delete03Icon} onPress={onDestroyVideo} />
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
              <HugeiconsIcon icon={PlusSignIcon} size={theme.icon.m} />
            </Box>
          </TouchableOpacity>
        )}
      </BoxContainer>
    </Box>
  );
};

export default InputVideo;
