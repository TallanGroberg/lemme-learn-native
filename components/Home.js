import React, {useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';
import {withFirebase} from '../config/firebase/context'
import axios from 'axios'
import SignUp from './SignUp'

import { firebaseAuth } from '../config/firebase/firebase';


const Home = (props) => {
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
      console.log('firebase')
      await props.setToken('')
      console.log('tokenset')
      await props.setUser({})
      console.log('userset')
    }
    catch(err) {
      console.log(err)
    }
      finally{
        console.log("in finally block")
        props.signOut()
      }
  }

  return (
    <View>
    {quizzes.map(quiz => {
      return <Button key={quiz._id}
              title={quiz.name}
                onPress={() => Alert.alert(`this is ${quiz.name}`)}></Button>})}
      <SignUp />
      <Button title='log out' onPress={handleSignOut} />
  </View>
  );
};

export default withFirebase(Home);