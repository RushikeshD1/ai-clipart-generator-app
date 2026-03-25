import React from "react";
import { Text, View } from "react-native";

const Gallery = () => {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="text-center font-semibold text-xl text-gray-500">
        Your gallery awaits your saved cliparts. Visit the 'Create' section to
        begin and remember to save
      </Text>
    </View>
  );
};

export default Gallery;
