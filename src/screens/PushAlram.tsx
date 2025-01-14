//이거 테스트임ㅇㅋ?

import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "../../firebase.js";

// Firebase Cloud Messaging 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function PushAlarmScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  // 푸시 알림 등록
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

    // Firebase Cloud Messaging에서 토큰 가져오기
    const messaging = getMessaging(firebaseApp);
    const fcmToken = await getToken(messaging);
    console.log("Firebase FCM Token:", fcmToken);
  };

  // 새 글 알림 처리
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      Alert.alert("새 글이 올라왔습니다!", notification.request.content.title);
    });

    return () => subscription.remove();
  }, []);

  // 푸시 알림 트리거 및 성공/실패 상태 처리
  // 푸시 알림 트리거 (로컬 알림 대신 Firebase 사용)
const triggerPushNotification = async () => {
  try {
    const response = await fetch("https://blaybus-10c93.web.app/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "key=YOUR_SERVER_KEY", // Firebase 서버 키
      },
      body: JSON.stringify({
        to: expoPushToken,
        notification: {
          title: "새 글 알림",
          body: "새로운 게시글이 등록되었습니다!",
        },
      }),
    });

    if (response.ok) {
      Alert.alert("푸시 알림 전송 성공!");
    } else {
      Alert.alert("푸시 알림 전송 실패!");
    }
  } catch (error) {
    console.error("푸시 알림 전송 오류:", error);
    Alert.alert("푸시 알림 전송 중 오류가 발생했습니다.");
  }
};


  return (
    <View style={styles.container}>
      <Text>게시판</Text>
      <Text style={styles.infoText}>
        Firebase와 FCM을 통해 푸시 알림이 전송됩니다.
      </Text>
      <TouchableOpacity onPress={triggerPushNotification} style={styles.button}>
        <Text style={styles.buttonText}>푸시 알림 테스트</Text>
      </TouchableOpacity>
      {notificationStatus && (
        <Text style={styles.statusText}>{notificationStatus}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoText: { marginTop: 20, textAlign: "center", fontSize: 16, color: "gray" },
  button: {
    marginTop: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  statusText: { marginTop: 20, fontSize: 16, color: "green" },
});

