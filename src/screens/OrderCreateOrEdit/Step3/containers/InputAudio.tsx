import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import {
  Delete03Icon,
  Mic01FreeIcons,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from '@hugeicons/core-free-icons';
// import {
//   AudioContext,
//   AudioManager,
//   AudioRecorder,
// } from 'react-native-audio-api';

import { BoxContainer, ButtonIcon, Loader } from '@/components';
import InputLabel from '@/components/InputLabel';
import { Box, Text, useTheme } from '@/components/Theme';
import { useAttachOrderAudioMutation } from '@/gql/mutations/attachOrderAudio.generated';
import { useDestroyOrderAudioMutation } from '@/gql/mutations/destroyOrderAudio.generated';
import { formatDuration } from '@/utils/helpers';

interface Props {
  audio: string | null;
  setAudio: Dispatch<SetStateAction<string | null>>;
  label: string;
  isRequired?: boolean;
  number: string;
}

const InputAudio = () => {
  return <></>;
};

// const InputAudio = ({ audio, setAudio, label, isRequired, number }: Props) => {
//   const [attachOrderAudio, { loading }] = useAttachOrderAudioMutation();
//   const [destroyOrderAudio, { loading: destroying }] =
//     useDestroyOrderAudioMutation();

//   const theme = useTheme();

//   const audioContextRef = useRef<AudioContext | null>(null);
//   const sourceRef = useRef<any | null>(null);
//   const bufferRef = useRef<any | null>(null);
//   const recordedBufferRef = useRef<any | null>(null);

//   const startTimeRef = useRef<number>(0);
//   const pauseTimeRef = useRef<number>(0);
//   const animationFrameRef = useRef<number | null>(null);

//   const recorderRef = useRef<AudioRecorder | null>(null);
//   const recordedChunksRef = useRef<Float32Array[][]>([]);
//   const totalFramesRef = useRef<number>(0);
//   const sampleRateRef = useRef<number>(44100);
//   const channelCountRef = useRef<number>(1);

//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isSeeking, setIsSeeking] = useState(false);
//   const [loadingBuffer, setLoadingBuffer] = useState(false);

//   const stopPlayback = () => {
//     if (sourceRef.current) {
//       try {
//         sourceRef.current.stop();
//       } catch {
//         // ignore
//       }
//       sourceRef.current = null;
//     }
//     if (animationFrameRef.current) {
//       cancelAnimationFrame(animationFrameRef.current);
//       animationFrameRef.current = null;
//     }
//     setIsPlaying(false);
//   };

//   const resetPlayback = () => {
//     stopPlayback();
//     pauseTimeRef.current = 0;
//     setCurrentTime(0);
//   };

//   const ensureAudioContext = () => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new AudioContext({
//         sampleRate: sampleRateRef.current,
//       });
//     }
//     return audioContextRef.current;
//   };

//   const updateProgress = () => {
//     if (!audioContextRef.current || !isPlaying || isSeeking) return;
//     const elapsed =
//       audioContextRef.current.currentTime -
//       startTimeRef.current +
//       pauseTimeRef.current;
//     setCurrentTime(elapsed);
//     if (elapsed >= duration) {
//       resetPlayback();
//       return;
//     }
//     animationFrameRef.current = requestAnimationFrame(updateProgress);
//   };

//   useEffect(() => {
//     if (isPlaying && !isSeeking) {
//       animationFrameRef.current = requestAnimationFrame(updateProgress);
//     }
//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//         animationFrameRef.current = null;
//       }
//     };
//   }, [isPlaying, isSeeking, duration]);

//   useEffect(() => {
//     const loadRemoteAudio = async () => {
//       if (!audio) return;
//       setLoadingBuffer(true);
//       try {
//         const ctx = ensureAudioContext();

//         // HTTP(S) urls: fetch -> decodeAudioData(ArrayBuffer)
//         // file paths: decodeAudioData(filePath)
//         if (audio.startsWith('http://') || audio.startsWith('https://')) {
//           const response = await fetch(audio);
//           const arrayBuffer = await response.arrayBuffer();
//           const decoded = await ctx.decodeAudioData(arrayBuffer);
//           bufferRef.current = decoded;
//           setDuration(decoded.duration);
//         } else {
//           const filePath = audio.startsWith('file://')
//             ? audio.replace('file://', '')
//             : audio;
//           const decoded = await ctx.decodeAudioData(filePath);
//           bufferRef.current = decoded;
//           setDuration(decoded.duration);
//         }
//       } catch (e) {
//         console.error('Error loading audio:', e);
//       } finally {
//         setLoadingBuffer(false);
//       }
//     };

//     loadRemoteAudio();
//   }, [audio]);

//   useEffect(() => {
//     return () => {
//       stopPlayback();
//       if (audioContextRef.current) {
//         audioContextRef.current.close();
//         audioContextRef.current = null;
//       }
//       if (isRecording) {
//         try {
//           recorderRef.current?.stop();
//         } catch {
//           // ignore
//         }
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const buildRecordedBuffer = () => {
//     const ctx = ensureAudioContext();
//     const channels = channelCountRef.current;
//     const totalFrames = totalFramesRef.current;
//     const sampleRate = sampleRateRef.current;
//     if (totalFrames <= 0) return null;

//     const out = ctx.createBuffer(channels, totalFrames, sampleRate);
//     for (let ch = 0; ch < channels; ch += 1) {
//       const chunks = recordedChunksRef.current[ch] || [];
//       const merged = new Float32Array(totalFrames);
//       let offset = 0;
//       for (const chunk of chunks) {
//         merged.set(chunk, offset);
//         offset += chunk.length;
//       }
//       out.copyToChannel(merged, ch, 0);
//     }
//     return out;
//   };

//   const onDeleteAudio = async () => {
//     resetPlayback();

//     // If user recorded locally (not uploaded yet)
//     if (recordedBufferRef.current) {
//       recordedBufferRef.current = null;
//       recordedChunksRef.current = [];
//       totalFramesRef.current = 0;
//       setDuration(0);
//       setAudio(null);
//       return;
//     }

//     // If audio comes from server
//     if (audio) {
//       try {
//         await destroyOrderAudio({ variables: { number } });
//       } finally {
//         setAudio(null);
//       }
//     }
//   };

//   const onStartRecording = async () => {
//     if (audio || recordedBufferRef.current) {
//       Alert.alert('Дуу бичлэг', 'Одоогийн бичлэгийг солих уу?', [
//         { text: 'Буцах', style: 'cancel' },
//         {
//           text: 'Солих',
//           style: 'destructive',
//           onPress: () => {
//             onDeleteAudio();
//           },
//         },
//       ]);
//       return;
//     }

//     const permission = await AudioManager.requestRecordingPermissions();
//     if (permission !== 'Granted') {
//       Alert.alert('Зөвшөөрөл', 'Микрофон ашиглах зөвшөөрөл хэрэгтэй байна');
//       return;
//     }

//     resetPlayback();

//     recordedChunksRef.current = [];
//     totalFramesRef.current = 0;
//     channelCountRef.current = 1;
//     sampleRateRef.current = 44100;

//     const recorder = new AudioRecorder({
//       sampleRate: sampleRateRef.current,
//       bufferLengthInSamples: 4096,
//     });

//     recorder.onAudioReady(({ buffer, numFrames }) => {
//       const channels = buffer.numberOfChannels;
//       channelCountRef.current = channels;
//       if (recordedChunksRef.current.length === 0) {
//         recordedChunksRef.current = Array.from({ length: channels }, () => []);
//       }

//       for (let ch = 0; ch < channels; ch += 1) {
//         const data = buffer.getChannelData(ch);
//         const copy = new Float32Array(data.length);
//         copy.set(data);
//         recordedChunksRef.current[ch].push(copy);
//       }

//       totalFramesRef.current += numFrames;
//       setDuration(totalFramesRef.current / sampleRateRef.current);
//     });

//     recorderRef.current = recorder;
//     recorder.start();
//     setIsRecording(true);
//   };

//   const onStopRecording = () => {
//     if (!recorderRef.current) return;
//     try {
//       recorderRef.current.stop();
//     } catch (e) {
//       console.error('stop recorder error', e);
//     }
//     setIsRecording(false);
//     recorderRef.current = null;

//     const recorded = buildRecordedBuffer();
//     if (recorded) {
//       recordedBufferRef.current = recorded;
//       bufferRef.current = recorded;
//       setDuration(recorded.duration);
//       setCurrentTime(0);
//     }
//   };

//   const onTogglePlay = () => {
//     const ctx = audioContextRef.current;
//     const activeBuffer = recordedBufferRef.current || bufferRef.current;
//     if (!ctx || !activeBuffer) return;

//     if (isPlaying) {
//       if (sourceRef.current) {
//         sourceRef.current.stop();
//         sourceRef.current = null;
//       }
//       pauseTimeRef.current = currentTime;
//       setIsPlaying(false);
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//       return;
//     }

//     const source = ctx.createBufferSource();
//     source.buffer = activeBuffer;
//     source.connect(ctx.destination);

//     const offset = pauseTimeRef.current;
//     startTimeRef.current = ctx.currentTime - offset;
//     source.start(0, offset);
//     sourceRef.current = source;

//     setIsPlaying(true);
//     source.onEnded = () => {
//       resetPlayback();
//     };

//     animationFrameRef.current = requestAnimationFrame(updateProgress);
//   };

//   const onSlidingStart = () => setIsSeeking(true);

//   const onValueChange = (value: number) => {
//     if (isSeeking) setCurrentTime(value);
//   };

//   const onSlidingComplete = (value: number) => {
//     const ctx = audioContextRef.current;
//     const activeBuffer = recordedBufferRef.current || bufferRef.current;
//     if (!ctx || !activeBuffer) {
//       setIsSeeking(false);
//       return;
//     }

//     const wasPlaying = isPlaying;
//     stopPlayback();
//     setIsSeeking(false);
//     pauseTimeRef.current = value;
//     setCurrentTime(value);

//     if (wasPlaying) {
//       const source = ctx.createBufferSource();
//       source.buffer = activeBuffer;
//       source.connect(ctx.destination);
//       startTimeRef.current = ctx.currentTime - value;
//       source.start(0, value);
//       sourceRef.current = source;
//       setIsPlaying(true);
//       source.onEnded = () => resetPlayback();
//       animationFrameRef.current = requestAnimationFrame(updateProgress);
//     }
//   };

//   const showPlayer = !!(recordedBufferRef.current || bufferRef.current);

//   return (
//     <Box>
//       <InputLabel label={label} isRequired={isRequired} />
//       <BoxContainer
//         borderWidth={2}
//         borderStyle="dashed"
//         borderRadius="m"
//         p="m"
//         gap="m"
//       >
//         {isRecording ? (
//           <Box flexDirection="row" alignItems="center" gap="m">
//             <ButtonIcon
//               icon={StopIcon}
//               color="primary"
//               backgroundColor="transparent"
//               onPress={onStopRecording}
//             />
//             <Text variant="body2" flex={1}>
//               Бичиж байна: {formatDuration(duration * 1000)}
//             </Text>
//           </Box>
//         ) : showPlayer ? (
//           <Box gap="s">
//             <Box flexDirection="row" alignItems="center" gap="s">
//               <ButtonIcon
//                 color="primary"
//                 icon={isPlaying ? PauseIcon : PlayIcon}
//                 size="m"
//                 backgroundColor="transparent"
//                 onPress={onTogglePlay}
//               />
//               <Box flex={1}>
//                 <Slider
//                   value={currentTime}
//                   minimumValue={0}
//                   maximumValue={duration || 0}
//                   onSlidingStart={onSlidingStart}
//                   onValueChange={onValueChange}
//                   onSlidingComplete={onSlidingComplete}
//                   minimumTrackTintColor={theme.colors.primary}
//                   maximumTrackTintColor={theme.colors.grey2}
//                   thumbTintColor={theme.colors.primary}
//                   disabled={loadingBuffer}
//                 />
//               </Box>
//               <Text variant="body2" color="grey4">
//                 {formatDuration(currentTime * 1000)} /{' '}
//                 {formatDuration(duration * 1000)}
//               </Text>
//               {destroying ? (
//                 <Loader />
//               ) : (
//                 <ButtonIcon
//                   icon={Delete03Icon}
//                   onPress={onDeleteAudio}
//                   backgroundColor="transparent"
//                 />
//               )}
//             </Box>
//             {!!loadingBuffer && (
//               <Text variant="body2" color="grey4">
//                 Ачаалж байна...
//               </Text>
//             )}
//           </Box>
//         ) : (
//           <Box
//             flexDirection="row"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Text variant="body2" color="grey4">
//               Дуу бичлэг нэмэх
//             </Text>
//             <ButtonIcon
//               icon={Mic01FreeIcons}
//               onPress={onStartRecording}
//               backgroundColor="transparent"
//             />
//           </Box>
//         )}
//       </BoxContainer>
//     </Box>
//   );
// };

export default InputAudio;
