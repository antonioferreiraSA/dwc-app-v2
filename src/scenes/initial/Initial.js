import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from "react-native";
import { UserDataContext } from '../../context/UserDataContext';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import ScreenTemplate from '../../components/ScreenTemplate';
import { firestore } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { decode, encode } from 'base-64'
import { colors, fontSize } from '../../theme';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
import LottieView from 'lottie-react-native';
import { useAtom } from 'jotai'
import { checkedAtom, loggedInAtom } from '../../utils/atom';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function Initial() {
  const [, setCehecked] = useAtom(checkedAtom)
  const [, setLoggedIn] = useAtom(loggedInAtom)
  const { setUserData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    container: isDark? colors.dark: colors.white,
    text: isDark? colors.white : colors.primaryText
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const usersRef = doc(firestore, 'users', user.uid)
        onSnapshot(usersRef, (querySnapshot) => {
          const userData = querySnapshot.data()
          setUserData(userData)
          setLoggedIn(true)
          setCehecked(true)
        })
      } else {
        setLoggedIn(false)
        setCehecked(true)
      }
    });
  }, []);

  return (
    <ScreenTemplate>
      <View style={[styles.container, {backgroundColor: colorScheme.container}]}>
      <LottieView
      source={require('../../../assets/lottie/main.json')}
      autoPlay
      loop
      style={[styles.loader, { alignSelf: 'center', width: 200, height: 200 }]}
    />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center'
  },
})
