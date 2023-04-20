import React, {useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { colors, fontSize } from '../../theme'

const VideoPlayerScreen = ({ route, navigation }) => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
const colorScheme = {
  container: isDark? colors.darkContainer : colors.lightContainer,
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
        <Text style={styles.videoTitle}>{videoTitle}</Text>


      </View>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
      <AntDesign name="back" size={34} color="black" />
      <Text style={styles.videoTitle}>Back to Sermons</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    alignSelf: 'center',
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
