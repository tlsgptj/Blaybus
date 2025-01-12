import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { homeNavigatons } from '../../constants';
import AllExperience from '../../screens/AllExperience';

export type HomeStackParamList = {
    [homeNavigatons.ALLEXPERIENCE] : undefined;
}

function HomeStackNavigator() {
    const Stack = createStackNavigator<HomeStackParamList>
  return (
   <Stack.Navigator>
    <Stack.Screen name ={homeNavigatons.ALLEXPERIENCE} component={AllExperience}/>
   </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default HomeStackNavigator;