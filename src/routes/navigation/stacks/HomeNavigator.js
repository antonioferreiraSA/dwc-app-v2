import React, { useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeTitleContext } from '../../../context/HomeTitleContext'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from './navigationProps/navigationProps'
import HeaderStyle from './headerComponents/HeaderStyle'
import CustomDrawerContent from './Drawer/Menu'
import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'
import Profile from '../../../scenes/profile'
import Edit from '../../../scenes/edit'
import { EventsNavigator } from './EventsNavigator'
import { SermonNavigator } from './SermonNavigator'
import AdrianScreen from '../../../scenes/Adrian/Adrian'
import Give from '../../../scenes/Give'
import BaptismScreen from '../../../scenes/Baptism/Baptism'
import Volunteer from '../../../scenes/Volunteer/Volunteer'
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps
  const [title, setTitle] = useState('default title')

  return (

      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator screenOptions={navigationProps}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({

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
            <Stack.Screen
            name="Events"
            component={EventsNavigator}
            options={{
              headerShown: false,
              title: ctx.title,
              headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
            }}
          />
          <Stack.Screen
            name="Sermons"
            component={SermonNavigator}
            options={{
              headerShown: false,
              title: ctx.title,
              headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
            }}
          />
          <Stack.Screen
          name="Giving"
          component={Give}
          options={{
            headerShown: false,
            headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
          }}
        />
        <Stack.Screen
        name="Adrian"
        component={AdrianScreen}
        options={{
          headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
        }}
      />
      <Stack.Screen
        name="Baptism"
        component={BaptismScreen}
        options={{
          headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
        }}
      />
      <Stack.Screen
      name="Volunteer"
      component={Volunteer}
      options={{
        headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
      }}
    />
          </Stack.Navigator>
        )}
      </HomeTitleContext.Consumer>

  )
}



export const HomeNavigator = () => {
  return (
    <HomeStack />
  )
}
