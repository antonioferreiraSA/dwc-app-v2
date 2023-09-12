import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { ColorSchemeContext } from '../../context/ColorSchemeContext';
import { colors } from '../../theme';
import Button from '../../components/shared/Button';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';


const VideoPlayerScreen = ({ route, navigation }) => {
  const { scheme, toggleScheme } = useContext(ColorSchemeContext);
  const isDark = scheme === 'dark';
  const colorScheme = {
    container: isDark ? colors.darkContainer : colors.lightContainer,
    text: isDark ? colors.white : colors.primaryText,
  };

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const videoWidth = screenWidth / 1;
  const videoHeight = screenHeight / 4;
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Replace the video URL with your WordPress video URL
  const videoUrl = 'https://mobile.destinyworshipcentre.co.za/video_annoucments/362/';

  return (
    <ScrollView style={styles.main}>
      <View style={[styles.container, { backgroundColor: colorScheme.container }]}>
        <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
          <WebView
            source={{ uri: videoUrl }}
            allowsFullscreenVideo={true}
            style={{ flex: 1 }}
          />
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.container2}>
            <Text style={[styles.videoTitle, { color: colorScheme.text }]}>Updated on</Text>
          </View>
          <View style={styles.container2}>
            <Text style={[styles.videoTitle, { color: colorScheme.text }]}>Test2</Text>
          </View>
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            Hello Destiny Worship Centre family, here are the announcements for the week in case you missed them on Sunday. Thank you
          </Text>
        </View>

        <Button
          icon={<AntDesign name="back" size={23} color={Colors.white} />}
          title="Back to Home"
          style={[styles.checkIn2, { backgroundColor: '#212931' }]}
          onPress={handleBackPress}
        />
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            You can also stay informed and up-to-date by following us on social media. Feel free to connect with us across our various social platforms for the latest updates and exciting content
          </Text>
        </View>
        <Button
          icon={<Fontisto name="youtube-play" size={23} color={Colors.white} />}
          title="Subscribe to Channel"
          style={styles.checkIn2}
        />
        <Button
          icon={<Fontisto name="youtube-play" size={23} color={Colors.white} />}
          title="Subscribe to Channel"
          style={styles.checkIn2}
        />


              
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  descriptionBox: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  videoContainer: {
    alignSelf: 'center',
  },
  checkIn2: {
    margin: 10,
    backgroundColor: Colors.red2,
  },
  titleContainer: {
    padding: 10,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
});

export default VideoPlayerScreen;
