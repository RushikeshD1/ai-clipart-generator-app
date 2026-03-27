import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles/create.style";
import CreateSkeleton from "../components/CreateSkeleton";

const BASE_URL = "https://ai-clipart-generator-app.vercel.app";

const Create = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const {
    selectedStyle,
    setSelectedStyle,
    generatedImage,
    setGeneratedImage,
    addToGallery,
  } = appContext;

  const [userImage, setUserImage] = useState<string | null>(null);
  const [userImageBase64, setUserImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
      setUserImageBase64(result.assets[0].base64 || null);
    }
  };

  const generateAIImage = async () => {
    if (!selectedStyle || !userImage) return;
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: selectedStyle.prompt,
          userImage: userImageBase64,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Generation failed");

      setGeneratedImage(data.uri);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveToGallery = () => {
    if (!generatedImage) return;
    addToGallery({
      id: Date.now(),
      uri: generatedImage,
      style: selectedStyle!.title,
      prompt: selectedStyle!.prompt,
      createdAt: new Date().toISOString(),
    });

    Alert.alert("Saved", "Image added to gallery");
    setGeneratedImage(null);
    setUserImage(null);
    setUserImageBase64(null);
  };

  const undoStyle = () => {
    setSelectedStyle(null);
    setGeneratedImage(null);
    setUserImage(null);
    setUserImageBase64(null);
  };

  if (!selectedStyle) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No style selected</Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push("/")}
        >
          <Text style={styles.primaryText}>Select Style</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {loading ? (
        <CreateSkeleton />
      ) : (
        <>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.link}>← Styles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={undoStyle}>
              <Text style={[styles.link, { color: "#e53935" }]}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Style Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{selectedStyle.title}</Text>
            <Image
              source={selectedStyle.previewImage}
              style={styles.previewImage}
            />
          </View>

          {/* Upload */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={pickImage}
            >
              <Text style={styles.secondaryText}>Pick from device</Text>
            </TouchableOpacity>

            {userImage && (
              <Image source={{ uri: userImage }} style={styles.userImage} />
            )}
          </View>

          {/* Generate */}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              !userImage && { opacity: 0.5 },
            ]}
            onPress={generateAIImage}
            disabled={!userImage}
          >
            <Text style={styles.primaryText}>Generate AI Image</Text>
          </TouchableOpacity>

          {/* Result */}
          {generatedImage && (
            <View style={styles.resultCard}>
              <Image
                source={{ uri: generatedImage }}
                style={styles.resultImage}
              />

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={saveToGallery}
              >
                <Text style={styles.primaryText}>Save to Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Create;