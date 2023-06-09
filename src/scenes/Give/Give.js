import React from 'react';
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
  Clipboard,
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import { useHandleTabChange } from '../../../utils/useHandleTabChange'
import { Text, Subtitle } from '../../components/shared/Typography'
import Button from '../../components/shared/Button'

const build = Constants.manifest?.extra?.TIMESTAMP || ''

const Give= () => {
  useHandleTabChange('Giving');

  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../../../assets/images/images/giving_bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.container}>
        <Text XXL bold style={styles.headerTitle}>
          GIVING
        </Text>

        <Subtitle>Changing lives together</Subtitle>
        <Text style={styles.content}>
          We believe that Christians ought to be the most generous people on
          Earth, because our God is a generous God — giving to us sacrificially
          over and over again. By contributing financially, you can be a part of
          changing people’s lives forever.
        </Text>

        <Button
          title="Tithes and Offering"
          onPress={() => {
            logEvent('TAP Prayer Request Submit');
            WebBrowser.openBrowserAsync(
              'https://mobile.destinyworshipcentre.co.za/donations/tithes-and-offering/',
              { toolbarColor: Colors.darkestGray }
            ).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }}
          style={styles.button}
        />
        <Button
          title="Building Fund"
          onPress={() => {
            logEvent('TAP Prayer Request Submit');
            WebBrowser.openBrowserAsync(
              'https://mobile.destinyworshipcentre.co.za/donations/building-fund/',
              { toolbarColor: Colors.darkestGray }
            ).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }}
          style={styles.button}
        />
        <Button
        title="DRA Foundation"
        onPress={() => {
          logEvent('TAP Prayer Request Submit');
          WebBrowser.openBrowserAsync(
            'https://mobile.destinyworshipcentre.co.za/donations/dra-foundation/',
            { toolbarColor: Colors.darkestGray }
          ).catch((err) => {
            logEvent('ERROR with WebBrowser', { error: err });
            WebBrowser.dismissBrowser();
          });
        }}
        style={styles.button}
      />


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTitle: {
    marginVertical: 10,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  content: { marginBottom: 20 },
  button: { marginVertical: 10 },
  sha_button: {
    minHeight: 15,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});

export default Give;
