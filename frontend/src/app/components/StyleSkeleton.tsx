import React from "react";
import { View, FlatList } from "react-native";

const SkeletonCard = () => {
  return (
    <View className="mr-4 items-center">
      <View
        style={{
          width: 192,
          height: 192,
          borderRadius: 12,
          backgroundColor: "#EAEAEA",
        }}
      />
    </View>
  );
};

type Props = {
  count?: number;
};

const StyleSkeleton = ({ count = 4 }: Props) => {
  return (
    <FlatList
      data={Array.from({ length: count })}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => <SkeletonCard />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default StyleSkeleton;