import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5548E7",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },

  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },

  userImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },

  primaryBtn: {
    backgroundColor: "#5548E7",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 10,
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: 12,
    paddingRight: 12
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  resultCard: {
    marginTop: 20,
    alignItems: "center",
  },

  resultImage: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    marginBottom: 14,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
});