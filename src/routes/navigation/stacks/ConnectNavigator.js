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
import SundaySchool from '../../../scenes/SundaySchool/SundaySchool'
import Location from '../../../scenes/Location'
import { FollowFollowerNavigator } from '../toptabs/followfollowerNavigator'
import More from '../../../scenes/More'
import Connect from '../../../scenes/connect'
import AdrianScreen from '../../../scenes/Adrian/Adrian'
import VideoPlayerScreen from '../../../scenes/Adrian/VideoPlayera'
import Announcments from '../../../scenes/Announcments/Announcments'
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
            headerTitle: null,

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
    headerTitle: null,

    headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
  })}
/>
<Stack.Screen
name="AdrianScreen"
component={AdrianScreen}
options={({ navigation }) => ({
  title: 'Dr Adrian ',


  headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
})}
/>
<Stack.Screen
name="SundaySchool"
component={SundaySchool}
options={({ navigation }) => ({

  headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
})}
/>
<Stack.Screen
name="VideoPlayer"
component={VideoPlayerScreen}
options={({ navigation }) => ({

  headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
})}
/>
<Stack.Screen
name="Announcments"
component={Announcments}
options={({ navigation }) => ({

  headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
})}
/>

      </RootStack.Group>
    </Stack.Navigator>
  )
}
