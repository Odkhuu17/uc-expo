import { Dispatch, SetStateAction } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Delete03Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

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

  const checkAndRequestCameraPermission = async (): Promise<boolean> => {
    const permission = PERMISSIONS.IOS.CAMERA;
    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult === RESULTS.GRANTED) {
        return true;
      } else if (requestResult === RESULTS.BLOCKED) {
        showSettingsAlert('камер');
        return false;
      }
      return false;
    } else if (result === RESULTS.BLOCKED) {
      showSettingsAlert('камер');
      return false;
    }
    return false;
  };

  const checkAndRequestPhotoLibraryPermission = async (): Promise<boolean> => {
    const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    const result = await check(permission);

    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (
        requestResult === RESULTS.GRANTED ||
        requestResult === RESULTS.LIMITED
      ) {
        return true;
      } else if (requestResult === RESULTS.BLOCKED) {
        showSettingsAlert('зургийн сан');
        return false;
      }
      return false;
    } else if (result === RESULTS.BLOCKED) {
      showSettingsAlert('зургийн сан');
      return false;
    }
    return false;
  };

  const showSettingsAlert = (permissionType: string) => {
    Alert.alert(
      `${
        permissionType.charAt(0).toUpperCase() + permissionType.slice(1)
      }ийн зөвшөөрөл хэрэгтэй`,
      `Та тохиргоо руу орж ${permissionType}ийн зөвшөөрөл олгоно уу.`,
      [
        {
          text: 'Буцах',
          style: 'cancel',
        },
        {
          text: 'Тохиргоо руу очих',
          onPress: () => openSettings(),
        },
      ],
    );
  };

  const onLaunchCamera = async () => {
    const hasPermission = await checkAndRequestCameraPermission();
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: 'video',
      cameraType: 'back',
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

  const onLauncImageLibrary = async () => {
    const hasPermission = await checkAndRequestPhotoLibraryPermission();
    if (!hasPermission) return;

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
