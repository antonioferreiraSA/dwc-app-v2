import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import { Text, Subtitle } from '../../components/shared/Typography'
import { useSafeArea } from 'react-native-safe-area-context'
import { colors, fontSize } from '../../theme'
import { FontAwesome } from '@expo/vector-icons';


const YOUTUBE_API_KEY = 'AIzaSyDRlcySTdfFHGO1RuIdvkFEU40Tuc1TALo';
const CHANNEL_ID = 'UCJ3J0grUampl4mkzqoBWmAA';


const LatestVideosScreen = ({ navigation }) => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
const isDark = scheme === 'dark'
const colorScheme = {
  container: isDark? colors.darkContainer : colors.lightContainer,
}
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`)
      .then(response => response.json())
      .then(data => {
        const videosData = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          description: item.snippet.description,
        }));
        setVideos(videosData);
      });
  }, []);

  const handleVideoPress = (videoId, videoTitle) => {
    navigation.navigate('VideoPlayerScreen', { videoId, videoTitle });
  };

  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, {backgroundColor: colorScheme.container}]}>
      <Text XXL bold style={styles.headerTitle}>Latest Videos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {videos && videos.map(video => (
        <TouchableOpacity key={video.id} style={[styles.videoBlock,]} onPress={() => handleVideoPress(video.id, video.title)}>
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
  mainContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -35,
    marginTop: -30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerTitle: {
    marginVertical: 10,
    color: Colors.red,
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
    borderRadius: 10,
  },
});

export default LatestVideosScreen;
