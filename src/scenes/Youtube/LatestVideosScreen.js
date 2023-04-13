import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

const YOUTUBE_API_KEY = 'AIzaSyDYmZpJk2TlDycX5vGZcIbMeh3cDLKWggM';
const CHANNEL_ID = 'UCJ3J0grUampl4mkzqoBWmAA';

const LatestVideosScreen = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`)
      .then(response => response.json())
      .then(data => {
        const videosData = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        setVideos(videosData);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest Videos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {videos.map(video => (
          <TouchableOpacity key={video.id} style={styles.videoBlock}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  videoBlock: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoThumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});

export default LatestVideosScreen;
