import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function PostCardDetail() { 
    const route = useRoute();
    const { id } = route.params as { id : string }; 

  return (
    <View style={styles.container}>
      <Text style={styles.team}>인사팀</Text>
      <Text style={styles.title}>게시글 상세 페이지</Text>
      <Text style={styles.content}>게시글 ID: {id}</Text>
      <Text style={styles.like}>300</Text>
      <Text style={styles.eyes}>40</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  team : {
    backgroundColor: "#575555",
    color : "#fff",
    fontSize : 10,
    borderRadius: 20
  },
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
  like : {
    fontSize: 10,
    color: "#575555"
  },
  eyes : {
    fontSize: 10,
    color: "#575555"
  }
});