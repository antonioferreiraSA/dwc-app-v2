import { Block, Text, theme } from 'galio-framework';
import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { DrawerItem as DrawerCustomItem, Icon } from './component'
import { Avatar } from '@rneui/themed';
import { UserDataContext } from '../../../../context/UserDataContext'
import nowTheme from './constants/Theme';
import { AntDesign } from '@expo/vector-icons';
import { ColorSchemeContext } from '../../../../context/ColorSchemeContext'
const { width } = Dimensions.get('screen');
import { colors } from '../../../../theme';

// eslint-disable-next-line react/prop-types
function CustomDrawerContent({ drawerPosition, handleItemPress,navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText
  }
  const { userData } = useContext(UserDataContext)
  const screens = ['Home', 'Sunday School', 'Profile', 'Tecnical Support'];
  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
      <Avatar
      size="medium"
      rounded
      title="NI"
      source={{ uri: userData.avatar }}
    />

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
                onPress={handleItemPress}
              />
            );
          })}



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
