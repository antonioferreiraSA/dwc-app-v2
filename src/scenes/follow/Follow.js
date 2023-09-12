import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import Colors from '../../../constants/Colors'
import { Text, Subtitle } from '../../components/shared/Typography'
import { useSafeArea } from 'react-native-safe-area-context'
import { colors } from '../../theme'
import { FontAwesome } from '@expo/vector-icons';
import { channelID, ytkey } from '../../config'
const YOUTUBE_API_KEY = ytkey;
const CHANNEL_ID = channelID;

const LatestVideosScreen = ({ navigation }) => {
  const { scheme, toggleScheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark ? styles.darkContent : styles.lightContent,
    text: isDark ? colors.white : colors.primaryText,
    container: isDark ? colors.darkContainer : colors.lightContainer,
    container2: isDark ? colors.darkContainer2 : colors.lightContainer,
  };

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadVideos(); // Load videos on component mount
  }, []);

  const loadVideos = () => {
    // Set the refreshing state to true when refreshing
    setRefreshing(true);

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
        setLoading(false);
        setRefreshing(false); // Ensure refreshing state is set to false
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setRefreshing(false); // Handle errors and ensure refreshing state is set to false
      });
  };

  const handleVideoPress = (videoId, videoTitle) => {
    navigation.navigate('VideoPlayerScreen', { videoId, videoTitle });
  };

  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { backgroundColor: colorScheme.container }]}>
      <Text XXL bold style={[styles.headerTitle, { color: colorScheme.text }]}>Latest Sermons</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadVideos} // Use loadVideos as the onRefresh handler
            colors={[colorScheme.text]} // Customize the refresh indicator color
          />
        }
      >
        {loading ? (
          // Skeleton loader while loading
          <View style={styles.skeletonLoader}>
            {[1, 2, 3, 4, 5].map(placeholderItem => (
              <View key={placeholderItem} style={styles.videoBlockPlaceholder}>
                <View style={styles.thumbnailPlaceholder} />
                <View style={styles.titlePlaceholder} />
              </View>
            ))}
          </View>
        ) : (
          videos && videos.map(video => (
            <TouchableOpacity key={video.id} style={[styles.videoBlock,]} onPress={() => handleVideoPress(video.id, video.title)}>
              <Subtitle style={[styles.title2, { color: colorScheme.text }]}>{video.title}</Subtitle>
              <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
              <FontAwesome name="play-circle-o" size={100} color="white" color="rgba(255, 255, 255, 0.5)" style={styles.playIcon} />
            </TouchableOpacity>
          ))
        )}
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
  loader: {
    width: '100%',
    height: 200,
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
  // Skeleton loader styles
  skeletonLoader: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
  },
  videoBlockPlaceholder: {
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 10,
  },
  thumbnailPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  titlePlaceholder: {
    height: 16,
    width: '80%',
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default LatestVideosScreen;
