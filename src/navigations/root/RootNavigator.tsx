import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';



function RootNavigator() {
    const isLogin = true;

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>
}

const styles = StyleSheet.create({});

export default RootNavigator;