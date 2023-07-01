import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

function VideoPlayer() {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://www.youtube.com/watch?v=L9hjMCJbGIg&ab_channel=HaruMusic' }}
        style={styles.videoPlayer}
        controls={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: 300,
  },
});

export default VideoPlayer;
