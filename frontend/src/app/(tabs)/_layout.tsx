import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
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
          height: 80,
          position: "absolute",
          overflow: "visible",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            tint="light"
            experimentalBlurMethod={
              Platform.OS === "android"
                ? "dimezisBlurView"
                : undefined
            }
            style={{
              flex: 1,
            }}
          >
            {/* ✅ Android fallback */}
            {Platform.OS === "android" && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.85)",
                }}
              />
            )}
          </BlurView>
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
          tabBarLabel: () => null,

          tabBarItemStyle: {
            overflow: "visible",
            paddingBottom: 12,
          },

          tabBarIcon: () => (
            <View
              style={{
                marginTop: -35,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 10,
                borderRadius: 50
              }}
            >
              <LinearGradient
                colors={["#5548E7", "#208AC2", "#36EBAE"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 34,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons name="plus" size={34} color="#fff" />
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
