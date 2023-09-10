import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../../../utils/logEvent';
import Colors from '../../../constants/Colors';
import { Text, Title } from '../../components/shared/Typography';
import Button from '../../components/shared/Button';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

const PrayerRequest = () => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText,
    container: isDark? colors.darkContainer : colors.lightContainer,
    container2: isDark? colors.darkContainer2 : colors.lightContainer,

  }

  const navigation = useNavigation();
  return (

        <ScrollView
          style={[styles.mainContainer, {backgroundColor: colorScheme.container}]}
        >
          <Image
            source={{uri: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/08/DWC-Prayer-Requests.png'}}
            style={styles.image}
          />
          <View style={[styles.container]}>
            <Title style={[styles.heading, {color: colorScheme.text}]}>How can we pray for you?</Title>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              Let us pray for you. We invite you to contact us during difficult
              times.
            </Text>

            <Button
              title="Submit Prayer Request"
              style={styles.button}
              onPress={() => {
                logEvent('TAP Prayer Request Submit');
                WebBrowser.openBrowserAsync(
                  'https://mobile.destinyworshipcentre.co.za/prayer-request/',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err });
                  WebBrowser.dismissBrowser();
                });
              }}
            />
          </View>
        </ScrollView>

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
  content: { marginBottom: 20 },
  button: { marginVertical: 20 },
});

export default PrayerRequest;
