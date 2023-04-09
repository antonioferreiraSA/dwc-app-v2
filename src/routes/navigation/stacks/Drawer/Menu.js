import { Block, Text, theme } from 'galio-framework';
import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { DrawerItem as DrawerCustomItem, Icon } from './component'
import { Avatar } from '@rneui/themed';
import { UserDataContext } from '../../../../context/UserDataContext'
import nowTheme from './constants/Theme';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

// eslint-disable-next-line react/prop-types
function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const { userData } = useContext(UserDataContext)
  const screens = ['Home', 'Components', 'Articles', 'Profile', 'Account'];
  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
      <Avatar
      size="32"
      rounded
      title="NI"
      source={{ uri: userData.avatar }}
    />
        <Block right style={styles.headerIcon}>
        <AntDesign name="book" size={24} color="black" />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block
              style={{
                borderColor: 'black',
                width: '93%',
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
            <Text
              color={nowTheme.COLORS.BLACK}
              style={{
                marginTop: 30,
                marginLeft: 20,
                marginBottom: 10,
                fontFamily: 'montserrat-regular',
                fontWeight: '300',
                fontSize: 12,
              }}
            >
              DOCUMENTATION
            </Text>
          </Block>
          <DrawerCustomItem title="GETTING STARTED" navigation={navigation} />
          <DrawerCustomItem title="LOGOUT" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
    tintColor: 'black',
  },
});

export default CustomDrawerContent;
