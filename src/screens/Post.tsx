import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



function Post() {
  return (
    <TouchableOpacity
    style={styles.container}
  
  >
    <View style={styles.header}>
      <Text style={styles.category}></Text>
      
    </View>

    <Text style={styles.title}></Text>
    
    <Text style={styles.content}></Text>

    <View style={styles.iconContainer}>
      
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "transparent",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      category: {
        fontSize: 12,
        backgroundColor: "#ff5a5f",
        color: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 8,
      },
      newBadge: {
        fontSize: 12,
        backgroundColor: "#ff5a5f",
        color: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
      },
      content: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
      },
      iconContainer: {
        alignItems: "flex-end",
      },
});

export default Post;