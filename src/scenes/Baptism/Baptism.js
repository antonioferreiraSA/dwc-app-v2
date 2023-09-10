import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'
import Colors from '../../../constants/Colors';
import { Text, Title, Heading } from '../../components/shared/Typography'
import Button from '../../components/shared/Button';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
const BaptismScreen = () => {

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
    <View style={[styles.mainContainer, {backgroundColor: colorScheme.container}]}>
        <ScrollView >
          <Image
            source={{ uri: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/08/DWC-Baptism.png'}}
            style={styles.image}
          />
          <View style={[styles.container]}>
            <Title style={[styles.heading, {color: colorScheme.text}]}>
              What is the meaning of Baptism?
            </Title>

            <Heading style={{color: colorScheme.text}}>
              {`It illustrates Christ's burial and resurrection`}
            </Heading>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              {`"For when you were baptized, you were buried with Christ, and in baptism you were also raised with Christ." — COLOSSIANS 2:12`}
            </Text>

            <Heading  style={{color: colorScheme.text}}>It illustrates my new life as a Christian</Heading>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              {`"When someone becomes a Christian he becomes a brand new person inside. The old life has passed away and a new life has begun!" —2 CORINTHIANS 5:17`}
            </Text>

            <Heading  style={{color: colorScheme.text}}>
              {`Baptism doesn't make you a believer — it shows that you already believe. Baptism does not "save" you — only your faith in Christ does that`}
            </Heading>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              {`"For it is by grace you have been saved, through faith ... it is the gift of God — not by works, so that no one can boast." — EPHESIANS 2:8-9`}
            </Text>

            <Button
              title="I'm Interested"
              style={styles.button}
             onPress={() => {
                logEvent('TAP Prayer Request Submit');
                WebBrowser.openBrowserAsync(
                  'https://mobile.destinyworshipcentre.co.za/baptism-form/',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err });
                  WebBrowser.dismissBrowser();
                });
              }}
            />
          </View>
        </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  heading: {
    marginVertical: 10,
  },
  content: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: { marginVertical: 20 },
});

export default BaptismScreen;
