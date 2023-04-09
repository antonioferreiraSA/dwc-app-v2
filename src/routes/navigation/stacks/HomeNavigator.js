import React, { useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeTitleContext } from '../../../context/HomeTitleContext'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from './navigationProps/navigationProps'
import HeaderStyle from './headerComponents/HeaderStyle'

import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'
import Profile from '../../../scenes/profile'
import Edit from '../../../scenes/edit'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps
  const [title, setTitle] = useState('default title')

  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator screenOptions={navigationProps}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerShown: false,
                headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
              })}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                title: ctx.title,
                headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: ctx.title,
                headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
              }}
            />
            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{
                title: ctx.title,
                headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
              }}
            />
          </Stack.Navigator>
        )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}

const DrawerNavigator = () => {
  const navigationProps = scheme === 'dark' ? darkProps:lightProps
  const { scheme } = useContext(ColorSchemeContext)
  return (
    <Drawer.Navigator>
      <Drawer.Screen
      name="Home"
      component={HomeStack}
      options={({ navigation }) => ({

        headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
      })}
      />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}

export const HomeNavigator = () => {
  return (
    <DrawerNavigator />
  )
}
