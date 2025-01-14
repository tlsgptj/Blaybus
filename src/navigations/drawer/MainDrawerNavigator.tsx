import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import Main from "../../screens/Main";
import MyPage from "../../screens/MyPage";
import BoardMain from "../../screens/BoardMain";
import AllExperience from "../../screens/AllExperience";
import EditProfile from "../../screens/EditProfile";
import LandingPage from "../../screens/Landing";
import CalendarScreen from "../../screens/CalendarScreen";
import AlarmScreen from "../../screens/AlarmScreen";
import PushAlramScreen from "../../screens/PushAlram";

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="main" component={Main} />
      <Drawer.Screen name="mypage" component={MyPage} />
      <Drawer.Screen name="board" component={BoardMain} options={{drawerItemStyle: {display: "none"}}}/>
      <Drawer.Screen name="experience" component={AllExperience} options={{drawerItemStyle: {display: "none"}}}/>
      <Drawer.Screen name="edit" component={EditProfile} />
      <Drawer.Screen name="landing" component={LandingPage} />
      <Drawer.Screen name="calendar" component={CalendarScreen} options={{drawerItemStyle: {display: "none"}}}/>
      <Drawer.Screen name="alarm" component={AlarmScreen} />
      <Drawer.Screen name="PushAlram" component={PushAlramScreen}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;
