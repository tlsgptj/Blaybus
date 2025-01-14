import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginPageProps {
  navigation: LoginPageNavigationProp;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const [employeeId, setemployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!employeeId || !password) {
      Alert.alert("오류", "아이디와 비밀번호를 입력해주세요!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/auth/login", {
        employeeId : employeeId,
        password: password,
      });

      if (response.data.success) {
        window.alert("로그인 성공 : `환영합니다!, ${response.data.user.name}`"); 
      } else {
        window.alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      window.alert("오류 : 예기치 않은 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/LOGO.png")} style={{ width: 80, height: 80 }} />

      <Text style={styles.title}>로그인</Text>
      <View style={styles.inputContainer}>
      <Image source={require("../assets/images/message.png")} style={{ width: 20, height: 20 }} />
        <TextInput
          placeholder="아이디를 입력해주세요."
          value={employeeId}
          onChangeText={setemployeeId}
          style={styles.textInput}
        />
      </View>

      <View style={styles.inputContainer}>
      <Image source={require("../assets/images/lock.png")} style={{ width: 20, height: 20 }} />
        <TextInput
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>

      <View style={styles.optionContainer}>
        <BouncyCheckbox
          isChecked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          fillColor="#000"
          text="아이디 저장"
          textStyle={styles.optionText}
          iconStyle={{ borderColor: "#ccc" }}
        />
        <TouchableOpacity>
          <Text style={styles.optionText}>아이디/비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? "로그인 중..." : "로그인"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  optionText: {
    fontSize: 14,
    color: "#555",
  },
  loginButton: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    borderRadius: 20,
    width: 80,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LoginPage;
