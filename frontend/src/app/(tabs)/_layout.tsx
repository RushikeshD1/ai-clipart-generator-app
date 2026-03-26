import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { BlurView } from "expo-blur";

const TabRoot = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: ({ tintColor }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={24}
              color={tintColor}
            />
            <Text className="text-xl font-bold">AI ClipArt</Text>
          </View>
        ),

        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={45}
            tint="light"
            style={{
              flex: 1,
            }}
          />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "STYLE",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="color-lens" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.18,
                shadowRadius: 4,
                elevation: 5,
              }}
              className="rounded-full -mt-4"
            >
              <LinearGradient
                colors={["#5548E7", "#208AC2", "#36EBAE"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-full p-4"
              >
                <MaterialCommunityIcons name="plus" size={32} color="white" />
              </LinearGradient>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="gallery"
        options={{
          title: "GALLERY",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-grid"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabRoot;
