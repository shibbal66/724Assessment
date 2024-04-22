import React, { useState } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const TaskThree = () => {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("Image selected:", result.uri);
      setImage(result.uri);
      uploadImage(result.uri);
    } else {
      console.log("Image selection cancelled");
    }
  };

  const uploadImage = async (uri) => {
    console.log("Uploading image:", uri);
    if (!uri) {
      console.error("URI is undefined");
      return;
    }

    const data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: "testPhoto.jpg",
    });

    try {
      const response = await axios.post(
        "https://postimage.io/api/v1/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful: ", response.data);
      if (response.data && response.data.url) {
        console.log("Image URL:", response.data.url);
      }
    } catch (error) {
      console.error("Upload failed: ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default TaskThree;
