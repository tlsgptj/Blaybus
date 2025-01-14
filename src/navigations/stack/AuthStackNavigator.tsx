import React from "react";
import { StyleSheet } from "react-native";
import { authNavigations } from "../../constants";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import LandingPage from "../../screens/Landing";
import LoginPage from "../../screens/Login";
import MainPage from "../../screens/Main";

export type AuthStackParamList = {
  [authNavigations.LOGIN]: undefined;
  [authNavigations.LANDING]: undefined;
  [authNavigations.MAIN] : undefined;
};

function AuthStackNavigator() {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name={authNavigations.LANDING} component={LandingPage} />
      <Stack.Screen name={authNavigations.LOGIN} component={LoginPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
