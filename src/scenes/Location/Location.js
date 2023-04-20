import React, {useContext} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Platform,

} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context'
import { HeaderHeightContext } from '@react-navigation/stack'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import logEvent from '../../../utils/logEvent'
import * as WebBrowser from 'expo-web-browser';
import Colors from '../../../constants/Colors'
import { Title, Subtitle, Heading } from '../../components/shared/Typography';
import Button from '../../components/shared/Button'
// eslint-disable-next-line import/no-unresolved, import/extensions
import { openBrowser } from '../../../utils/openBrowser'
// eslint-disable-next-line no-duplicate-imports
// eslint-disable-next-line no-duplicate-imports
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
const openMaps = (location) => {
  let url = '';

  switch (location) {
    case 'NSJ':
      url = 'https://goo.gl/maps/Q4Hg6ZThSmnxrcU7A';
      break;



    default:
      break;
  }

  logEvent('TAP Location', { campus: location });
  Linking.openURL(url);
};



const Location = () => {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText,
    container: isDark? colors.darkContainer : colors.lightContainer,
    container2: isDark? colors.darkContainer2 : colors.lightContainer,

  }


  return (
    <View style={{backgroundColor: colorScheme.container}}>
        <ScrollView style={{backgroundColor: colorScheme.container}}>
        <TouchableHighlight

                onPress={() => openMaps('NSJ')}

              >
          <Image
            source={require('../../../assets/images/images/location.png')}
            style={styles.image}
          />
          </TouchableHighlight>
          <View style={[styles.container]}>


            <Title center style={styles.heading}>
             Destiny Worship Center location & regular service time
            </Title>

            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('NSJ')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                 35 Ernest Schwartz Ln, Bruma, Johannesburg, 2026
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                Every Sunday at 9:00am, 10:30am,
              </Heading>
              <Heading center style={styles.subContent}>
                Every Wednesday at 7:00pm, 8:00pm,
              </Heading>
              <Title center style={styles.heading}>
              Contact Us
             </Title>


  <Button
  icon={<Entypo name="old-phone" size={24} color="white" />}
  title=" +27 11 616 1795"
  style={styles.checkIn}
  onPress={() =>
    openBrowser({
      title: 'WhatsApp',
      url: 'https://api.whatsapp.com/send/?phone=%2B27764758245&text&type=phone_number&app_absent=0',
    })
  }

/>
<View style={{paddingVertical: 5}}/>
              <Button
icon={<FontAwesome5 name="whatsapp" size={24} color="white" />}
title="WhatsApp"
style={styles.checkIn}
onPress={() =>
  openBrowser({
    title: 'WhatsApp',
    url: 'https://api.whatsapp.com/send/?phone=%2B27764758245&text&type=phone_number&app_absent=0',
  })
}
/>

            </View>
          </View>
        </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  button: { marginBottom: 20 },
  heading: { marginVertical: 10 },
  highlight: { borderRadius: 4 },
  location: {
    marginBottom: 30,
  },
  content: {
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
  subContent: {
    paddingHorizontal: 8,
    marginBottom: 10,
  },
})

export default Location
