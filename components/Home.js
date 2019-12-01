import React, {useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import {withFirebase} from '../config/firebase/context'
import axios from 'axios'
import SignUp from './SignUp'
const Home = (props) => {
  const [quizzes, setQuizzes] = useState([])
  
  console.log('props', props)

  useEffect( () => {
    axios.get('http://lemme-learn.herokuapp.com/quiz')
    .then(res => {
      setQuizzes(quizzes => ([ ...res.data]))
    })
    .catch(err => console.error(err))
  }, [])

  return (
    <View>
    {quizzes.map(quiz => {
      return <Button key={quiz._id}
              title={quiz.name}
                onPress={() => Alert.alert(`this is ${quiz.name}`)}></Button>})}
      <SignUp />
  </View>
  );
};

export default withFirebase(Home);