import React, { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Types
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

type AppContextType = {
  selectedStyle: StyleType | null;
  setSelectedStyle: (style: StyleType) => void;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  generatedImage: string | null;
  setGeneratedImage: (uri: string) => void;
  galleryImages: GalleryImageType[];
  addToGallery: (image: GalleryImageType) => void;
  removeFromGallery: (id: number) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([]);

  // Load gallery
  useEffect(() => {
    const loadGallery = async () => {
      const data = await AsyncStorage.getItem("@galleryImages");
      if (data) setGalleryImages(JSON.parse(data));
    };
    loadGallery();
  }, []);

  // Add image
  const addToGallery = async (image: GalleryImageType) => {
    setGalleryImages(prev => {
      const updatedGallery = [image, ...prev];
      AsyncStorage.setItem(
        "@galleryImages",
        JSON.stringify(updatedGallery)
      );
      return updatedGallery;
    });
  };

  // Delete image ✅ FIXED
  const removeFromGallery = async (id: number) => {
    console.log("app provider hit, id", id)
    setGalleryImages(prev => {
      const updatedGallery = prev.filter(img => img.id !== id);
      AsyncStorage.setItem(
        "@galleryImages",
        JSON.stringify(updatedGallery)
      );
      return updatedGallery;
    });
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
        removeFromGallery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};