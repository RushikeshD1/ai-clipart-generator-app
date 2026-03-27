import React, { useContext, useEffect } from "react";
import { FlatList, Pressable, ScrollView, Text, View, Image } from "react-native";
import { CARTOON_STYLES } from "../constants/cartoon";
import { ANIME_STYLES } from "../constants/anime";
import { PIXEL_STYLES } from "../constants/pixel";
import { FLAT_ILLUSTRATION_STYLES } from "../constants/flat_illustration";
import { SKETCH_STYLES } from "../constants/sketch";
import { AppContext } from "../context/AppContext";
import { useRouter } from "expo-router";
import StyleSkeleton from "../components/StyleSkeleton";

const Index = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { setSelectedStyle, stylesLoaded, setStylesLoaded } = appContext;

  // ✅ Runs ONLY once in app lifetime
  useEffect(() => {
    if (!stylesLoaded) {
      setTimeout(() => {
        setStylesLoaded(true);
      }, 2000);
    }
  }, []);

  const handleSelectStyle = (item: any) => {
    setSelectedStyle(item);
    router.push("/(tabs)/create");
  };

  const renderItem = ({ item }: any) => (
    <Pressable onPress={() => handleSelectStyle(item)} style={{ marginRight: 16 }}>
      <View
        style={{
          width: 192,
          height: 192,
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: "#fff",
          elevation: 4,
        }}
      >
        <Image
          source={item.previewImage}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );

  const Section = ({ title, data }: any) => (
    <>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        {title}
      </Text>

      {!stylesLoaded ? (
        <StyleSkeleton />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </>
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ padding: 16 }}>
        <Section title="Cartoon" data={CARTOON_STYLES} />
        <Section title="Anime" data={ANIME_STYLES} />
        <Section title="Pixel Art" data={PIXEL_STYLES} />
        <Section title="Flat Illustration" data={FLAT_ILLUSTRATION_STYLES} />
        <Section title="Sketch" data={SKETCH_STYLES} />
      </View>
    </ScrollView>
  );
};

export default Index;