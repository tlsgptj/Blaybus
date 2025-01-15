import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import MainPage from "../../screens/Main";
import MyPage from "../../screens/MyPage";
import BoardMain from "../../screens/BoardMain";
import AllExperience from "../../screens/AllExperience";
import EditProfile from "../../screens/EditProfile";
import LandingPage from "../../screens/Landing";
import CalendarScreen from "../../screens/CalendarScreen";
import AlarmScreen from "../../screens/AlarmScreen";
import PushAlramScreen from "../../screens/PushAlram";
import LoginPage from "../../screens/Login";
import PostCard from "../../screens/PostCardDetail/PostCardDetail";

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="MainPage" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MainPage" component={MainPage} />
      <Drawer.Screen name="MyPage" component={MyPage} />
      <Drawer.Screen name="BoardMain" component={BoardMain}/>
      <Drawer.Screen name="AllExperience" component={AllExperience} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="PostCard" component={PostCard}/>
      <Drawer.Screen name="LoginPage" component={LoginPage}/>
      <Drawer.Screen name="LandingPage" component={LandingPage} />
      <Drawer.Screen name="CalendarScreen" component={CalendarScreen} options={{}}/>
      <Drawer.Screen name="AlarmScreen" component={AlarmScreen} />
      <Drawer.Screen name="PushAlramScreen" component={PushAlramScreen}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;
