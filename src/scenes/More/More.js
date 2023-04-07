import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'



const MyScreen = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.black : colors.primaryText
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/images/bap.jpeg')} style={styles.bannerImage} />
      <View style={{paddingTop:10}}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text  style={[styles.field, { color: colorScheme.text }]}>View map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text  style={[styles.field, { color: colorScheme.text }]}>Church Online </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
        <Text  style={[styles.field, { color: colorScheme.text }]}>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text  style={[styles.field, { color: colorScheme.text }]}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <Text  style={[styles.text, { color: colorScheme.text }]}>Whether you're seeking to know more about the Christian faith , been a believer in Christ for quite some time , or somewhere in between, Destiny Worship Centre is here to help people from every walk experience a growing relationship with God and ultimately fulfill your God-given destiny</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 150,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#d3d3d3',
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,

  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
  text: {
    fontSize: fontSize.middle,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'left',
  }
})

export default MyScreen;
