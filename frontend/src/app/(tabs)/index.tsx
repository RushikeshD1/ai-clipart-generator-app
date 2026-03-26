import React, { useContext } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { CARTOON_STYLES } from "../constants/cartoon";
import { ANIME_STYLES } from "../constants/anime"
import { PIXEL_STYLES } from "../constants/pixel"
import { FLAT_ILLUSTRATION_STYLES } from "../constants/flat_illustration"
import { SKETCH_STYLES } from "../constants/sketch"
import { Image } from "react-native";
import { AppContext } from "../context/AppContext";
import { useRouter } from "expo-router";

const Index = () => {

  const router = useRouter()

  const appContext = useContext(AppContext);
  if (!appContext) return null

  const { setSelectedStyle } = appContext;

  // Handle style click
  const handleSelectStyle = (item: any) => {
    setSelectedStyle(item);             
    router.push(`/(tabs)/create`);    
  };

  const renderCartoonItem = ({ item }: any) => {
    return (
      <Pressable className="mr-4 items-center" onPress={() => handleSelectStyle(item)}>
      <View
        className="w-48 h-48 rounded-lg border border-white"
      >
        <Image
          source={item.previewImage}
          style={{ width: "100%", height: "100%"}}
          resizeMode="cover"
          className="rounded-lg"
        />
      </View>
    </Pressable>
    )
  };

  return (

    <ScrollView
      className="flex-1 mb-8"
      showsVerticalScrollIndicator={false}
      accessible={false}
    >
    <View className="p-4">
      <Text className="text-xl font-semibold mb-3">Cartoon</Text>

      <FlatList
        data={CARTOON_STYLES}
        renderItem={renderCartoonItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text className="text-xl font-semibold mt-3 mb-3">Anime</Text>

      <FlatList
        data={ANIME_STYLES}
        renderItem={renderCartoonItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text className="text-xl font-semibold mt-3 mb-3">Pixel art</Text>

      <FlatList
        data={PIXEL_STYLES}
        renderItem={renderCartoonItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text className="text-xl font-semibold mt-3 mb-3">Flat illustration</Text>

      <FlatList
        data={FLAT_ILLUSTRATION_STYLES}
        renderItem={renderCartoonItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text className="text-xl font-semibold mt-3 mb-3">Sketch</Text>

      <FlatList
        data={SKETCH_STYLES}
        renderItem={renderCartoonItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

    </View>
    </ScrollView>

    
  );
};

export default Index;