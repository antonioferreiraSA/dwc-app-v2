import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet,  View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Colors from '../../../constants/Colors'
import { Text, Subtitle } from '../../components/shared/Typography'
import { FontAwesome } from '@expo/vector-icons';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
const YOUTUBE_API_KEY = 'AIzaSyDRlcySTdfFHGO1RuIdvkFEU40Tuc1TALo';
const CHANNEL_ID = 'UCJ3J0grUampl4mkzqoBWmAA';

const VideosScreen = ({ navigation }) => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
const colorScheme = {
  container: isDark? colors.darkContainer : colors.lightContainer,
}
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`)
      .then(response => response.json())
      .then(data => {
        const recentVideos = data.items.slice(0, 10);
        const allVideos = data.items.slice(10);
        const recentVideosData = recentVideos.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        const allVideosData = allVideos.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        setVideos([...allVideosData, ...recentVideosData]);
      });
  }, []);

  const handleVideoPress = (videoId, videoTitle) => {
    navigation.navigate('VideoPlayerScreen', { videoId, videoTitle });
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: colorScheme.container}]}>
    <Text XXL bold style={styles.headerTitle}>Previous Videos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {videos.map(video => (
          <TouchableOpacity key={video.id} style={styles.videoBlock} onPress={() => handleVideoPress(video.id, video.title)}>
          <Subtitle style={styles.title2} >{video.title}</Subtitle>
            <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
            <FontAwesome name="play-circle-o" size={100} color="white"  style={styles.playIcon} />
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
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -35,
    marginTop: -25,
  },
  title2: {
    paddingVertical: 15,
  },
  videoThumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
});

export default VideosScreen;
