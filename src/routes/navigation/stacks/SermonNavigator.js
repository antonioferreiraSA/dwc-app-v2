import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { UserDataContext } from '../../../context/UserDataContext'

import { lightProps, darkProps } from './navigationProps/navigationProps'
import HeaderStyle from './headerComponents/HeaderStyle'
import HeaderRightButton from '../../../components/HeaderRightButton'
import { colors, fontSize } from '../../../theme'
import { FollowFollowerNavigator } from '../toptabs/followfollowerNavigator'

const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const SermonNavigator = () => {
  const { scheme, toggleScheme  } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText,
    container: isDark? colors.darknav : colors.lightnav,


  }
  const { userData } = useContext(UserDataContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps

  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <RootStack.Group>
        <Stack.Screen
          name="Connect"
          component={FollowFollowerNavigator}
          options={({ navigation }) => ({
            title: 'Sermons',
            headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
          })}
        />
      </RootStack.Group>
    </Stack.Navigator>
  )
}
