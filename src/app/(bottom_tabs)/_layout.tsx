import React from 'react'
import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

const TabRoot = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

        <Tabs.Screen name='index' options={{
          title:"HOME",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
        ),  
        }}/>
        <Tabs.Screen name='create' options={{
          title:"CREATE",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="circle-with-plus" size={24} color={color} />
        ),  
        }}/>
        <Tabs.Screen name='gallery' options={{
          title:"GALLERY",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images" size={24} color={color} />
        ),  
        }}/>
    </Tabs>
  )
}

export default TabRoot