import React, {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { screenOptions } from './navigationProps/navigationProps'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext';
import { colors } from '../../../theme';
import { FollowNavigator } from '../stacks/topTabStacks/FollowNavigator'
import { FollowerNavigator } from '../stacks/topTabStacks/FollowerNavigator'
import {LatestVideosScreen} from '../../../scenes/Youtube/LatestVideosScreen'
const Tab = createMaterialTopTabNavigator()

export const FollowFollowerNavigator = () => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    container: isDark? colors.darknav : colors.lightnav,
    border: isDark? colors.darkborder : colors.lightborder,
    inactive: isDark? colors.iconsdark : colors.iconslight,
  }
  return (
    <Tab.Navigator
      initialRouteName="FollowTab"
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: colorScheme.container,

    },

     })}



    >
      <Tab.Screen
        name="FollowTab"
        component={FollowNavigator}
        options={{ tabBarLabel: 'Recent Sermon' }}
      />
      <Tab.Screen
        name="FollowerTab"
        component={FollowerNavigator}
        options={{ tabBarLabel: 'Previous Sermon' }}
      />
    </Tab.Navigator>
  )
}
