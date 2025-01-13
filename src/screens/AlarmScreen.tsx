import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function AlarmScreen({ navogation }) {
  const alarms = [
    {
      id: "1",
      title: "1월 1일 수요일",
      description:
        "위 스케줄과 알림은 고객님이 삭제하기 전까지 1년간 보관되며, 1년 뒤 내용 및 스케줄은 자동 삭제 처리됩니다.",
    },
    {
      id: "2",
      title: "게시글이 등록되었습니다",
      description:
        "위 스케줄과 알림은 고객님이 삭제하기 전까지 1년간 보관되며, 1년 뒤 내용 및 스케줄은 자동 삭제 처리됩니다.",
    },
    {
      id: "3",
      title: "1월 16일 목요일",
      description: "경험치가 달성되었습니다.",
    },
    {
      id: "4",
      title: "1월 30일 목요일",
      description:
        "위 스케줄과 알림은 고객님이 삭제하기 전까지 1년간 보관되며, 1년 뒤 내용 및 스케줄은 자동 삭제 처리됩니다.",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navogation.goBack()}>
          <Text>뒤로</Text>
        </TouchableOpacity>
        <Text>알림</Text>
      </View>

      <ScrollView style={styles.alarmList}>
        {alarms.map((alarm) => (
          <View key={alarm.id} style={styles.alarmItem}>
            <Text style={styles.alarmTitle}>{alarm.title}</Text>
            <Text style={styles.alarmDescription}>{alarm.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  alarmList: {
    padding: 10,
  },
  alarmItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    
  },
  alarmTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  alarmDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default AlarmScreen;
