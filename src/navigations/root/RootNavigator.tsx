import React, { useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';



function RootNavigator() {
    const [isLogin, setIsLogin] = useState<boolean | null>(null);

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        setIsLogin(!!token);
      } catch (error){
        console.error("Failed to fetch login status : ", error);
        setIsLogin(false);
      }
    }

    useEffect(() => {
      checkLoginStatus();
    }, [])

    if(isLogin === null) {
      return(
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )
    }

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default RootNavigator;