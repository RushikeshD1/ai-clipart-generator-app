import React, { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types for styles and gallery images
export type StyleType = {
  id: string;
  title: string;
  prompt: string;
  previewImage: any;
};

export type GalleryImageType = {
  id: number;
  uri: string;
  style: string;
  prompt: string;
  createdAt: string;
};

// Context type
type AppContextType = {
  selectedStyle: StyleType | null;
  setSelectedStyle: (style: StyleType) => void;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  generatedImage: string | null;
  setGeneratedImage: (uri: string) => void;
  galleryImages: GalleryImageType[];
  addToGallery: (image: GalleryImageType) => void;
};

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Props type for Provider
type AppProviderProps = {
  children: ReactNode;
};

// AppProvider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([]);

  // Load gallery from AsyncStorage
  useEffect(() => {
    const loadGallery = async () => {
      const data = await AsyncStorage.getItem("@galleryImages");
      if (data) setGalleryImages(JSON.parse(data));
    };
    loadGallery();
  }, []);

  // Add image to gallery
  const addToGallery = async (image: GalleryImageType) => {
    const newGallery = [image, ...galleryImages];
    setGalleryImages(newGallery);
    await AsyncStorage.setItem("@galleryImages", JSON.stringify(newGallery));
  };

  return (
    <AppContext.Provider
      value={{
        selectedStyle,
        setSelectedStyle,
        userPrompt,
        setUserPrompt,
        generatedImage,
        setGeneratedImage,
        galleryImages,
        addToGallery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};