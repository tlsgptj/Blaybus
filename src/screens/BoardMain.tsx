import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import PostCard from "../components/post";
import RankingItem from "../components/RankingItem";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

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

  const fetchRankingData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/exp");
      setRankingData(response.data);
    } catch (error) {
      console.error("Failed to fetch ranking data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/board");
      if (response.data.status === 0) {
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
        console.error("Failed to fetch post data:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch post data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "랭킹") {
      fetchRankingData();
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
          renderItem={({ item }) => (
            <RankingItem
              rank={item.rank}
              name={item.name}
              team={item.team}
              progress={item.progress}
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
  rankingHeader: { backgroundColor: "#f5f5f5", padding: 20, alignItems: "center" },
  rankingText: { fontSize: 16, fontWeight: "bold" },
});

export default BoardMain;
