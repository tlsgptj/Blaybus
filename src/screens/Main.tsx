import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

function Main() {
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <View>
          <Image
            source={require("../assets/images/mainpage/DH_SIMBOL-LOGO_FN.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View>
          <Image
            source={require("../assets/images/mainpage/Bell.png")}
            style={{ width: 30, height: 30, marginTop: 10 }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: 10,
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.cardTitle}>
              실시간으로 <br />
              확인하는 나의 퀘스트
            </Text>
            <Text style={styles.cardSubtitle}>놓치는 퀘스트가 없는 날까지</Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/mainpage/alarm.png")}
              style={{ width: 50, height: 60 }}
            />
          </View>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <View style={styles.gridItemContainer}>
            <View>
              <Text style={styles.sectionTitle}>전체 게시판</Text>
              <Text style={styles.sectionSubtitle}>
                실시간으로
                <br />확인해보세요!
              </Text>
            </View>
            <View style={styles.gridImgContainer}>
              <Image
                source={require("../assets/images/mainpage/note.png")}
                style={styles.gridImg}
              />
            </View>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.gridItemContainer}>
            <View>
              <Text style={styles.sectionTitle}>랭킹</Text>
              <Text style={styles.sectionSubtitle}>
                실시간으로
                <br />확인해보세요!
              </Text>
            </View>
            <View style={styles.gridImgContainer}>
              <Image
                source={require("../assets/images/mainpage/fire.png")}
                style={styles.gridImg}
              />
            </View>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.gridItemContainer}>
            <View>
              <Text style={styles.sectionTitle}>할일</Text>
              <Text style={styles.sectionSubtitle}>
                실시간으로
                <br />확인해보세요!
              </Text>
            </View>
            <View style={styles.gridImgContainer}>
              <Image
                source={require("../assets/images/mainpage/briefcase.png")}
                style={styles.gridImg}
              />
            </View>
          </View>
        </View>

        <View style={styles.gridItem}>
          <View style={styles.gridItemContainer}>
            <View>
              <Text style={styles.sectionTitle}>전체 게시판</Text>
              <Text style={styles.sectionSubtitle}>
                실시간으로
                <br />확인해보세요!
              </Text>
            </View>
            <View style={styles.gridImgContainer}>
              <Image
                source={require("../assets/images/mainpage/calendar.png")}
                style={styles.gridImg}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>나의 경험치</Text>
        <Text style={styles.sectionSubtitle}>
          오늘도 나의 경험치를 확인해보세요!
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <View style={styles.experienceBox}>
            <View>
              <Text style={styles.experienceLabel}>
                올해의 <br />적립 경험치
              </Text>
            </View>
            <View style={{display:"flex", flexDirection:"row",justifyContent:"flex-end"}}>
              <Text style={styles.experienceValue}>85%</Text>
            </View>
          </View>

          <View style={styles.experienceBox}>
            <View>
              <Text style={styles.experienceLabel}>누적된 <br />적립 경험치</Text>
            </View>
            <View style={{display:"flex", flexDirection:"row",justifyContent:"flex-end"}}>
              <Text style={styles.experienceValue}>37%</Text>
            </View>
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
          <TouchableOpacity>
            <Text style={styles.moreText}>더보기 &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>인사평가</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>N</Text>
              </View>
              <View style={styles.rank}><Text style={styles.rankText}>A등급</Text></View>
            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>인사평가</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>N</Text>
              </View>
              <View style={styles.rank}><Text style={styles.rankText}>A등급</Text></View>
            </View>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>인사평가</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>N</Text>
              </View>
              <View style={styles.rank}><Text style={styles.rankText}>A등급</Text></View>
            </View>
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
    color: "white",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  gridItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridImgContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  gridImg: {
    width: 40,
    height: 40,
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    display:"flex",
    flexDirection:"column"
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
  moreText: {
    fontSize: 14,
    color: "#888",
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
  },
  badgeContainer: {
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#FF4D4F",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  rank: {
    backgroundColor: "#333",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  rankText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Main;
