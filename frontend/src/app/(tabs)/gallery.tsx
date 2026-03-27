import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import { AppContext } from "../context/AppContext";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system/legacy";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/gallery.style";
import GallerySkeleton from "../components/GallerySkeleton";
import * as Sharing from 'expo-sharing';

const { width } = Dimensions.get("window");
const IMAGE_SIZE = (width - 48) / 2;

const Gallery = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { galleryImages, removeFromGallery } = appContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync();
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const saveToGallery = async (imageUri: string) => {
    try {
      let localUri = imageUri;

      if (imageUri.startsWith("data:image")) {
        const base64 = imageUri.split(",")[1];
        localUri = FileSystem.cacheDirectory + `clipart-${Date.now()}.png`;

        await FileSystem.writeAsStringAsync(localUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const asset = await MediaLibrary.createAssetAsync(localUri);
      await MediaLibrary.createAlbumAsync("AI Clipart", asset, false);

      Alert.alert("Saved", "Image added to device gallery 📸");
    } catch {
      Alert.alert("Error", "Failed to save image");
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert("Delete Image", "Remove this image from app gallery?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => removeFromGallery(id) },
    ]);
  };

  const shareImage = async (imageUri: string) => {
  try {
    let uri = imageUri;

    // If base64, write to a temporary file
    if (imageUri.startsWith("data:image")) {
      const base64 = imageUri.split(",")[1];
      uri = FileSystem.cacheDirectory + `clipart-share-${Date.now()}.png`;

      await FileSystem.writeAsStringAsync(uri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

    // Expo Sharing requires file:// URI
    if (!uri.startsWith("file://")) {
      uri = "file://" + uri;
    }

    // Check if sharing is available
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert("Error", "Sharing is not available on this device");
      return;
    }

    await Sharing.shareAsync(uri, {
      dialogTitle: "Check out this clipart!",
    });
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to share image");
  }
};

  if (loading) return <GallerySkeleton />;

  if (!galleryImages.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🎨</Text>
        <Text style={styles.emptyText}>
          No clipart yet.
          {"\n"}Create and save your first design.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Gallery</Text>
        <Text style={styles.subtitle}>{galleryImages.length} saved images</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={galleryImages}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Delete */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => confirmDelete(item.id)}
            >
              <MaterialCommunityIcons name="close" size={16} color="#fff" />
            </TouchableOpacity>

            {/* Save */}
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => saveToGallery(item.uri)}
            >
              <MaterialCommunityIcons name="download" size={18} color="#fff" />
            </TouchableOpacity>

            {/* Share button (next to download) */}
            <TouchableOpacity
              style={[styles.saveBtn, { right: 48 }]} // shift left of download
              onPress={() => shareImage(item.uri)}
            >
              <MaterialCommunityIcons name="share-variant" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Gallery;