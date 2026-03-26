import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

// ✅ Change this based on your device
//const BASE_URL = "http://10.0.2.2:5000";  // Android emulator
const BASE_URL = "http://localhost:5000";       // iOS simulator
// const BASE_URL = "http://192.168.1.x:5000";    // Physical device — replace x with your IP

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

  const [userImage, setUserImage]             = useState<string | null>(null);
  const [userImageBase64, setUserImageBase64] = useState<string | null>(null);
  const [loading, setLoading]                 = useState(false);

  // Pick image from device
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

  // Generate AI image
  const generateAIImage = async () => {
    if (!selectedStyle) return Alert.alert("Error", "No style selected!");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/generate`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:    selectedStyle.prompt,
          userImage: userImageBase64 || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to generate image");

      setGeneratedImage(data.uri);

    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "Error generating AI image");
    } finally {
      setLoading(false);
    }
  };

  // Save to gallery
  const saveToGallery = () => {
    if (!generatedImage) return;
    addToGallery({
      id:        Date.now(),
      uri:       generatedImage,
      style:     selectedStyle!.title,
      prompt:    selectedStyle!.prompt,
      createdAt: new Date().toISOString(),
    });
    Alert.alert("Success", "Saved to gallery!");
    setGeneratedImage(null);
    setUserImage(null);
    setUserImageBase64(null);
  };

  // Undo style selection
  const undoStyle = () => {
    setSelectedStyle(null);
    setGeneratedImage(null);
    setUserImage(null);
    setUserImageBase64(null);
  };

  if (!selectedStyle) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          No style selected
        </Text>
        <Button title="Select a Style" onPress={() => router.push("/")} />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }} className="mb-8">
      <Button title="Back to Styles" onPress={() => router.push("/")} />
      <Button title="Undo Style Selection" onPress={undoStyle} color="red" />

      <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 10 }}>
        Selected Style: {selectedStyle.title}
      </Text>

      <Image
        source={selectedStyle.previewImage}
        style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 10 }}
      />

      <Button title="Pick Image from Device (Optional)" onPress={pickImage} />

      {userImage && (
        <Image
          source={{ uri: userImage }}
          style={{ width: 200, height: 200, borderRadius: 10, marginVertical: 10 }}
        />
      )}

      <Button
        title={loading ? "Generating..." : "Generate AI Image"}
        onPress={generateAIImage}
        disabled={loading}
      />

      {loading && (
        <ActivityIndicator size="large" color="blue" style={{ marginVertical: 10 }} />
      )}

      {generatedImage && (
        <>
          <Image
            source={{ uri: generatedImage }}
            style={{ width: 300, height: 300, marginVertical: 10 }}
          />
          <Button title="Save to Gallery" onPress={saveToGallery} />
        </>
      )}
    </ScrollView>
  );
};

export default Create;