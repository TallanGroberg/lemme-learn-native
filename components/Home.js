import React, {useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import Context, {withFirebase} from '../config/firebase/context'
import axios from 'axios'
import SignUp from './SignUp'
import PickTeacher from './students/PickTeacher'
import Login from './Login'
import Quizzes from './quiz/Quizzes'
import MakeQuiz from './quiz/MakeQuiz'
import Questions from './questions/Questions'
import MakeQuestions from './questions/MakeQuestions'
import AnswerQuestions from './questions/AnswerQuestions'
import Nav from './Nav'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { firebaseAuth } from '../config/firebase/firebase';



const Home = (props) => {
    const {token, user} = props

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

const AuthStack = createStackNavigator({Home: Home, Login: Login, SignUp: SignUp,})
const MakeQuizStack = createStackNavigator({MakeQuiz: MakeQuiz, PickTeacher: PickTeacher,})
const MakeQuestionStack = createStackNavigator({Questions: Questions,AnswerQuestions: AnswerQuestions,})
const AppStack = createStackNavigator({Quizzes: Quizzes, })
const AppNavigator = createAppContainer(createSwitchNavigator(
  {
  auth: AuthStack,
  App: AppStack,
  MakeQuiz: MakeQuizStack,
  MakeQuestion: MakeQuestionStack,
  },
  {
    initialRouteName: 'auth'
  }
))



export default createAppContainer(AppNavigator)