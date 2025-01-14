import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function EditProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { id: 1, uri: require("../assets/images/mypage/man-01.png") },
    { id: 2, uri: require("../assets/images/mypage/man-02.png") },
    { id: 3, uri: require("../assets/images/mypage/man-03.png") },
    { id: 4, uri: require("../assets/images/mypage/man-05.png") },
    { id: 5, uri: require("../assets/images/mypage/woman-01.png") },
    { id: 6, uri: require("../assets/images/mypage/woman-04.png") },
    { id: 7, uri: require("../assets/images/mypage/woman-03.png") },
    { id: 8, uri: require("../assets/images/mypage/woman-05.png") },
  ];

  const toggleNotification = () => {
    setIsNotification((prev) => !prev);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/images/mypage/User_perspective_matte.png")}
            style={styles.icon}
          />
          <Text style={styles.sectionTitle}>비밀번호 변경</Text>
        </View>
        <View style={styles.separator}/>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/mypage/lock.png")}
            style={{width: 20, height: 20}}
          />
          <TextInput
            style={styles.input}
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>
       
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/images/mypage/lock.png")}
            style={{ width: 20, height: 20 }}
          />
          <TextInput
            style={styles.input}
            placeholder="변경할 비밀번호를 입력해주세요."
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Character Change Section */}
      <View style={styles.section}>
      <View style={styles.titleContainer}>
          <Image
            source={require("../assets/images/mypage/User_perspective_matte.png")}
            style={styles.icon}
          />
          <Text style={styles.sectionTitle}>캐릭터 변경</Text>
        </View>
        <View style={styles.separator}/>
        <View style={styles.characterContainer}>
          {characters.map((character) => (
            <TouchableOpacity
              key={character.id}
              style={[
                styles.character,
                selectedCharacter === character.id && styles.selectedCharacter,
              ]}
              onPress={() => setSelectedCharacter(character.id)}
            >
              <Image style={styles.characterImage} source={character.uri} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification Toggle Section */}
      <View style={styles.notificationSection}>
        <Text style={styles.notificationText}>알림</Text>
        <Switch
          value={isNotification}
          onValueChange={toggleNotification}
          thumbColor={isNotification ? "#ff5722" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#ffccbc" }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12, // 아이콘 둥글게 설정
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "0.3rem",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  separator: {
    marginTop: 8,
    height: 1,
    backgroundColor: "#eee", 
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#ccc",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  characterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: "0.3rem",
  },
  character: {
    width: "22%",
    height: 55,
    aspectRatio: 1,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedCharacter: {
    borderColor: "#ff5722",
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  notificationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;
