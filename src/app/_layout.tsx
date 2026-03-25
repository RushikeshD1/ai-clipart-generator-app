import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(bottom_tabs)'/>
    </Stack>
  )
}

export default RootLayout