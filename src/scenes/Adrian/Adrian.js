
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet,  View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack'
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'
import Colors from '../../../constants/Colors';
import { Text, Title, Heading } from '../../components/shared/Typography'
import Button from '../../components/shared/Button';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'


const YOUTUBE_API_KEY = 'AIzaSyDYmZpJk2TlDycX5vGZcIbMeh3cDLKWggM';
const PLAYLIST_ID = 'PLceXGIxnj2XcS5yLQF4Wg-pMAcX2Xkpgc';



const AdrianScreen = () => {
  const handleVideoPress = (videoId, videoTitle) => {
    navigation.navigate('VideoPlayerScreen', { videoId, videoTitle });
  };
  const [videos, setVideos] = useState([]);
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText,
    container: isDark? colors.darkContainer : colors.lightContainer,
    container2: isDark? colors.darkContainer2 : colors.lightContainer,

  }

  const fetchVideos = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();
    const allVideos = data.items.map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
    setVideos(allVideos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.videoBlock}  onPress={() => handleVideoPress(item.id, item.title)}>
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <View style={styles.playIconWrapper}>
      <FontAwesome name="play-circle-o" size={60} color="white" style={styles.playIcon} />
    </View>
      <Text style={[styles.videoTitle, {color: colorScheme.text}]}>{item.title}</Text>
    </TouchableOpacity>
  );








  const navigation = useNavigation();
  return (
    <View style={[styles.mainContainer, {backgroundColor:colorScheme.container2}]}>
        <ScrollView >
          <Image
            source={require('../../../assets/images/DrA.jpg')}
            style={styles.image}
          />
          <View style={[styles.container]}>
            <Title style={[styles.heading, {color:colorScheme.text}]}>
            Dr Adrian Naidoo - Legacy
            </Title>
            <Title style={[styles.heading2, {color:colorScheme.text}]}>
            25.06.1976 - 04.02.2021
            </Title>




            <Text style={[styles.content, {color:colorScheme.text}]}>
              {`On the 4th February 2021, the Senior Pastor and founder of Destiny Worship Centre, Dr. Adrian Naidoo was called home to be with the Lord. We have lost a a preacher, a teacher, a mentor, a leader, an author, our shepherd – our DAD. In every waking moment you will be remembered because of your immense love for God and His people. Your legacy will live on through each one of us that you have so mightily impacted. All of heaven is rejoicing as our tremendous loss is truly a momentous gain for heaven.

              `}
            </Text>

            <Heading style={{color: colorScheme.text}}>
              {`1 Corinthians 15:53‭-‬55 NIV`}
            </Heading>
            <Text style={[styles.content, {color:colorScheme.text}]}>
              {`For the perishable must clothe itself with the imperishable, and the mortal with immortality. When the perishable has been clothed with the imperishable, and the mortal with immortality, then the saying that is written will come true: “Death has been swallowed up in victory.” “Where, O death, is your victory? Where, O death, is your sting?”

              `}
            </Text>
            <Heading style={{color: colorScheme.text}}>
            Please see below for  inspirational content from Dr. Adrian Naidoo.
            </Heading>

            <View style={styles.container1}>

            <FlatList
              data={videos}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              numColumns={2}
            />
          </View>
          </View>
        </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  playIconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1,
  },

  image: {
    width: '100%',
    height: 250,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  heading: {
    marginVertical: 10,
  },
  heading2: {

    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: { marginVertical: 20 },

  container1: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoBlock: {
    flex: 1,
    margin: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: 22,
    marginTop: -5,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  videoThumbnail: {
    width: '100%',
    aspectRatio: 16 / 11,
    borderRadius: 10
  },







});

export default AdrianScreen;
