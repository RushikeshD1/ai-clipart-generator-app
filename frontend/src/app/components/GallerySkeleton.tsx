import React from "react";
import { View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = (width - 48) / 2;

const SkeletonBox = ({ style }: any) => (
  <View
    style={[
      {
        backgroundColor: "#E5E7EB",
        borderRadius: 16,
      },
      style,
    ]}
  />
);

const GallerySkeleton = () => {
  return (
    <View style={{ padding: 16 }}>
      {/* Header */}
      <SkeletonBox style={{ width: 140, height: 20, marginBottom: 8 }} />
      <SkeletonBox style={{ width: 100, height: 14, marginBottom: 24 }} />

      {/* Grid */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SkeletonBox
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 16 }}
        />
        <SkeletonBox
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 16 }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SkeletonBox
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 16 }}
        />
        <SkeletonBox
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 16 }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SkeletonBox
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 16 }}
        />
        <SkeletonBox
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 16 }}
        />
      </View>
    </View>
  );
};

export default GallerySkeleton;