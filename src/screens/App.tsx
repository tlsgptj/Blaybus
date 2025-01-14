import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "../navigations/drawer/MainDrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigations/root/RootNavigator";

// export type RootStackParamList = {
//   LoginPage: undefined;
//   MainPage: undefined;
//   LandingPage: undefined;
//   BoardMain: undefined;
//   PostCard: {postId: string};
//   Alarm : undefined;
// };

const Stack = createStackNavigator();

const AllNagivator = () => {
  return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
  );
}

export {AllNagivator};
