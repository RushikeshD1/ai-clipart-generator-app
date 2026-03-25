import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { CARTOON_STYLES } from "../constants/cartoon";
import { Image } from "react-native";

const Style = () => {

  const renderCartoonItem = ({ item }: any) => {
    console.log(item)
    return (
      <Pressable className="mr-4 items-center">
      <View
        className="w-48 h-48 rounded-lg border border-white"
      >
        <Image
          source={item.previewImage}
          style={{ width: "100%", height: "100%"}}
          resizeMode="contain"
          className="rounded-lg"
        />
      </View>
    </Pressable>
    )
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-semibold mb-3">Cartoon</Text>

      <FlatList
        data={CARTOON_STYLES}
        renderItem={renderCartoonItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Style;
