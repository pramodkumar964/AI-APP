
import * as React from 'react';
// import { runOnJS } from 'react-native-reanimated';

// import { StyleSheet } from 'react-native';
// import {
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';

// import { Camera } from 'react-native-vision-camera';
// import { scanFaces, Face } from 'vision-camera-face-detector';
//import FaceScan from './components/FaceScan';
import FaceRecognitionCamera from './components/FaceAPIscan'

export default function App() {
  return (
 // <FaceScan />
  <FaceRecognitionCamera />
  )
}

