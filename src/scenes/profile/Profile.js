import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from '@rneui/themed';
import Dialog from "react-native-dialog"
import Spinner from 'react-native-loading-spinner-overlay'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { Restart } from '../../utils/Restart'
import { firestore } from '../../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme'
import { signOut, deleteUser } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { Ionicons, Feather, Fontisto, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser'
import logEvent from '../../../utils/logEvent'
import Colors from '../../../constants/Colors'

export default function Profile() {
  const { userData, setUserData } = useContext(UserDataContext)
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [outvisible, setOutVisible] = useState(false)

  const [spinner, setSpinner] = useState(false)
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText,
  }

  const icon = scheme === 'light' ? 'moon' : 'sun';
  const textmode = scheme === 'light' ? 'Change to dark mode' : 'Change to light mode';

  useEffect(() => {
    console.log('Profile screen')
  }, [])

  const goDetail = () => {
    navigation.navigate('Edit', { userData: userData })
  }

  const onSignOutPress = () => {
    signOut(auth)
    .then(() => {
      setUserData('')
      Restart()
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  const showDialog = () => {
    setVisible(true)
  }
  const showSignOutDialog = () => {
    setOutVisible(true)
  }

  const handleCancel = () => {
    setOutVisible(false)
  }

  const accountDelete = async () => {
    try {
      setSpinner(true)
      const tokensDocumentRef = doc(firestore, 'tokens', userData.id)
      const usersDocumentRef = doc(firestore, 'users', userData.id)
      await deleteDoc(tokensDocumentRef)
      await deleteDoc(usersDocumentRef)
      const user = auth.currentUser
      deleteUser(user).then(() => {
        setSpinner(false)
        signOut(auth)
        .then(() => {
          console.log('user deleted')
        })
        .catch((error) => {
          console.log(error.message);
        });
      }).catch((error) => {
        setSpinner(false)
        console.log(error)
      });
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <ScreenTemplate>
      <ScrollView style={styles.main}>
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            title="NI"
            source={{ uri: userData.avatar }}
          />
        </View>
        <Text style={[styles.field, { color: colorScheme.text }]}>Name:</Text>
        <Text style={[styles.title, { color: colorScheme.text }]}>{userData.fullName}</Text>
        <Text style={[styles.field, { color: colorScheme.text }]}>Mail:</Text>
        <Text style={[styles.title, { color: colorScheme.text }]}>{userData.email}</Text>
        <Button
          label='Edit Profile'
          color={colors.primary}
          onPress={goDetail}
        />
        <Button
          label='Technical Support'
          color={colors.primary}
          onPress={() => {
            logEvent('TAP Prayer Request Submit');
            WebBrowser.openBrowserAsync(
              'https://mobile.destinyworshipcentre.co.za/tecincal-support/',
              { toolbarColor: Colors.darkestGray }
            ).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }}
        />
        <Button
          label='Account delete'
          color={colors.secondary}
          onPress={() => {
            logEvent('TAP Prayer Request Submit');
            WebBrowser.openBrowserAsync(
              'https://mobile.destinyworshipcentre.co.za/delete-account/',
              { toolbarColor: Colors.darkestGray }
            ).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }}
        />
        <Button
        label='Sign Out'
        color={colors.secondary}
        onPress={showSignOutDialog}

      />
      <View style={styles.ModeStyle}>
          <TouchableOpacity onPress={toggleScheme} style={styles.ModeStyle2}>
            <FontAwesome5 name={icon} size={24} color="white" />
          </TouchableOpacity>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>{textmode}</Text>
        </View>


      </ScrollView>
      <Dialog.Container visible={outvisible}>
      <Dialog.Title>Sign Out</Dialog.Title>
      <Dialog.Description>
        Are you Sure you want to sign Out
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="Yes" onPress={onSignOutPress} />
    </Dialog.Container>





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

  },
  ModeStyle2: {
    borderRadius: 50,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#368CC1'

  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center'
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
  avatar: {
    margin: 30,
    alignSelf: "center",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: "bold",
    fontSize: fontSize.large
  },
})
