import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LatestVideosScreen from '../../../../scenes/follow/Follow'


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

    </Stack.Navigator>
  )
}
