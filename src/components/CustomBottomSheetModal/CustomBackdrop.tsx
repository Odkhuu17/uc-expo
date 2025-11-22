import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const CustomBackdrop = ({ ...props }: BottomSheetDefaultBackdropProps) => {
  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.6}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  );
};

export default CustomBackdrop;
