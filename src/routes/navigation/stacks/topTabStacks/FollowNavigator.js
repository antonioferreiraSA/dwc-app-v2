import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LatestVideosScreen from '../../../../scenes/follow/Follow'
import VideoPlayerScreen from '../../../../scenes/follow/VideoPlayer'


const Stack = createStackNavigator()

export const FollowNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="Follow"
        component={LatestVideosScreen}
      />
      <Stack.Screen
      name="VideoPlayerScreen"
      component={VideoPlayerScreen}
    />

    </Stack.Navigator>
  )
}
