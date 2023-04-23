import React, {useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { colors, fontSize } from '../../theme'
import Button from '../../components/shared/Button'
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

const VideoPlayerScreen = ({ route, navigation }) => {
  function openYoutubeApp() {
    Linking.openURL(youtubeURL);
  }
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
const colorScheme = {
  container: isDark? colors.darkContainer : colors.lightContainer,
  text: isDark? colors.white : colors.primaryText,
}

  const { videoId, videoTitle,  } = route.params;
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const videoWidth = screenWidth / 1;
  const videoHeight = screenHeight / 4;
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {backgroundColor: colorScheme.container}]}>

      <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight, backgroundColor: colorScheme.container }]}>
        <WebView
          allowsFullscreenVideo={true}
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.titleContainer}>
      <View style={styles.container2}>
      <Image source={require('../../../assets/images/images/adaptive-icon.png')} style={styles.avatar} />
      <Text style={[styles.videoTitle, {color:colorScheme.text}]}>{videoTitle}</Text>
    </View>



      </View>
      <View style={styles.descriptionBox}>
  <Text style={styles.descriptionText}>
  Thank you for tuning in online and connecting with us! We hope you were blessed by the Word of God. May you be abundantly blessed, and we look forward to staying connected with you.

  </Text>
</View>

  <Button
    icon={<Fontisto name="youtube-play" onPress={openYoutubeApp} size={23} color={Colors.white} />}
    title="Subscribe to Channel"
    style={styles.checkIn2}
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 5
  },
  descriptionBox: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 8
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24
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
