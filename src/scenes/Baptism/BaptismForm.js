import React from 'react';
import { HeaderHeightContext } from '@react-navigation/stack';
import {WebView} from 'react-native-webview';
import {SafeAreaView, View } from 'react-native';



const BaptismForm = () => {
  return (
    <View>
    <WebView source={{uri: 'https://demos.creative-tim.com/now-ui-react-native/docs/#/'}}  />
    </View>
  );
};


export default BaptismForm;
