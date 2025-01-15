import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MainDrawerParamList = {
  EditProfile: undefined;
};

interface EmployeeData {
  name: string;
  idNumber: string;
  character: string;
  startDate: string;
  level: string;
  departmentDto: {
    name: string;
  };
}

function MyPage() {
  const [isLevelDataModalOpen, setIsLevelDataModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();

  useEffect(() => {
    fetchMyPage();
  }, []);

  const fetchMyPage = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.error("토큰 없음");
        return;
      }

      const response = await axios.get(
        "http://code-craft-alb-1326215415.ap-northeast-2.elb.amazonaws.com/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200 && response.data.data.length > 0) {
        setEmployeeData(response.data.data[0]);
      } else {
        console.error("올바르지 않은 응답 형식");
      }
    } catch (error) {
      console.error("데이터 fetching 실패: ", error);
    }
  };

  const toggleModal = () => {
    setIsLevelDataModalOpen(!isLevelDataModalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
    setError("");
  };

  const handleConfirm = () => {
    if (id && password) {
      toggleEditModal();
      navigation.navigate("EditProfile");
    } else {
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={require("../assets/images/mypage/leftarrow2.png")} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      {employeeData && (
        <View style={styles.profileCard}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <View style={styles.profileInfo}>
              <View style={{ flexDirection: "row", gap: 8, marginLeft: 5 }}>
                <Image/>
                <Text style={styles.profileName}>{employeeData.name}님</Text>
              </View>
              <View>
                <Text style={styles.profileSubtitle}>소속: {employeeData.departmentDto.name}</Text>
                <Text style={styles.profileSubtitle}>레벨: {employeeData.level}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Image />
              <TouchableOpacity onPress={toggleModal} style={styles.badge}>
                <Text style={styles.badgeText}>{employeeData.character}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Modal
        visible={isLevelDataModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>레벨 정보 확인</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>내 정보 수정</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>아이디</Text>
              <TextInput
                style={styles.input}
                placeholder="아이디를 입력해주세요"
                value={id}
                onChangeText={setId}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {error && <Text>{error}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={toggleEditModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 15 },
  headerTitle: { fontSize: 18, fontWeight: "bold", flex: 1, textAlign: "center" },
  backButton: { position: "absolute", left: 16 },
  profileCard: { backgroundColor: "#333", padding: 15, borderRadius: 10, marginBottom: 20 },
  profileInfo: { flexDirection: "column" },
  profileName: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  profileSubtitle: { color: "#ccc", fontSize: 14 },
  badge: { backgroundColor: "#ff6b6b", padding: 8, borderRadius: 20 },
  badgeText: { color: "#fff", fontSize: 12 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  closeButton: { fontSize: 16, color: "#ff5722" },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 14, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 5, padding: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancelButton: { backgroundColor: "#ccc", padding: 10, borderRadius: 5 },
  confirmButton: { backgroundColor: "#ff5722", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default MyPage;
