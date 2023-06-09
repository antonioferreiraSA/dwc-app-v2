import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate';
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox';
import Logo from '../../components/Logo';
import { firestore } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../../constants/Colors';
import { colors, fontSize } from '../../theme';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { LogBox } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { Ionicons, Feather, Fontisto, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'

// To ignore a useless warning in terminal.
// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
LogBox.ignoreLogs(['Setting a timer']);

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
    const icon = scheme === 'light' ? 'moon' : 'sun';
    const textmode = scheme === 'light' ? 'Change to dark mode' : 'Change to light mode';
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }
  const RestPress = () => {
    navigation.navigate('RestPassword')
  }

  useEffect(() => {
    console.log('Login screen, ログイン画面')
  }, [])

  const onLoginPress = async() => {
    try {
      setSpinner(true)
      const response = await signInWithEmailAndPassword(auth, email, password)
      const uid = response.user.uid
      const usersRef = doc(firestore, 'users', uid)
      const firestoreDocument = await getDoc(usersRef)
      if (!firestoreDocument.exists) {
        setSpinner(false)
        alert("User does not exist anymore.")
        return;
      }
    } catch(error) {
      setSpinner(false)
      alert(error)
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
      <Image
      style={styles.logo}
      source={require('../../../assets/images/images/adaptive-icon.png')}
    />
        <TextInputBox
          placeholder='Email address'
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType={'email-address'}
        />
        <TextInputBox
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <Button
          label='Log in'
          color={colors.primaryButton}
          onPress={() => onLoginPress()}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
        <View
          style={[
            // eslint-disable-next-line no-use-before-define
            styles.buttonContainer,
            {paddingHorizontal: 35, backgroundColor: 'transparent'},
            ]}>
          <TouchableOpacity
          onPress={() => {
            logEvent('TAP Prayer Request Submit');
            WebBrowser.openBrowserAsync(
              'https://mobile.destinyworshipcentre.co.za/reset-password/',
              { toolbarColor: Colors.darkestGray }
            ).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }}
          >

              <Text font="regular" style={styles.footerLink2}>
                Forgot sign in details?{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{backgroundColor: 'transparent'}}
              onPress={() => {
                logEvent('TAP Prayer Request Submit');
                WebBrowser.openBrowserAsync(
                  'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/03/Privacy-Policy-Destiny-Worship-Centre-Church-1.pdf',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err });
                  WebBrowser.dismissBrowser();
                });
              }}>
              <Text font="regular" style={styles.footerLink2}>
                Privacy Policy
              </Text>
            </TouchableOpacity>


          </View>
          <View style={styles.ModeStyle}>
          <TouchableOpacity onPress={toggleScheme} style={styles.ModeStyle2}>
            <FontAwesome5 name={icon} size={24} color="white" />
          </TouchableOpacity>
          <View style={{ paddingVertical: 5}}/>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>{textmode}</Text>
        </View>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  ModeStyle: {
    borderRadius: 50,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,

  },
  ModeStyle2: {
    borderRadius: 50,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#368CC1'

  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: "center",

  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 13,
  },
  greyText: {
    fontSize: 13,
    color: '#848D99',
    textDecorationLine: 'underline',
  },

  footerView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  footerText: {
    fontSize: fontSize.large,
  },
  footerText1: {
    fontSize: fontSize.large,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: "bold",
    fontSize: fontSize.large
  },
  footerLink2: {
    color: colors.blueLight,
    fontWeight: "bold",
    fontSize: fontSize.middle,
    textDecorationLine: 'underline',
  },
})
