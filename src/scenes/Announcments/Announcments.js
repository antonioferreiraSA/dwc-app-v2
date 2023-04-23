import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const Announcments = () => {
  const [uri, setUri] = useState('https://mobile.destinyworshipcentre.co.za/elementor-324/');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUri(uri => uri); // This triggers a re-render and refreshes the WebView
    }, 60000); // Refresh every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <WebView source={{uri}} />
    </SafeAreaView>
  );
};

export default Announcments;
