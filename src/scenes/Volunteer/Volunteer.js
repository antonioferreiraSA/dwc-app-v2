import React, {useContext} from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'
import Colors from '../../../constants/Colors'
import {
  Text,
  Title,
  Subtitle,
  Heading,
} from '../../components/shared/Typography';
import Button from '../../components/shared/Button';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'


const Volunteer = () => {

  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText,
    container: isDark? colors.darkContainer : colors.lightContainer,
    container2: isDark? colors.darkContainer2 : colors.lightContainer,

  }





  return (

        <ScrollView
          style={[styles.mainContainer, {backgroundColor: colorScheme.container}]}
        >

          <View style={[styles.container]}>
            <Title style={[styles.heading, {color:colorScheme.text}]}>Volunteering</Title>

            <Subtitle style={{color: colorScheme.text}}>Attend One Serve One</Subtitle>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              {`Great things can happen when we work together. That's why we encourage everyone to attend one service, then serve during another service or hour of the week.`}
            </Text>

            <Subtitle style={{color: colorScheme.text}}>Why Volunteers Matter</Subtitle>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              {`Volunteering is a great opportunity to use your time, energy, and skills to make a real difference in someone's life. Whether you are enthusiastically greeting our guests, holding babies in the nursery, or playing the drums on stage, every volunteer has a part in the life transformation that happens each week at Destiny Worship Centre. Join a team and experience the joy of knowing that God used your life to make an eternal impact.`}
            </Text>

            <Subtitle style={{color: colorScheme.text}}>{`What's the Commitment?`}</Subtitle>
            <Text style={[styles.content, {color: colorScheme.text}]}>
              When you join our Dream Team, you are assigned a team leader who
              will work with you to create a serving schedule that best fits
              your availability. We encourage most people to serve once a week
              whenever possible, but many teams have volunteers rotating every
              other week or even once a month. You can switch teams at any time
              by talking to your team leader.
            </Text>

            <Subtitle style={{color: colorScheme.text}}>Where can I serve?</Subtitle>
            <Text style={[styles.content, {color: colorScheme.text} ]}>
              There are numerous teams that need volunteers in order for
              Destiny Worship Centre to run as it does!
            </Text>
            <Heading style={{color: colorScheme.text}}>
              Here are a few areas in which you can make a difference:
            </Heading>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022  Sunday School'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Worship Team'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Church Online'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Website & Mobile Development'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Marketing/Communications'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Media Team'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Prayer'}</Text>
            <Text style={[styles.listItem, {color: colorScheme.text}]}>{'\u2022 Security/Medical'}</Text>


            <Button
              title="Sign Up"
              style={styles.button}
              onPress={() => {
                logEvent('TAP Prayer Request Submit');
                WebBrowser.openBrowserAsync(
                  'https://mobile.destinyworshipcentre.co.za/volunteer-form/',
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
  },
  image: {
    width: '100%',
    height: 300,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heading: {
    marginVertical: 10,
  },
  content: {
    marginBottom: 30,
  },
  listItem: {
    marginVertical: 4,
    marginHorizontal: 10,
  },
  button: { marginVertical: 20 },
});

export default Volunteer;
