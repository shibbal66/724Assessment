import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

export default function App() {
  const videos = [
    {
      id: "1",
      url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      title: "Big Buck Bunny",
      user: "User 1",
    },
    {
      id: "2",
      url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      title: "Big Buck Bunny",
      user: "User 2",
    },
    {
      id: "3",
      url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      title: "Big Buck Bunny",
      user: "User 3",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.url }}
        resizeMode="cover"
        style={styles.video}
        useNativeControls
        shouldPlay={false}
      />
      <Text>{item.title}</Text>
      <Text>{item.user}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  videoContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: width - 40,
    height: height - 200,
    borderRadius: 10,
  },
});
