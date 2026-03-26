import React, { useContext, useState } from "react";
import { ActivityIndicator, Button, Image, Text, View, ScrollView } from "react-native";
import { AppContext } from "../context/AppContext";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { selectedStyle, setSelectedStyle, generatedImage, setGeneratedImage, addToGallery } = appContext;
  const [userImage, setUserImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pick image from device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  };

  // Generate AI image based on style + picked image
  const generateAIImage = async () => {
    if (!userImage) return alert("Please pick an image first!");
    setLoading(true);

    const finalPrompt = selectedStyle!.prompt;

    // Simulate AI API call
    await new Promise((r) => setTimeout(r, 2000));
    setGeneratedImage("https://via.placeholder.com/512.png"); // placeholder AI image
    setLoading(false);
  };

  // Save to gallery
  const saveToGallery = () => {
    if (!generatedImage) return;
    addToGallery({
      id: Date.now(),
      uri: generatedImage,
      style: selectedStyle!.title,
      prompt: selectedStyle!.prompt,
      createdAt: new Date().toISOString(),
    });
    alert("Saved to gallery!");
    setGeneratedImage(null);
    setUserImage(null);
  };

  // Undo style selection
  const undoStyle = () => {
    setSelectedStyle(null);
    setGeneratedImage(null);
    setUserImage(null);
  };

  // Step 1: No style selected → show button to navigate to Style page
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

  // Step 2: Style selected → pick image + generate AI
  return (
    <ScrollView style={{ padding: 20 }}>
      <Button title="Back to Styles" onPress={() => router.push("/")} />
      <Button title="Undo Style Selection" onPress={undoStyle} color="red" />

      <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 10 }}>
        Selected Style: {selectedStyle.title}
      </Text>

      <Image
        source={selectedStyle.previewImage}
        style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 10 }}
      />

      <Button title="Pick Image from Device" onPress={pickImage} />

      {userImage && (
        <Image
          source={{ uri: userImage }}
          style={{ width: 200, height: 200, borderRadius: 10, marginVertical: 10 }}
        />
      )}

      <Button title="Generate AI Image" onPress={generateAIImage} disabled={!userImage} />

      {loading && <ActivityIndicator size="large" color="blue" style={{ marginVertical: 10 }} />}

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