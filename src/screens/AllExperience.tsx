import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";

interface AllExperienceProps {}

function AllExperience({}: AllExperienceProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요."
        />
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
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <View style={styles.recentBox}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.recentLabel}>인사평가</Text>
              <Text>A등급</Text>
            </View>
            <Text style={styles.recentValue}>01월 11일</Text>
            <Text style={styles.recentValue}>4500 do</Text>
          </View>

          <View style={styles.recentBox}>
            <Text style={styles.recentLabel}>인사평가</Text>
            <Text style={styles.recentValue}>01월 11일</Text>
            <Text style={styles.recentValue}>4500 do</Text>
          </View>

          <View style={styles.recentBox}>
            <Text style={styles.recentLabel}>인사평가</Text>
            <Text style={styles.recentValue}>01월 11일</Text>
            <Text style={styles.recentValue}>4500 do</Text>
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
  section: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
  searchContainer: {
   
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
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

export default AllExperience;
