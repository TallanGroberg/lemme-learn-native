import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert} from 'react-native'
import axios from 'axios'
import Quiz from './Quiz'
import Nav from '../Nav'
import {withFirebase} from '../../config/firebase/context'

const Quizzes = (props) => {
  const [quizzes, setQuizzes] = useState([])

  useEffect( () => {
    axios.get('http://lemme-learn.herokuapp.com/quiz')
    .then(res => {
      setQuizzes(quizzes => ([ ...res.data]))
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
          {props.token === '' || undefined ? null : <Button title="sign out"  onPress={handleSignOut} />}
          
    </View>
  );
};

export default withFirebase(Quizzes);