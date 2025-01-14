import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./screens/Login";
import MainPage from "./screens/Main";
import LandingPage from "./screens/Landing";

export type RootStackParamList = {
  LoginPage: undefined;
  MainPage: undefined;
  LandingPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage}/>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="MainPage" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
