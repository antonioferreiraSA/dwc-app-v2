import React, { useState, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTitleContext } from "../../../../context/HomeTitleContext";

import Post from "../../../../scenes/post";
import Print from "../../../../scenes/print";
import Announcments from "../../../../scenes/Announcments/Announcments";

const Stack = createStackNavigator()

export const ModalStacks = () => {

  return (
    <HomeTitleContext.Provider
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen
              name='Post'
              component={Post}
              options={{
                title: ctx.title,
                headerBackTitle: '',
              }}
            />
            <Stack.Screen
              name='Print'
              component={Print}
            />
            <Stack.Screen
            name='Announcments'
            component={Announcments}
          />
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}
