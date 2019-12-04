import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert, AsyncStorage} from 'react-native'
import axios from 'axios'
import Quiz from './Quiz'
import Nav from '../Nav'
import MakeQuiz from './MakeQuiz'
import {withFirebase} from '../../config/firebase/context'

const Quizzes = (props) => {
    console.log(props)
    const { user, getQuizzes, quizzes } = props

  console.log('from quizzes uid',user)
  console.log('quizzes from Quizzes',quizzes)
  useEffect( () => {
    props.getQuizzes()
  }, [])

  

  const handleSignOut = async () => {
    console.log('handlSignOut')
    try {
      await props.firebaseAuth.signOut()
      await props.signOut()
      props.navigation.push('Home')
    }
    catch(err) {
      console.log(err)
    }
    
  }

  return (
    <View>
      <Text>Quizzes</Text>
        {props.quizzes.map(quiz => {
          return <Quiz quiz={quiz} /> })}
          {props.user.teacher === false ? null : <Button title='make a quiz' onPress={ () => props.navigation.navigate('MakeQuiz')} /> }
          <Button title="sign out"  onPress={handleSignOut} />
          <Button title="get quizzes"  onPress={getQuizzes} />
          
    </View>
  );
};

export default withFirebase(Quizzes);