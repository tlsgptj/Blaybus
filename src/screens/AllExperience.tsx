import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

function AllExperience() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperienceData = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(
        "http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/exp",
        {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 토큰 추가
          },
        }
      );
      setData(response.data.data);
      setError(null);
      console.log("전체 경험치 데이터: ", response.data);
    } catch (err) {
      console.error("데이터 가져오기 실패: ", err);
      setError("데이터를 가져오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>인사평가</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>N</Text>
        </View>
        <View style={styles.rank}>
          <Text style={styles.rankText}>달성률 :{item.achievementRate}%</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>
        {item.employeeName} / ID: {item.idNumber}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardDate}>
          부서: {item.department} / 직군: {item.jobGroup}
        </Text>
        <Text style={styles.cardExp}>{item.totalExp} do</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
  },
  listContent: {
    paddingBottom: 20,
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
  },
  cardExp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F61",
  },
});

export default AllExperience;
