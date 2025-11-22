import React, { useEffect, useState } from 'react';
import { Image, ImageProps } from 'react-native';

interface Props {
  source: string | ImageProps['source'];
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const CustomImage: React.FC<Props> = ({
  source,
  width,
  height,
  resizeMode = 'contain',
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handle string URLs
    if (typeof source === 'string') {
      Image.getSize(
        source,
        (imageWidth, imageHeight) => {
          setImageDimensions({ width: imageWidth, height: imageHeight });
        },
        error => {
          console.error('Failed to get image size:', error);
        }
      );
    }
    // Handle local images (require())
    else if (typeof source === 'number') {
      try {
        const resolved = Image.resolveAssetSource(source);
        if (resolved) {
          setImageDimensions({
            width: resolved.width,
            height: resolved.height,
          });
        }
      } catch (error) {
        console.warn('Failed to resolve local image:', error);
      }
    }
    // Handle {uri: string} format
    else if (
      source &&
      typeof source === 'object' &&
      'uri' in source &&
      source.uri
    ) {
      Image.getSize(
        source.uri,
        (imageWidth, imageHeight) => {
          setImageDimensions({ width: imageWidth, height: imageHeight });
        },
        error => {
          console.error('Failed to get image size:', error);
        }
      );
    }
  }, [source]);

  // Calculate final dimensions
  const getFinalDimensions = () => {
    const { width: imgWidth, height: imgHeight } = imageDimensions;

    if (imgWidth === 0 || imgHeight === 0) {
      return { width: width || 100, height: height || 100 };
    }

    const aspectRatio = imgWidth / imgHeight;

    // If width is provided but not height, calculate height
    if (width && !height) {
      return { width, height: Math.round(width / aspectRatio) };
    }

    // If height is provided but not width, calculate width
    if (height && !width) {
      return { width: Math.round(height * aspectRatio), height };
    }

    // If both provided, use both
    if (width && height) {
      return { width, height };
    }

    // If neither provided, use original dimensions
    return { width: imgWidth, height: imgHeight };
  };

  const finalDimensions = getFinalDimensions();

  const imageSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <Image
      source={imageSource}
      style={{
        width: finalDimensions.width,
        height: finalDimensions.height,
      }}
      resizeMode={resizeMode}
    />
  );
};

export default CustomImage;
