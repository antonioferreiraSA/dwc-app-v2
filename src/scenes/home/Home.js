import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, Dimensions, Modal, Pressable , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { firestore } from '../../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore';
import LottieView from "lottie-react-native"
import { colors, fontSize } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { sendNotification } from '../../utils/SendNotification'
import { Avatar } from '@rneui/themed';
import video from '../../../assets/loader.mp4'
import axios from 'axios';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons, Feather, Fontisto, AntDesign } from '@expo/vector-icons';

import Colors from '../../../constants/Colors'

export default function Home() {

// blocks
const SCREEN_WIDTH = Dimensions.get('window').width;

  const navigation = useNavigation()
  const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText
  }

  const goDetail = () => {
    navigation.openDrawer()
  }
  <View style={styles.avatar}>
  <Avatar
    size="32"
    rounded
    title="NI"
    source={{ uri: userData.avatar }}
  />
</View>

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.avatar}>
        <Avatar
        size="small"
        rounded
        title="NI"
        source={{ uri: userData.avatar }}
        onPress={goDetail}
      />
      </View>
      ),
    });
  }, [navigation])

  useEffect(() => {
    const tokensRef = doc(firestore, 'tokens', userData.id);
    const tokenListner = onSnapshot(tokensRef, (querySnapshot) => {
      if (querySnapshot.exists) {
        const data = querySnapshot.data()
        setToken(data)
      } else {
        console.log("No such document!");
      }
    })
    return () => tokenListner()
  }, [])


  const onNotificationPress = async() => {
    const res = await sendNotification({
      title: 'Hello',
      body: 'This is some something 👋',
      data: 'something data',
      token: token.token
    })
    console.log(res)
  }
  const CheckInButton = () => (
    <Button

      title="Check In"
      style={styles.checkIn}
      onPress={() =>
        openBrowser({
          title: 'Check In',
          url: 'http://echo.church/checkin',
        })
      }
    />
  );



  return (
    <ScreenTemplate>
      <ScrollView style={styles.main}>
      <View style={styles.liveContainer}>
      <View style={styles.live}>
      <LottieView
      source={require("../../../assets/lottie/99714-go-live.json")}
      style={styles.animation}
      autoPlay
      loop
    />
    </View>
    </View>
    <View style={styles.liveContainer} onPress={() => setModalVisible(true)}>
    <TouchableOpacity
    style={styles.live}
    onPress={() => {
      navigation.navigate('ModalStacks', {
        screen: 'Announcments'
      })
    }}
     >
    <Image
  source={require('../../../assets/images/banner.png')}
  style={{ width: 200, height: 200 }}
  resizeMode="contain"
  onPress={() => setModalVisible(true)}
/>
</TouchableOpacity>



    </View>
    <View style={styles.container}  onPress={() => setModalVisible(true)} >
    <View style={styles.row}>
      <View style={styles.block}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/34191144?v=4' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Title 1</Text>
        <Text style={styles.text}>Small text 1</Text>
      </View>
      <View style={styles.block}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/34191144?v=4' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Title 2</Text>
        <Text style={styles.text}>Small text 2</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.block}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/34191144?v=4' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Title 3</Text>
        <Text style={styles.text}>Small text 3</Text>
      </View>
      <View style={styles.block}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/34191144?v=4' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Title 4</Text>
        <Text style={styles.text}>Small text 4</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.block}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/34191144?v=4' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Title 5</Text>
        <Text style={styles.text}>Small text 5</Text>
      </View>
      <View style={styles.block}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/34191144?v=4' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Title 6</Text>
        <Text style={styles.text}>Small text 6</Text>
      </View>
    </View>
  </View>
  <Button
      icon={<AntDesign name="team" size={28} color={Colors.white} />}
      label='Join The Family'
      color={colors.tertiary}

    />
  <View style={styles.container1}>
  <View style={{paddingHorizontal:10}}>
  <TouchableOpacity style={styles.button}>
    <Ionicons name="logo-instagram" size={20} color="#fff" />
  </TouchableOpacity>
  </View>
  <View style={{paddingHorizontal:10}}>
  <TouchableOpacity style={styles.button}>
    <Ionicons name="logo-facebook" size={20} color="#fff" />
  </TouchableOpacity>
  </View>
  <View style={{paddingHorizontal:10}}>
  <TouchableOpacity style={styles.button}>
    <Ionicons name="logo-youtube" size={20} color="#fff" />
  </TouchableOpacity>
  </View>
</View>



      </ScrollView>



    </ScreenTemplate>

  )
}

const styles = StyleSheet.create({
  lightContent: {
    backgroundColor: colors.lightyellow,
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  darkContent: {
    backgroundColor: colors.gray,
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  main: {
    flex: 1,
    width: '100%',
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
    margin: 15,

  },

  live: {
    height:100 ,
    width: "90%",
    backgroundColor: '#212931',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveContainer: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 50,
    height: 80,
    alignContent: 'center'
  },

  // test
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  block: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    margin: 5,


  },
  image: {
    width: 180,
    height: 130,
    marginBottom: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: '#777',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // buttons
  container1: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,



  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'center',

  },


})
