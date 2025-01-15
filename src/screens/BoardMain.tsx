import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import PostCard from "../components/post";
import RankingItem from "../components/RankingItem";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BoardScreenNavigationProp = StackNavigationProp<RootStackParamList, "BoardMain">;

type BoardMainProps = {
  navigation: BoardScreenNavigationProp;
};

const BoardMain: React.FC<BoardMainProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("게시판");
  const [rankingData, setRankingData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostPress = (id: string) => {
    navigation.navigate("PostCard", { postId: id });
  };

  const fetchTotalExp = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      const response = await axios.get(
        "http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/exp",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 200 && Array.isArray(response.data.data)) {
        const totalExpSum = response.data.data.reduce((sum: number, item: any) => sum + item.totalExp, 0);

        const sortedData = response.data.data.map((item: any, index: number) => {
          const percentage = totalExpSum > 0 ? ((item.totalExp / totalExpSum) * 100).toFixed(2) : "0.00";
          return {
            id: index.toString(),
            employeeName: item.employeeName,
            department: item.department,
            percentage: parseFloat(percentage),
          };
        });

        console.log("Sorted Data:", sortedData);
        setRankingData(sortedData.sort((a, b) => b.percentage - a.percentage));
      } else {
        console.error("Unexpected response format or status is not 0");
      }
    } catch (error) {
      console.error("Failed to fetch totalExp:", error.response?.data || error.message);
    }
  };

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      const response = await axios.get(
        "http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/board",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 200) {
        const formattedData = response.data.data.map((item: any, index: number) => ({
          id: index.toString(),
          title: item.title,
          content: item.contents,
          category: "기타",
          isNew: false,
          isChecked: false,
        }));
        setPostData(formattedData);
      } else {
        console.error("Failed to fetch post data1:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch post data2:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "랭킹") {
      fetchTotalExp();
    } else if (activeTab === "게시판") {
      fetchPostData();
    }
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "게시판" && styles.activeTab]}
          onPress={() => setActiveTab("게시판")}
        >
          <Text style={[styles.tabText, activeTab === "게시판" && styles.activeTabText]}>게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "랭킹" && styles.activeTab]}
          onPress={() => setActiveTab("랭킹")}
        >
          <Text style={[styles.tabText, activeTab === "랭킹" && styles.activeTabText]}>랭킹</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : activeTab === "게시판" ? (
        <FlatList
          data={postData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              category={item.category}
              title={item.title}
              content={item.content}
              isNew={item.isNew}
              isChecked={item.isChecked}
              onPress={() => handlePostPress(item.id)}
            />
          )}
        />
      ) : (
        <FlatList
          data={rankingData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RankingItem
              rank={index + 1}
              name={item.employeeName}
              team={item.department}
              progress={item.percentage}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabContainer: { flexDirection: "row", justifyContent: "center", backgroundColor: "#f5f5f5", padding: 10 },
  tabButton: { flex: 1, padding: 10, alignItems: "center" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#000" },
  tabText: { fontSize: 16, color: "#888" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default BoardMain;