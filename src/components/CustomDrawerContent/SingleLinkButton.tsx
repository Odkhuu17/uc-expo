import { Link } from 'expo-router';
import { Icon as IconType } from 'iconsax-react-nativejs';
import type { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

import RoundIcon from '../RoundIcon';
import { Box, Text } from '../Theme';

interface Props {
  href: ComponentProps<typeof Link>['href'];
  icon: IconType;
  title: string;
}

const SingleLinkButton = ({ href, icon, title }: Props) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity>
        <Box flexDirection="row" alignItems="center" gap="s">
          <RoundIcon
            icon={icon}
            backgroundColor="white"
            borderColor="lightBlue2"
            iconColor="lightBlue2"
            size="m"
          />
          <Text color="white">{title}</Text>
        </Box>
      </TouchableOpacity>
    </Link>
  );
};

export default SingleLinkButton;
