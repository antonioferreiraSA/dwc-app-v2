import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


export default function Logo() {
  return (
    <View>
    <Image
      style={styles.logo}
      source={require('../../assets/images/images/adaptive-icon.png')}
    />

    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    height: 280,
    width: 280,
    alignSelf: "center",

  },
  Title: {
    paddingTop: 5, // or marginTop: 5
    alignSelf: "center",
    color: 'green',
    fontSize: 30,
  },
})
