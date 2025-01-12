import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import Logo from "../assets/images/LOGO.svg";
import MessageIcon from "../assets/images/message.svg";
import LockIcon from "../assets/images/lock.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      {/*  
    <Logo width={80} height={80} style={styles.logo} />
    */}

      <Text style={styles.title}>로그인</Text>
      <View style={styles.inputContainer}>
        {/* 
      <MessageIcon width={20} height={20} style={styles.icon} />
        */}
        <TextInput
          placeholder="아이디를 입력해주세요."
          value={username}
          onChangeText={setUsername}
          style={styles.textInput}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* 
      <LockIcon width={20} height={20} style={styles.icon} />
        */}
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
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Login;
