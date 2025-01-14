import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "../navigations/drawer/MainDrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  LoginPage: undefined;
  MainPage: undefined;
  LandingPage: undefined;
  BoardMain: undefined;
  PostCard: {postId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const AllNagivator = () => {
  return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
  );
}

export {AllNagivator};
