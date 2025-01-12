import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
  } from "react-native";



function Main() {
  return (
    <ScrollView style={styles.container}>
    <View style={styles.card}>
      <View style={{ marginLeft: 10, }}>
        <Text style={styles.cardTitle}>실시간으로 확인하는 나의 퀘스트</Text>
        <Text style={styles.cardSubtitle}>놓치는 퀘스트가 없는 날까지</Text>
      </View>
    </View>

    <View style={styles.gridContainer}>
      {[
        { icon: "chatbubbles", label: "전체 게시판" },
        { icon: "flame", label: "실시간 인기" },
        { icon: "briefcase", label: "우리 부서" },
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
      <Text style={styles.sectionTitle}>최근 수정 경험치</Text>
      <Text style={styles.sectionSubtitle}>
        한눈에 나의 성과를 확인해보세요!
      </Text>
      <View style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
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
  )
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
        backgroundColor: "#FFFFFF",
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
        backgroundColor: "#FFFFFF",
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
        backgroundColor: "#FFFFFF",
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