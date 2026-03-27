import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const IMAGE_SIZE = (width - 48) / 2;

export const styles = {
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },

  card: {
    width: IMAGE_SIZE,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },

  saveBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#777",
    textAlign: "center",
  },
  shareBtn: {
  position: "absolute",
  top: 8,
  right: 40, // adjust so it doesn't overlap save/delete
  backgroundColor: "#1DA1F2",
  padding: 6,
  borderRadius: 6,
  zIndex: 2,
},
};