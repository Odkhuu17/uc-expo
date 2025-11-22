import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { ReactNode, RefObject, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomBackdrop from './CustomBackdrop';

interface Props extends BottomSheetModalProps {
  ref: RefObject<BottomSheetModal | null>;
  children: ReactNode;
}

const CustomBottomSheetModal = ({ children, ...props }: Props) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['100%'], []);

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      enablePanDownToClose
      topInset={insets.top}
      enableDynamicSizing={false}
      backdropComponent={CustomBackdrop}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default CustomBottomSheetModal;
