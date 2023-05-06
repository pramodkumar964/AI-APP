import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Camera,useCameraDevices } from 'react-native-vision-camera';
import * as FaceAPI from 'face-api.js';

const FaceRecognitionCamera = () => {
  const [faces, setFaces] = useState([]);
  const devices = useCameraDevices();
  const device = devices.front;
  useEffect(() => {
    const loadModels = async () => {
      // Load the FaceAPI models
      await FaceAPI.nets.ssdMobilenetv1.loadFromUri('/models');
      await FaceAPI.nets.faceLandmark68Net.loadFromUri('/models');
      await FaceAPI.nets.faceRecognitionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);

  const onFacesDetected = async ({ faces }) => {
    // Identify the detected faces
    const detectionResults = await Promise.all(
      faces.map(async (face) => {
        const landmarkResults = await FaceAPI.detectFaceLandmarks(face);
        const descriptorResults = await FaceAPI.computeFaceDescriptor(face.image, landmarkResults);
        const bestMatch = await FaceAPI.findBestMatch(descriptorResults);
        return {
          box: face.box,
          label: bestMatch.toString(),
        };
      })
    );
    setFaces(detectionResults);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        onFacesDetected={onFacesDetected}
        faceDetectionMode={Camera.FaceDetectionMode.fast}
        faceDetectionLandmarks={Camera.FaceDetectionLandmarks.all}
      />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {faces.map((face, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              borderWidth: 2,
              borderColor: 'green',
              top: face.box.top,
              left: face.box.left,
              width: face.box.width,
              height: face.box.height,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default FaceRecognitionCamera;
