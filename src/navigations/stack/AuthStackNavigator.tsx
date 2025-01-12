import React from 'react';
import { StyleSheet } from 'react-native';
import { authNavigations } from '../../constants';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';

export type AuthStackParamList = {
    [authNavigations.LOGIN] : undefined;
}

function AuthStackNavigator() {
    const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator>
        <Stack.Screen name={authNavigations.LOGIN} component={Login}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;