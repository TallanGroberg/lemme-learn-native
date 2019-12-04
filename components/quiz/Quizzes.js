import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert, AsyncStorage} from 'react-native'
import axios from 'axios'
import Quiz from './Quiz'
import Nav from '../Nav'
import MakeQuiz from './MakeQuiz'
import {withFirebase} from '../../config/firebase/context'

const Quizzes = (props) => {
  const [quizzes, setQuizzes] = useState([])
    const { user, } = props

  console.log('from quizzes uid',props.user.firebaseUid)
  useEffect( () => {
    axios.get('https://lemme-learn.herokuapp.com/quiz')
    .then(res => {
      if(props.user.teacher === true) {
        const yourQuizzes = res.data.filter(quiz => quiz.teacher === props.user.firebaseUid)
        
        setQuizzes(yourQuizzes)
      } 
    })
    .catch(err => console.error(err))
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
        {quizzes.map(quiz => {
          return <Quiz quiz={quiz} /> })}
          {props.user.teacher === false ? null : <Button title='make a quiz' onPress={ () => props.navigation.navigate('MakeQuiz')} /> }
          <Button title="sign out"  onPress={handleSignOut} />
          
    </View>
  );
};

export default withFirebase(Quizzes);