import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons'
import ConnectLogo from '../../../../assets/icons/ConnectLogo'
import EventsLogo from '../../../../assets/icons/GroupsLogo'
import More from '../../../scenes/More/More'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext';
import { colors } from '../../../theme';

// New Screens from echo.church
import Give from '../../../scenes/Give'
import Connect from '../../../scenes/connect'
import { EventsNavigator } from '../stacks/EventsNavigator'
// stack navigators
import { HomeNavigator, ProfileNavigator, ConnectNavigator, MoreNavigator   } from '../stacks'
import { FollowNavigator } from '../stacks/topTabStacks/FollowNavigator';
import {SermonNavigator} from '../stacks/SermonNavigator'


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    container: isDark? colors.darknav : colors.lightnav,
    border: isDark? colors.darkborder : colors.lightborder,
    inactive: isDark? colors.iconsdark : colors.iconslight,
  }
  return (
    <Tab.Navigator
      options={{
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: 'blue',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
      sceneContainerStyle={{ backgroundColor: 'green' }}
      defaultScreenOptions={{
        headerShown: false,
        headerTransparent: true
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.lightPurple,
        tabBarInactiveTintColor:colorScheme.inactive,
        tabBarStyle: {
            backgroundColor: colorScheme.container,
            borderTopColor: colorScheme.border,
          borderTopWidth: 1,

        },
      })}

      initialRouteName="HomeTab"
      swipeEnabled={false}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontIcon
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <EventsLogo
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sermon"
        component={SermonNavigator}
        options={{
          tabBarLabel: 'Sermon',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
            name='live-tv'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ConnectTab"
        component={ConnectNavigator}
        options={{
          tabBarLabel: 'Connect',
          tabBarIcon: ({ color, size }) => (
            <ConnectLogo
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Giving"
        component={Give}
        options={{
          tabBarLabel: 'Giving',
          tabBarIcon: ({ color, size }) => (
            <EventsLogo
              color={color}
              size={size}
            />
          ),
        }}
      />



    </Tab.Navigator>
  )
}

export default TabNavigator
