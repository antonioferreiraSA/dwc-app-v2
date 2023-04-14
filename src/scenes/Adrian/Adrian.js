
import React, { useState, useEffect } from 'react';
import { StyleSheet,  View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack'
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'
import Colors from '../../../constants/Colors';
import { Text, Title, Heading } from '../../components/shared/Typography'
import Button from '../../components/shared/Button';
import { useNavigation } from '@react-navigation/native';



const YOUTUBE_API_KEY = 'AIzaSyDYmZpJk2TlDycX5vGZcIbMeh3cDLKWggM';
const PLAYLIST_ID = 'PLceXGIxnj2XcS5yLQF4Wg-pMAcX2Xkpgc';




const AdrianScreen = () => {
  const [videos, setVideos] = useState([]);

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
    <TouchableOpacity key={item.id} style={styles.videoBlock}>
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );








  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
        <ScrollView >
          <Image
            source={require('../../../assets/images/DrA.jpg')}
            style={styles.image}
          />
          <View style={[styles.container]}>
            <Title style={styles.heading}>
            Dr Adrian Naidoo - Legacy
            </Title>
            <Title style={styles.heading2}>
            25.06.1976 - 04.02.2021
            </Title>




            <Text style={styles.content}>
              {`On the 4th February 2021, the Senior Pastor and founder of Destiny Worship Centre, Dr. Adrian Naidoo was called home to be with the Lord. We have lost a a preacher, a teacher, a mentor, a leader, an author, our shepherd – our DAD. In every waking moment you will be remembered because of your immense love for God and His people. Your legacy will live on through each one of us that you have so mightily impacted. All of heaven is rejoicing as our tremendous loss is truly a momentous gain for heaven.

              `}
            </Text>

            <Heading>
              {`1 Corinthians 15:53‭-‬55 NIV`}
            </Heading>
            <Text style={styles.content}>
              {`For the perishable must clothe itself with the imperishable, and the mortal with immortality. When the perishable has been clothed with the imperishable, and the mortal with immortality, then the saying that is written will come true: “Death has been swallowed up in victory.” “Where, O death, is your victory? Where, O death, is your sting?”

              `}
            </Text>
            <Heading>
            Please see below for books and inspirational content from Dr. Adrian Naidoo.
            </Heading>

            <View style={styles.container1}>
            <Text style={styles.heading}>Playlist Videos</Text>
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
    backgroundColor: Colors.darkestGray,
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
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  videoThumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
  },







});

export default AdrianScreen;
