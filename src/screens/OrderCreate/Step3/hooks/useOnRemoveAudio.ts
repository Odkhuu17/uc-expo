import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

interface Props {
  setAudio: Dispatch<SetStateAction<string>>;
}

const useOnRemoveAudio = ({ setAudio }: Props) => {
  const onRemoveAudio = ({ onConfirm }: { onConfirm?: () => void }) => {
    Alert.alert('Дуу хоолойг устгах', 'Та устгахдаа итгэлтэй байна уу?', [
      {
        text: 'Буцах',
        style: 'cancel',
      },
      {
        text: 'Устгах',
        style: 'destructive',
        onPress: () => {
          setAudio('');
          if (onConfirm) {
            onConfirm();
          }
        },
      },
    ]);
  };

  return { onRemoveAudio };
};

export default useOnRemoveAudio;
