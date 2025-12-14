/**
 * Create a ReactNativeFile-like object for uploading
 * @param uri - Local file URI
 * @param filename - Name for the file
 * @param mimeType - MIME type of the file
 * @returns ReactNativeFile-like object
 */
class ReactNativeFile {
  uri: string;
  name: string;
  type: string;

  constructor({
    uri,
    name,
    type,
  }: {
    uri: string;
    name: string;
    type: string;
  }) {
    this.uri = uri;
    this.name = name;
    this.type = type;
  }
}

/**
 * Convert a local file URI to a ReactNativeFile object for uploading
 * @param uri - Local file URI (e.g., from expo-image-picker or expo-audio)
 * @param filename - Name for the file
 * @param mimeType - MIME type of the file
 * @returns ReactNativeFile object ready for upload
 */
export const uriToFile = (uri: string, filename: string, mimeType: string) => {
  return new ReactNativeFile({
    uri,
    name: filename,
    type: mimeType,
  });
};

/**
 * Convert an array of image URIs to ReactNativeFile objects
 * @param uris - Array of local image URIs
 * @returns Array of ReactNativeFile objects
 */
export const imagesToFiles = (uris: string[]) => {
  return uris.map((uri, index) =>
    uriToFile(uri, `image_${Date.now()}_${index}.jpg`, 'image/jpeg')
  );
};

export const imageToFile = (uri: string) => {
  if (!uri) return null;
  return uriToFile(uri, `image_${Date.now()}.jpg`, 'image/jpeg');
};

/**
 * Convert a video URI to a ReactNativeFile object
 * @param uri - Local video URI
 * @returns ReactNativeFile object or null if URI is empty
 */
export const videoToFile = (uri: string) => {
  if (!uri) return null;
  return uriToFile(uri, `video_${Date.now()}.mp4`, 'video/mp4');
};

/**
 * Convert an audio URI to a ReactNativeFile object
 * @param uri - Local audio URI
 * @returns ReactNativeFile object or null if URI is empty
 */
export const audioToFile = (uri: string) => {
  if (!uri) return null;
  return uriToFile(uri, `audio_${Date.now()}.m4a`, 'audio/mp4');
};
