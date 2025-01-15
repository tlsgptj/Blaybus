import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type MainDrawerParamList = {
  AlarmScreen: undefined;
};

function CalendarScreen() {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMonthSelectorVisible, setMonthSelectorVisible] = useState(false);

  const [isTaskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const [tasks, setTasks] = useState([]);

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/quests/leader"
      );

         // 데이터 매핑
    const mappedTasks = response.data.data.map((item) => {
      const baseDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 현재 달 첫째 날
      const weekOffset = parseInt(item.week) - 1; // 주차 기준으로 계산 (1주차부터 시작)
      const calculatedDate = new Date(baseDate.setDate(baseDate.getDate() + weekOffset * 7)); // 주차 기준 날짜 계산

      // 날짜가 다음 달로 넘어가는 경우 처리
      if (calculatedDate.getMonth() > currentDate.getMonth()) {
        calculatedDate.setMonth(currentDate.getMonth() + 1); // 다음 달로 이동
      }

      return {
        id: `${item.employeeInfoDto.idNumber}-${item.week}`,
        date: `${calculatedDate.getFullYear()}-${(calculatedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${calculatedDate.getDate().toString().padStart(2, "0")}`,
        mainTitle: "리더퀘스트"  ,
        title: item.leaderQuestDto.name || "리더퀘스트",
        description: item.leaderQuestDto.maxCondition || "",
        tag: "leaderQuest", // 태그 추가
      };
    });

    setTasks(mappedTasks); // 태스크 업데이트

      setData(response.data.data);
      setError(null);
      console.log("리더 데이터", response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("데이터를 가져오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

 
  useEffect(() => {
    fetchData();
  }, []);

  const renderDayTasks = (day) => {
    if (!day) return null;

    const dateString = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const dayTasks = tasks.filter((task) => task.date === dateString);

    return dayTasks.map((task, index) => (
      <Text
        key={index}
        style={[styles.taskText, getTaskStyle(task.Maintitle)]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {task.mainTitle}
      </Text>
    ));
  };

  const getTaskStyle = (Maintitle) => {
    switch (Maintitle) {
      case "TF퀘스트":
        return { color: "#808080" }; // 회색
      case "팀퀘스트":
        return { color: "#FF0000" }; // 빨간색
      case "리더퀘스트":
        return { color: "#FFD700" }; // 노란색
      case "할일":
        return { color: "#FFA500" }; // 주황색
      default:
        return { color: "#FFD700" }; // 기본 검정색
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);

    const calendar = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null); // 빈 날짜
    }

    for (let day = 1; day <= totalDays; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null); // 남은 빈 칸
      }
      calendar.push(week);
    }

    return calendar;
  };

  const handleDayPress = (day) => {
    if (day) {
      const dateString = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const filteredTasks = tasks.filter((task) => task.date === dateString);
      setSelectedDate(dateString);
      setSelectedTasks(filteredTasks);
      setTaskModalVisible(true);
    }
  };

  const handleAddTask = () => {
    setIsAddTaskModalVisible(false);
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setMonthSelectorVisible(false);
  };

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const calendar = generateCalendar(currentDate);

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "very good":
        return { backgroundColor: "#FF6347", color: "#fff" }; // 빨간색
      case "good":
        return { backgroundColor: "#FFD700", color: "#fff" }; // 노란색
      case "normal":
        return { backgroundColor: "#d3d3d3", color: "#000" }; // 회색
      default:
        return { backgroundColor: "#f2f2f2", color: "#000" }; // 기본 스타일
    }
  };

  const renderTaskItem = (task: {
    id: string;
    title: string;
    description: string;
    date: string;
  }) => (
    <View style={styles.taskItem} key={task.id}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{task.date}</Text>
      </View>

      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskTag}>very good</Text>
      </View>

      <Text style={styles.taskDescription}>{task.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/mypage/leftarrow2.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>퀘스트</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AlarmScreen")}>
          <Image
            source={require("../assets/images/mainpage/Bell.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* calendar Month */}
      <View style={styles.headerMonthSelector}>
        <TouchableOpacity
          style={styles.monthSelectorButton}
          onPress={() => setMonthSelectorVisible(true)}
        >
          <Text style={styles.monthText}>
            {currentDate.getFullYear()}.
            {(currentDate.getMonth() + 1).toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Month Selector Modal */}
      <Modal
        visible={isMonthSelectorVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMonthSelectorVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.monthOption,
                    currentDate.getMonth() === index &&
                      styles.selectedMonthOption,
                  ]}
                  onPress={() => handleMonthSelect(index)}
                >
                  <Text
                    style={[
                      styles.monthOptionText,
                      currentDate.getMonth() === index &&
                        styles.selectedMonthOptionText,
                    ]}
                  >
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <View style={styles.dayLabels}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <Text key={index} style={styles.dayLabel}>
              {day}
            </Text>
          ))}
        </View>

        {calendar.map((week, index) => (
          <View key={index} style={styles.week}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={styles.day}
                onPress={() => handleDayPress(day)}
              >
                <Text style={[styles.dayText, day === null && styles.emptyDay]}>
                  {day || ""}
                </Text>
                <View style={styles.tasksContainer}>
                  {renderDayTasks(day) || ""}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <Modal
        visible={isTaskModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTaskModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>({selectedDate})</Text>
            <ScrollView>
              {selectedTasks.length > 0 ? (
                selectedTasks.map((task) => renderTaskItem(task))
              ) : (
                <Text style={styles.noTaskText}>할 일이 없습니다.</Text>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.addButtonInModal}
              onPress={() => setIsAddTaskModalVisible(true)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTaskModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        visible={isAddTaskModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddTaskModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>할일 작성</Text>

            <TextInput
              style={styles.input}
              placeholder="할 일 제목"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />
            <TextInput
              style={styles.textArea}
              placeholder="할 일 설명"
              multiline
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddTask}
            >
              <Text style={styles.submitButtonText}>할일 작성 완료</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsAddTaskModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerMonthSelector: {
    alignItems: "center",
    marginVertical: 10,
  },
  monthSelectorButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  monthText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: 500,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noTaskText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#555",
  },
  monthOption: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "80%",
    borderRadius: "25px",
  },
  selectedMonthOption: {
    backgroundColor: "#ff6347",
  },
  monthOptionText: {
    fontSize: 16,
    color: "#000",
  },
  selectedMonthOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  calendarContainer: {
    flexDirection: "column",
  },
  dayLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tasksContainer: {
    marginTop: 5,
    alignItems: "flex-start",
    width: "100%",
    overflow: "hidden",
  },
  day: {
    flex: 1,
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 2,
    padding: 5,
    overflow: "hidden",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  emptyDay: {
    color: "#ddd",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  verygood: {
    backgroundColor: "#ff4d4d",
  },
  good: {
    backgroundColor: "#ffcd3c",
  },
  neutral: {
    backgroundColor: "#d3d3d3",
  },

  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButtonInModal: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  taskText: {
    fontSize: 12,
    marginTop: 2,
    maxWidth: "100%",
    overflow: "hidden",
  },
  taskItem: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateContainer: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#555",
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden", // 텍스트가 넘치지 않도록 설정
    backgroundColor: "#FF6347",
    color: "#fff",
  },
  taskDescription: {
    fontSize: 14,
    color: "#777",
  },
});

export default CalendarScreen;
