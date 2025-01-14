import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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

type MainDrawerParamList = {
  EditProfile : undefined;
}

function MyPage() {
  const [isLevelDataModalOpen, setIsLevelDataModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();

  const levelData = [
    { level: "F1-I", experience: "0" },
    { level: "F1-II", experience: "13,500" },
    { level: "F2-I", experience: "27,000" },
    { level: "F2-II", experience: "39,000" },
    { level: "F2-III", experience: "51,000" },
    { level: "F3-I", experience: "63,000" },
    { level: "F3-II", experience: "78,000" },
  ];

  // 가상 사용자 데이터
  const userData = {
    id: "testuser",
    password: "123",
  };

  const toggleModal = () => {
    setIsLevelDataModalOpen(!isLevelDataModalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
    setError("");
  };

  const handleConfirm = () => {
    if (id === userData.id && password === userData.password) {
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
          <Image source={require("../assets/images/mypage/leftarrow2.png")} style={styles.arrow}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <View style={styles.profileCard}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={styles.profileInfo}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                marginLeft: 5,
              }}
            >
              <Image style={styles.nameDeco} />
              <Text style={styles.profileName}>김민수님</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.profileSubtitle}>소속: 음성 14센터</Text>
              <Text style={styles.profileSubtitle}>직무그룹 : 1</Text>
            </View>
          </View>
          <View
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <View>
              <Image style={styles.profileImage} />
            </View>
            <TouchableOpacity onPress={toggleModal} style={styles.badge}>
              <Text style={styles.badgeText}>F1-I</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 레벨 정보 모달 */}
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
            {/* 레벨 데이터 리스트 */}
            <FlatList
              data={levelData}
              keyExtractor={(item) => item.level}
              renderItem={({ item }) => (
                <View style={styles.levelRow}>
                  <Text style={styles.levelCell}>{item.level}</Text>
                  <Text style={styles.experienceCell}>{item.experience}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>내 정보</Text>
          <TouchableOpacity onPress={toggleEditModal}>
            <Text style={styles.cardEdit}>정보 수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>사번</Text>
          <Text style={styles.infoValue}>2023010101</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>아이디</Text>
          <Text style={styles.infoValue}>minsu.kim</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>입사일</Text>
          <Text style={styles.infoValue}>2023-01-01</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>비밀번호</Text>
          <Text style={styles.infoValue}>****</Text>
        </View>
      </View>

      {/* 정보 확인 모달 */}
      <Modal
        visible={editModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>내 정보</Text>

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
                placeholder="비밀번호를 입력해주세요."
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={toggleEditModal}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.confirmButton}
              >
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
            <View>
              <Image
                source={require("../assets/images/mypage/Chart_perspective_matte.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>
                2024년 <br />
                획득 경험치
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.progressText}>3%</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        <Text style={styles.progressInfo}>
          현재 획득: 2300 | 다음 목표: 15000
        </Text>
      </View>

      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
            <View>
              <Image
                source={require("../assets/images/mypage/Chart_perspective_matte.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>
                2023년까지 <br />
                누적 경험치
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.progressText}>22%</Text>
          </View>
        </View>
          
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: "22%" }]} />
        </View>
        <Text style={styles.progressInfo}>
          누적 획득: 4000 | 다음 목표: 15000
        </Text>
      </View>

      <View style={styles.linkCard}>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>공지사항</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>고객센터</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>보안</Text>
          <Text>&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  arrow: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  nameDeco: {
    width: 30,
    height: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
  },
  profileCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  textInfo: {
    marginLeft: 10,
  },
  profileName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
  profileSubtitle: {
    color: "#ccc",
    fontSize: 16,
  },
  badge: {
    backgroundColor: "#ff6b6b",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    
  },
  cardEdit: {
    color: "#007bff",
    fontSize: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    width: "3%",
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },
  progressText: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight:"bold",
  },
  progressInfo: {
    fontSize: 12,
    color: "#666",
  },
  linkCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  linkText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 16,
    color: "#ff5722",
    fontWeight: "bold",
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  levelCell: {
    fontSize: 16,
  },
  experienceCell: {
    fontSize: 16,
    color: "#757575",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MyPage;
