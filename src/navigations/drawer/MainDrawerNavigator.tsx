import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Main from '../../screens/Main';
import MyPage from '../../screens/MyPage';
import BoardMain from '../../screens/BoardMain';
import Post from '../../screens/Post';
import AllExperience from '../../screens/AllExperience';
import EditProfile from '../../screens/EditProfile';
import LandingPage from '../../screens/Landing';
import CalendarScreen from '../../screens/CalendarScreen';



function MainDrawerNavigator() {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
        <Drawer.Screen name='main' component={Main}/>
        <Drawer.Screen name='mypage' component={MyPage}/>
        <Drawer.Screen name='board' component={BoardMain}/>
        <Drawer.Screen name='post' component={Post} />
        <Drawer.Screen name='experience' component={AllExperience} />
        <Drawer.Screen name='edit' component={EditProfile} />
        <Drawer.Screen name='landing' component={LandingPage} />
        <Drawer.Screen name='calendar' component={CalendarScreen} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;