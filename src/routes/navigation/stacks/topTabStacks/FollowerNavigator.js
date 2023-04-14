import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Follower from '../../../../scenes/follower'
import VideoPlayerScreen from '../../../../scenes/follow/VideoPlayer'

const Stack = createStackNavigator()

export const FollowerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="Follower"
        component={Follower}
      />
      <Stack.Screen
      name="VideoPlayerScreen"
      component={VideoPlayerScreen}
    />
    </Stack.Navigator>
  )
}
