import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function PostCardDetail() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [postData, setPostData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      const response = await axios.get(
        `http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/board/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 0) {
        setPostData(response.data.data);
      } else {
        console.error("Failed to fetch post data:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch post data:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!postData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load post data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/arrow2.png")}
          style={styles.icon}
        />
        <Text style={styles.team}>{postData.team || "Unknown Team"}</Text>
      </View>
      <Text style={styles.title}>{postData.title || "제목 없음"}</Text>
      <Text style={styles.content}>{postData.contents || "내용 없음"}</Text>
      <View style={styles.statsContainer}>
        <Image
          source={require("../../assets/images/heart.png")}
          style={styles.icon}
        />
        <Text style={styles.statsText}>{postData.likes || 0}</Text>
        <Image
          source={require("../../assets/images/eyes.png")}
          style={styles.icon}
        />
        <Text style={styles.statsText}>{postData.views || 0}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  team: {
    backgroundColor: "#575555",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    fontSize: 12,
    color: "#575555",
    marginLeft: 4,
    marginRight: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
  },
});
