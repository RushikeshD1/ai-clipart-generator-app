import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { AppContext } from "../context/AppContext";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = (width - 48) / 2;

const Gallery = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { galleryImages, removeFromGallery } = appContext;

  const confirmDelete = (id: number) => {
    console.log("comfirmDelete hit", id)
    Alert.alert(
      "Delete Image",
      "Are you sure you want to remove this image?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Deleting image id:", id);
            removeFromGallery(id);
          },
        },
      ]
    );
  };

  // ✅ Empty State
  if (!galleryImages || galleryImages.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 48, marginBottom: 16 }}>🎨</Text>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            color: "gray",
          }}
        >
          Your gallery is empty.
          {"\n"}Create and save clipart to see them here.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          🎨 My Gallery
        </Text>
        <Text style={{ color: "gray", marginTop: 4 }}>
          {galleryImages.length} image
          {galleryImages.length !== 1 ? "s" : ""} saved
        </Text>
      </View>

      {/* Image Grid */}
      <FlatList
        data={galleryImages}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          padding: 12,
          paddingBottom: 100,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: IMAGE_SIZE,
              backgroundColor: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            {/* Image */}
            <Image
              source={{ uri: item.uri }}
              style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              resizeMode="cover"
            />

            {/* Info */}
            <View style={{ padding: 8 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#333",
                }}
                numberOfLines={1}
              >
                {item.style}
              </Text>

              <Text
                style={{
                  fontSize: 11,
                  color: "gray",
                  marginTop: 2,
                }}
                numberOfLines={2}
              >
                {item.prompt}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  color: "#bbb",
                  marginTop: 4,
                }}
              >
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => confirmDelete(item.id)}
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                backgroundColor: "rgba(0,0,0,0.55)",
                borderRadius: 20,
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Gallery;