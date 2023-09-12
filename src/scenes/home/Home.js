import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'

  import { Text,  Linking, View, ScrollView, StyleSheet, Image, Dimensions, Modal, Pressable , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { firestore } from '../../firebase/config'
import { ImageSlider } from "react-native-image-slider-banner";
import { doc, onSnapshot } from 'firebase/firestore';
import LottieView from "lottie-react-native"
import { colors, fontSize } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { sendNotification } from '../../utils/SendNotification'
import { Avatar } from '@rneui/themed';
import { openBrowser } from '../../../utils/openBrowser'
import video from '../../../assets/loader.mp4'
import { Video, ResizeMode } from 'expo-av';
import Hands from "./Hands";
import {SermonNavigator} from '../../routes/navigation/stacks/SermonNavigator'
import PaginationDot from 'react-native-animated-pagination-dot';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Ionicons, Feather, Fontisto, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../constants/Colors'
import axios from 'axios';
import cheerio from 'cheerio';

export default function Home() {
  
  const deviceWidth = Dimensions.get('window').width;
    const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
    const icon = scheme === 'light' ? 'moon' : 'sun';
    const [imageIndex, setImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const images = [
      require('../../../assets/images/WOTD/8.png'),
      require('../../../assets/images/WOTD/3.png'),
      require('../../../assets/images/WOTD/4.png'),
      require('../../../assets/images/WOTD/1.png'),
      require('../../../assets/images/WOTD/2.png'),
      // Add more image sources as needed
    ];
    useEffect(() => {
      const interval = setInterval(() => {
        // Calculate the next image index and wrap around when necessary
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1 * 60 * 60 * 1000); // 3 hours in milliseconds
  
      return () => clearInterval(interval);
    }, []);
  

  const blocks = [
    {
      icon: <Hands />,
      title: 'Sunday School',
      text: 'Our Sunday School programme is designed for kids aged between 5 and 12.',
    },
    {
      icon: <Hands />,
      title: 'Evangelism',
      text: 'And then he told them, “You are to go into all the world and preach the Good News to everyone, everywhere. Mark 16:15',
    },
    {
      icon: <Hands />,
      title: 'Praise and Worship',
      text: 'When we magnify God, we invite His presence into our lives and in doing so we honor Gods presence.',
    },
    {
      icon: <Hands />,
      title: 'Intercessory',
      text: 'Prayer is an expression of faith in Gods power and His Word, fueled by a desire to know more of him.',
    },

    {
      icon: <Hands />,
      title: 'Youth',
      text: 'Youth is the perfect place for our youngsters aged 13-19 to engage with other like-minded individuals . Our experienced Youth leaders guide, nurture, shape, mould and prepare our Youth today for tomorrow. ',
    },
    {
      icon: <Hands />,
      title: 'Sunday Service',
      text: '9:00am - Service will be held in the sanctuary and will be live- streamed to our YouTube channel and our Facebook page.',
    },
    {
      icon: <Hands />,
      title: 'Teaching Wednesday',
      text: '7:00pm to 8:00pm - Wednesday evenings are changing. This is not a service but a time for teaching and going deeper into the Word of God.',
    },
    {
      icon: <Hands />,
      title: 'Saturday Morning Live',
      text: 'Come join our mighty men as we unite in prayer and the Word of God. Lets rise up!',
    },
  ];







// blocks
const SCREEN_WIDTH = Dimensions.get('window').width;
const [activeSlide, setActiveSlide] = useState(0);

  const navigation = useNavigation()
  const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const youtubeURL = 'https://www.youtube.com/@DWCContent/streams';

function openYoutubeApp() {
  Linking.openURL(youtubeURL);
}

  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText,
    container: isDark? colors.darkContainer : colors.lightContainer,
    container2: isDark? colors.darkContainer2 : colors.lightContainer,

  }

  const goProfile = () => {
    navigation.navigate('Profile')
  }
  const goEvents = () => {
    navigation.navigate('Events')
  }
  const WordOfTheDay = () => {
    navigation.navigate('WordOfTheDay')
  }
  const AnnouncmentsPlayer = () => {
    navigation.navigate('AnnouncmentsPlayer')
  }
  const goSermons = () => {
    navigation.navigate('Sermons')
  }
  const goGiving = () => {
    navigation.navigate('Adrian')
  }
  const goVolenteer= () => {
    navigation.navigate('Volunteer')
  }
  const goBaptim = () => {
    navigation.navigate('Baptism')
  }
  const SundaySchool = () => {
    navigation.navigate('SundaySchool')
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
        onPress={goProfile}
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

  const [sliderImages, setSliderImages] = useState([]);
  useEffect(() => {
    const API_ENDPOINT = 'https://mobile.destinyworshipcentre.co.za/wp-json/wp/v2/slider_images';

    axios
      .get(API_ENDPOINT)
      .then(response => {
        const imagesData = response.data;
        const imageUrls = extractImageUrls(imagesData);
        setSliderImages(imageUrls);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const extractImageUrls = imagesData => {
    const imageUrls = [];
    imagesData.forEach(imageData => {
      const $ = cheerio.load(imageData.content.rendered);
      $('img').each((index, element) => {
        imageUrls.push(element.attribs.src);
      });
    });
    return imageUrls;
  };

  return (
    <ScreenTemplate>

      <ScrollView style={styles.main}>

      <View style={styles.imageblock}>

      {sliderImages.length > 0 ? (
        <ImageSlider
          data={sliderImages.map(img => ({ img }))}
          autoPlay={true}
          preview={false}
          caroselImageStyle={{ resizeMode: "contain" }}
          onItemChanged={item => console.log('item', item)}
          closeIconColor="#fff"
          caroselImageContainerStyle={styles.sliderContainer}
        />
      ) : (
        <Text>Loading...</Text>
      )}
</View>
<TouchableOpacity onPress={openYoutubeApp} style={styles.liveContainer}>
</TouchableOpacity>
<View style={styles.liveContainer} >
<TouchableOpacity
style={styles.live2}
onPress={WordOfTheDay}
 >
<Image
source={images[imageIndex]}
style={[styles.image2, {
  borderTopLeftRadius: 90,
  borderTopRightRadius: 90,
  borderBottomLeftRadius: 90, // Adjust this value as needed
  borderBottomRightRadius: 90,
}]}
resizeMode='contain'
onPress={() => setModalVisible(true)}
/>
</TouchableOpacity>



</View>



    <View style={[styles.container,]}  onPress={() => setModalVisible(true)} >
    <View style={[styles.row, {backgroundColor: colorScheme.container} ]}>
      <View style={styles.block}>
      <TouchableOpacity onPress={goEvents}>
        <Image
          source={{ uri: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/04/behnam-norouzi-s-ZlA1cwAPA-unsplash.jpg' }}
          style={styles.image}
        />
        
        <Text style={[styles.title, { color: colorScheme.text }]}>Weekly Events</Text>
        <Text style={styles.text}>Find Out More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.block}>
      <TouchableOpacity onPress={goSermons}>
        <Image
          source={require('../../../assets/images/home-grid/DWCSermons.png')}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Sermons</Text>
        <Text style={styles.text}>Watch Live</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={[styles.row, {backgroundColor: colorScheme.container}]}>
      <View style={styles.block}>
      <TouchableOpacity onPress={goGiving}>
        <Image
          source={{ uri: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/04/DrA_02-e1681643885224.jpg' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>DR Adrian Legacy</Text>
        <Text style={styles.text}>DWC founder</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block}>
      <TouchableOpacity onPress={SundaySchool}>
        <Image
          source={require('../../../assets/images/home-grid/DWCSundaySchool.png')}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Sunday School</Text>
        <Text style={styles.text}>Parents Add your Child</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={[styles.row, {backgroundColor: colorScheme.container}]}>
      <View style={styles.block}>
      <TouchableOpacity
      onPress={goVolenteer}
      >
        <Image
           source={require('../../../assets/images/home-grid/DWCVolunteer.png')}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Volunteer</Text>
        <Text style={styles.text}>Join Us Grow the Church</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block}>
      <TouchableOpacity onPress={goBaptim}>
        <Image
          source={{ uri: 'https://mobile.destinyworshipcentre.co.za/wp-content/uploads/2023/04/1.jpeg' }}
          style={styles.image}
        />
        <Text style={[styles.title, { color: colorScheme.text }]}>Baptism Sign-Up</Text>
        <Text style={styles.text}>Get baptised</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
<View style={{paddingHorizontal: 20, paddingVertical: 20}}>
</View>
<View style={styles.liveContainer} >
<TouchableOpacity
style={styles.live}
onPress={AnnouncmentsPlayer}
 >
<Image
source={require('../../../assets/images/banner.png')}
style={{ width: 200, height: 200 }}
resizeMode="contain"
onPress={() => setModalVisible(true)}
/>
</TouchableOpacity>



</View>

<Text style={[styles.Title1, {color:colorScheme.text}]}>
Ministries & Services
</Text>
<View>
<Carousel
  data={blocks}
  horizontal
  scrollEnabled={true}
  showsHorizontalScrollIndicator={false}
  windowSize={deviceWidth}
  sliderWidth={deviceWidth}
  itemWidth={deviceWidth - 80}
  onSnapToItem={index => setActiveSlide(index)}
  renderItem={i => {
    return (
      <View
        style={{
          padding: 20,
          width: '100%',
          height: 270,
          backgroundColor: colorScheme.container2,
          justifyContent: 'center',
          alignSelf: 'center',

          borderRadius: 7,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2.7,
          elevation: 2,
        }}><View>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 12,
          }}>
          {i.item.icon}
        </View>

        <Text font="regular"
          style={{
            textAlign: 'center',
            fontSize: 18,
            paddingVertical: 8,
            color:colorScheme.text
          }}>
          {i.item.title}
        </Text>
        <Text font="regular"
          style={{
            textAlign: 'center',
            color:colorScheme.text,
            fontSize: 16,
            lineHeight: 16,
          }}>
          {i.item.text}
        </Text>
      </View>
    </View>
  );
}}
/>
<View style={{
// position: "absolute" ,
justifyContent: "center",
 alignItems: "center",
 paddingVertical: 10,
 paddingBottom: 30,

}}>


 <PaginationDot
activeDotColor={'#C0AE75'}
inactiveDotColor={'black'}
curPage={activeSlide}
maxPage={6}
sizeRatio={1.3}
/>
</View>
<View>
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
  image2: {
    width: "100%",
    height: 200,
  },
  sliderContainer: {
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },


  btn: {
    borderRadius: 0,
    paddingVertical: 20,
    padding: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 40 : 30,
  },
  Title1: {
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    fontSize: 29,
  },
  darkContent: {
    backgroundColor: colors.darkContainer,
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
  live2: {
    height:100 ,
    width: "90%",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageblock: {
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
    width: 170,
    height: 185,
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
