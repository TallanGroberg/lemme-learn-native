import React, {useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import {withFirebase} from '../config/firebase/context'
import axios from 'axios'
import SignUp from './SignUp'
import Login from './Login'
import Quizzes from './quiz/Quizzes'
import MakeQuiz from './quiz/MakeQuiz'
import Nav from './Nav'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { firebaseAuth } from '../config/firebase/firebase';


const Home = (props) => {
  const [quizzes, setQuizzes] = useState([])
    const {token, user} = props
  console.log(props.createNewQuiz)



  return (
    <View>
      <Text>Welcome to let me learn where students learn better by giving teachers instant feedback on lectures</Text>
                  <Button 
                    title='sign up'
                      onPress={() => props.navigation.navigate('SignUp')} />
                  <Button 
                    title='login'
                      onPress={() => props.navigation.navigate('Login')} />

  </View>
  );
};

const AuthStack = createStackNavigator({Home: Home, Login: Login, SignUp: SignUp, MakeQuiz: MakeQuiz})
const MakeQuizStack = createStackNavigator({MakeQuiz: MakeQuiz})
const AppStack = createStackNavigator({Quizzes: Quizzes })
const AppNavigator = createAppContainer(createSwitchNavigator(
  {
  auth: AuthStack,
  App: AppStack,
  MakeQuiz: MakeQuizStack
  },
  {
    initialRouteName: 'auth'
  }
))



export default createAppContainer(AppNavigator)