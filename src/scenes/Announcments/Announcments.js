import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const StatusComponent = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up a timer to fetch data periodically (every minute)
    const dataFetchInterval = setInterval(() => {
      fetchData();
    }, 60000); // 60,000 milliseconds = 1 minute

    // Clean up the interval timer when the component unmounts
    return () => {
      clearInterval(dataFetchInterval);
    };
  }, []);

  const fetchData = () => {
    const API_ENDPOINT = 'https://mobile.destinyworshipcentre.co.za/wp-json/wp/v2/word_of_the_day';

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
  };

  const extractImageUrls = imagesData => {
    const imageUrls = [];
    imagesData.forEach(imageData => {
      const content = imageData.content.rendered;
      const regex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
      let match;
      while ((match = regex.exec(content))) {
        imageUrls.push(match[1]);
      }
    });
    return imageUrls;
  };

  const handleNext = () => {
    if (currentIndex < sliderImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollRef.current.scrollTo({
        x: (currentIndex + 1) * windowWidth,
        animated: true,
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollRef.current.scrollTo({
        x: (currentIndex - 1) * windowWidth,
        animated: true,
      });
    }
  };

  useEffect(() => {
    const autoNextSlide = setInterval(() => {
      handleNext();
    }, 10000);

    return () => {
      clearInterval(autoNextSlide);
    };
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={handlePrevious}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerBlockContainer}>
          {sliderImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.headerBlock,
                index === currentIndex ? styles.activeHeaderBlock : null,
              ]}
            />
          ))}
        </View>
       
      </View>

      {/* Status Content */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ width: windowWidth * sliderImages.length }}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.x;
          const index = Math.floor(offset / windowWidth);
          setCurrentIndex(index);
        }}
        ref={scrollRef}
      >
        {sliderImages.map((imageUrl, index) => (
          <View key={index} style={{ width: windowWidth }}>
            <Image source={{ uri: imageUrl }} style={styles.statusImage} />
          </View>
        ))}
      </ScrollView>

      {/* Loader */}
      {sliderImages.length === 0 && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, // Ensure it's above the images
  },

  headerBlockContainer: {
    flexDirection: 'row',
    
  },
  headerBlock: {
    width: 28,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    margin: 4,
  },
  activeHeaderBlock: {
    backgroundColor: 'green', // Change this color as desired
  },
  backButton: {
    color: 'white',
    fontSize: 18,
    marginRight: 'auto', // Push the back button to the left
  },
  statusImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, 
  },
});

export default StatusComponent;
