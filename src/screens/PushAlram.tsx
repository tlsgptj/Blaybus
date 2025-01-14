import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import axios from "axios";

export default function PushAlarmScreen() {
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
    console.log("Expo Push Token:", token);
    setExpoPushToken(token);
  };

  const sendPushNotification = async (expoPushToken) => {
    try {
      const response = await axios.post("/notification/connect", {
        to: expoPushToken,
        title: "테스트 알림",
        body: "이것은 테스트 메시지입니다!",
      });

      if (response.status === 200) {
        return { success: true, message: response.data.message || "푸시 알림 성공!" };
      } else {
        return { success: false, message: response.data.message || "푸시 알림 실패!" };
      }
    } catch (error) {
      console.error("Error sending push notification:", error);
      return { success: false, message: "푸시 알림 중 오류가 발생했습니다." };
    }
  };

  const triggerPushNotification = async () => {
    if (!expoPushToken) {
      Alert.alert("Expo Push Token이 없습니다!");
      return;
    }

    const result = await sendPushNotification(expoPushToken);

    if (result.success) {
      Alert.alert("푸시 알림 전송 성공!", result.message);
    } else {
      Alert.alert("푸시 알림 전송 실패!", result.message);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게시판</Text>
      <TouchableOpacity onPress={triggerPushNotification} style={styles.button}>
        <Text style={styles.buttonText}>푸시 알림 테스트</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontSize: 16 },
});
