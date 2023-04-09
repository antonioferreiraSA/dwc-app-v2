import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { UserDataContext } from '../../../context/UserDataContext'

import { lightProps, darkProps } from './navigationProps/navigationProps'
import HeaderStyle from './headerComponents/HeaderStyle'
import HeaderRightButton from '../../../components/HeaderRightButton'
import BaptismScreen from '../../../scenes/Baptism/Baptism'
import Volunteer from '../../../scenes/Volunteer/Volunteer'
import PrayerRequest from '../../../scenes/PrayerRequest/PrayerRequests'
import Location from '../../../scenes/Location'
import { FollowFollowerNavigator } from '../toptabs/followfollowerNavigator'
import Connect from '../../../scenes/connect'
import Events from '../../../scenes/Events/Events'
const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const EventsNavigator = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const { userData } = useContext(UserDataContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps

  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <RootStack.Group>
        <Stack.Screen
          name="Events"
          component={Events}
          options={({ navigation }) => ({


            headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,

          })}
        />

      </RootStack.Group>
    </Stack.Navigator>
  )
}
