import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const Events = () => {
  const uri = 'https://mobile.destinyworshipcentre.co.za/events-2/';

  return (
    <SafeAreaView style={{flex:1}}>
      <WebView source={{uri}} />
    </SafeAreaView>
  );
};

export default Events;
