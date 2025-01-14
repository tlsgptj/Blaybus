import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function BoardMain() {
  const [expoPushToken, setExpoPushToken] = useState("");

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      Alert.alert("Push notifications only work on physical devices.");
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notifications!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("FCM Token:", token);
    setExpoPushToken(token);
  };

  // 새로운 글 알림 처리
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      Alert.alert("새 글이 올라왔습니다!", notification.request.content.title);
    });

    return () => subscription.remove();
  }, []);

  // 새 글이 올라올 때 호출될 백엔드 API 예시
  const notifyNewPost = async () => {
    try {
      await axios.post("http://your-backend-api/notify", {
        title: "새 글이 등록되었습니다!",
        body: "게시판에서 확인하세요.",
      });
    } catch (error) {
      console.error("Notification error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>게시판</Text>
      <Text onPress={notifyNewPost} style={styles.button}>
        새 글 알림 테스트
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { marginTop: 20, color: "blue", fontWeight: "bold" },
});
