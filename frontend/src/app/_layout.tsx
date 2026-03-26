import { Stack } from "expo-router";
import React from "react";
import "../../global.css";
import { AppProvider } from "./context/AppContext";

const RootLayout = () => {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProvider>
  );
};

export default RootLayout;
