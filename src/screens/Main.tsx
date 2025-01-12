import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HomeStackParamList } from "../navigations/stack/HomeStackNavigator";
import { homeNavigatons } from "../constants";


function Main() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cardTitle}>실시간으로 <br />확인하는 나의 퀘스트</Text>
          <Text style={styles.cardSubtitle}>놓치는 퀘스트가 없는 날까지</Text>
        </View>
        <View>
          <Image
            source={{
              uri: "data:image/png;base64,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",
            }}
          />
        </View>
      </View>

      <View style={styles.gridContainer}>
        {[
          { icon: "chatbubbles", label: "전체 게시판" },
          { icon: "flame", label: "실시간 인기" },
          { icon: "briefcase", label: "할일" },
          { icon: "calendar", label: "캘린더" },
        ].map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Text style={styles.sectionTitle}>{item.label}</Text>
            <Text style={styles.sectionSubtitle}>
              실시간으로
              <br /> 확인해보세요!
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>나의 경험치</Text>
        <Text style={styles.sectionSubtitle}>
          오늘도 나의 경험치를 확인해보세요!
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <View style={styles.experienceBox}>
            <Text style={styles.experienceValue}>85%</Text>
            <Text style={styles.experienceLabel}>올해의 직급 경험치</Text>
          </View>
          <View style={styles.experienceBox}>
            <Text style={styles.experienceValue}>37%</Text>
            <Text style={styles.experienceLabel}>누적된 직급 경험치</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.sectionTitle}>최근 흭득 경험치</Text>
            <Text style={styles.sectionSubtitle}>
              한눈에 나의 성과를 확인해보세요!
            </Text>
          </View>
          <View>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <View style={styles.recentBox}>
            <Text style={styles.recentLabel}>인사평가</Text>
            <Text style={styles.recentValue}>01월 11일</Text>
            <Text style={styles.recentValue}>4500 do</Text>
          </View>
          <View style={styles.recentBox}>
            <Text style={styles.recentLabel}>직무별 퀘스트</Text>
            <Text style={styles.recentValue}>01월 11일</Text>
            <Text style={styles.recentValue}>80 do</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color:"white"
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 16,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  gridText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  section: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  experienceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  experienceBox: {
    width: "48%",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  experienceValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6F61",
  },
  experienceLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  recentBox: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
  },
  recentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recentValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6F61",
  },
});

export default Main;
