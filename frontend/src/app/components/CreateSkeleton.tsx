import React from "react";
import { View } from "react-native";

const SkeletonBox = ({
  width,
  height,
  radius = 12,
  style = {},
}: any) => (
  <View
    style={[
      {
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#E5E7EB",
        marginBottom: 12,
      },
      style,
    ]}
  />
);

const CreateSkeleton = () => {
  return (
    <View>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SkeletonBox width={70} height={16} />
        <SkeletonBox width={50} height={16} />
      </View>

      {/* Style card */}
      <SkeletonBox width="100%" height={220} radius={16} />

      {/* Upload card */}
      <SkeletonBox width="100%" height={140} radius={16} />

      {/* Button */}
      <SkeletonBox width="100%" height={52} radius={26} />

      {/* Result */}
      <SkeletonBox width="100%" height={280} radius={16} />
    </View>
  );
};

export default CreateSkeleton;