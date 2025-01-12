import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function PostCardDetail() { 
    const route = useRoute();
    const { id } = route.params as { id : string }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시글 상세 페이지</Text>
      <Text style={styles.content}>게시글 ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#555",
  },
});