import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons'
import { colors } from 'theme'
import ConnectLogo from '../../../../assets/icons/ConnectLogo'
import EventsLogo from '../../../../assets/icons/GroupsLogo'
import More from '../../../scenes/More/More'

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
  return (
    <Tab.Navigator
      options={{
        tabBarStyle: {
          // backgroundColor: 'white',
          // borderTopColor: 'gray',
          // borderTopWidth: 1,
          // paddingBottom: 5,
          // paddingTop: 5,
        }
      }}
      defaultScreenOptions={{
        headerShown: false,
        headerTransparent: true
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.lightPurple,
        tabBarInactiveTintColor: colors.gray,
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
