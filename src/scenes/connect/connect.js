import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Linking,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context'
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons'

import logEvent from '../../../utils/logEvent'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import { useHandleTabChange } from '../../../utils/useHandleTabChange'
import { listItems, callToActionButtons } from '../../../config/connect'
import { Text } from '../../components/shared/Typography'
import Button from '../../components/shared/Button'
// eslint-disable-next-line import/no-unresolved, import/extensions
import { openBrowser } from '../../../utils/openBrowser'

const numberOfCTAs = callToActionButtons.length
const youtubeURL = 'https://www.youtube.com/@DWCContent/streams';

function openYoutubeApp() {
  Linking.openURL(youtubeURL);
}

// eslint-disable-next-line react/prop-types
const Connect = ({ navigation }) => {
  useHandleTabChange('Connect');
  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../../../assets/images/images/connect_bg.png')}
        style={styles.backgroundImage}
      />

      <Text XXL bold style={styles.headerTitle}>
        CONNECT
      </Text>

      <FlatList
        keyExtractor={({ value }) => value}
        data={listItems}
        renderItem={({ item: { value, page } = {} }) => (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              logEvent(`OPEN ${page}`);
              navigation.navigate(page);
            }}
          >
            <View style={styles.item}>
              <Text XL style={styles.text}>
                {value}
              </Text>
              <Feather
                name="chevron-right"
                size={30}
                color={Colors.lightGray}
              />
            </View>
          </TouchableHighlight>
        )}
        style={styles.list}
      />

      <View>
        {/*
          only allow the ScrollView around the CTAs to
          scroll if there's more than 2 extra ones
        */}
        <ScrollView
          scrollEnabled={numberOfCTAs > 2}
          style={styles.callToActions}
        >
          {numberOfCTAs &&
            callToActionButtons.map(({ title, url, backgroundColor }) => (
              <Button
                key={title}
                title={title}
                style={[styles.checkIn, { backgroundColor }]}
                onPress={() => openBrowser({ title, url })}
              />
            ))}
          <Button
            icon={<AntDesign name="team" size={28} color={Colors.white} />}
            title="Join The Family"
            style={styles.checkIn}
            onPress={() =>
              openBrowser({
                title: 'Connect',
                url: 'https://mobile.destinyworshipcentre.co.za/membership-form/',
              })
            }
          />
          <Button
            icon={<Fontisto name="youtube-play" size={23} color={Colors.white} />}
            title="Church Online"
            style={styles.checkIn2}
            onPress={openYoutubeApp}
          />

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerTitle: {
    marginVertical: 10,
    marginLeft: 16,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 10,
    paddingLeft: 8,
  },
  checkIn: {
    margin: 10,
    backgroundColor: Colors.red,
  },
  checkIn2: {
    margin: 10,
    backgroundColor: Colors.red2,
  },
  callToActions: {
    maxHeight: 360,
  },
});

export default Connect;
