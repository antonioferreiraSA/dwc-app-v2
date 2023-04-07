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
const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const ConnectNavigator = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const { userData } = useContext(UserDataContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps

  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <RootStack.Group>
        <Stack.Screen
          name="Connect"
          component={Connect}
          options={({ navigation }) => ({
            headerShown:false,

            headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
            headerRight: () => <HeaderRightButton from='Connect' userData={userData} />
          })}
        />
        <Stack.Screen
        name="Baptism"
        component={BaptismScreen}
        options={({ navigation }) => ({

          headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
        })}
      />
      <Stack.Screen
      name="Location"
      component={Location}
      options={({ navigation }) => ({

        headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
      })}
    />
    <Stack.Screen
    name="Volunteer"
    component={Volunteer}
    options={({ navigation }) => ({

      headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
    })}
  />
  <Stack.Screen
  name="PrayerRequest"
  component={PrayerRequest}
  options={({ navigation }) => ({

    headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
  })}
/>
      </RootStack.Group>
    </Stack.Navigator>
  )
}
