import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
const VideoPlayerScreen = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Fetch the post data from the API
    fetch('https://mobile.destinyworshipcentre.co.za/wp-json/wp/v2/posts/370')
      .then((response) => response.json())
      .then((data) => {
        // Extract the video URL from the content
        const content = data.content.rendered;
        const match = content.match(/src="(https:\/\/[^"]+)"/); // Regular expression to extract the URL
        if (match && match[1]) {
          setVideoUrl(match[1]);
        }
      })
      .catch((error) => {
        console.error('Error fetching video URL:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
     
     <VideoPlayer
    video={{ uri: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/09/DWCNotices_10Sep2023.mp4' }}
/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9, // You can adjust this aspect ratio based on your video's dimensions.
  },
});

export default VideoPlayerScreen;
