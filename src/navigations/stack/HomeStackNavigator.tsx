import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import AllExperience from "../../screens/AllExperience";

export type HomeStackParamList = {
  AllExperience: undefined;
  Post : undefined;
  Calendar : undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllExperience"
        component={AllExperience}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default HomeStackNavigator;
