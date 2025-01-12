import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import PostCard from "../components/post"; 
import Ranking from "../components/ranking";
import { useNavigation } from "@react-navigation/native";



const dummyPostData = [
  {
    id: "1",
    category: "인사팀",
    title: "속보 회사 휴가 10일",
    content: "Lorem ipsum dolor sit amet",
    isNew: false,
    isChecked: false,
  },
  {
    id: "2",
    category: "IT부서",
    title: "속보 회사 휴가 10일",
    content: "Lorem ipsum dolor sit amet",
    isNew: true,
    isChecked: true,
  },
  {
    id: "3",
    category: "기획부",
    title: "속보 회사 휴가 10일",
    content: "Lorem ipsum dolor sit amet",
    isNew: false,
    isChecked: false,
  },
];

const dummyRankingData = [
  { id: "1", name: "김지수", team: "사업기획팀", rank: 1, progress: 90 },
  { id: "2", name: "김지수", team: "사업기획팀", rank: 2 , progress: 80},
  { id: "3", name: "김지수", team: "사업기획팀", rank: 3 , progress : 70},
  { id: "4", name: "김지수", team: "사업기획팀", rank: 4 , progress : 60},
  { id: "5", name: "김지수", team: "사업기획팀", rank: 5 , progress : 50},
];

export default function App() {
  const [activeTab, setActiveTab] = useState("게시판");
  const navigation = useNavigation();

  const handlePostPress = ( id: string ) => {
    //navigation.navigate("PostCardDetail/[id].tsx", { id });
  }

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

      {activeTab === "게시판" ? (
        <FlatList
          data={dummyPostData}
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
        <View>
          <View style={styles.rankingHeader}>
            <Text style={styles.rankingText}>실시간으로 확인하는 나의 퀘스트</Text>
          </View>
          <FlatList
            data={dummyRankingData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Ranking
                rank={item.rank}
                name={item.name}
                team={item.team}
                progress={item.progress}
              />
            )}
          />
        </View>
      )}
    </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  rankingHeader: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },
  rankingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rankingNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  rankingName: {
    fontSize: 14,
    flex: 1,
  },
  rankingTeam: {
    fontSize: 12,
    color: "#666",
  },
});
