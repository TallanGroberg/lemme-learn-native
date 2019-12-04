import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert, AsyncStorage, SafeAreaView,
  SectionList, ScrollView} from 'react-native'
import axios from 'axios'
import Quiz from './Quiz'
import Nav from '../Nav'
import MakeQuiz from './MakeQuiz'
import Questions from '../student/Questions'

import {withFirebase} from '../../config/firebase/context'



const Quizzes = (props) => {
  const [quizzes, setQuizzes] = useState([])
  
    const {user} = props
  console.log(props)
  console.log('from quizzes uid',user)
  useEffect( () => {
    if(props.user.teacher === true) {
    axios.get('https://lemme-learn.herokuapp.com/quiz')
    .then(res => {
        const yourQuizzes = res.data.filter(quiz => quiz.teacher === props.user.firebaseUid)
        setQuizzes(yourQuizzes)
      })
      .catch(err => console.error(err))
    } 

    if(props.user.teacher === false) {
      console.log('its false ')
      props.user.yourTeachers.map(teacherId => {
        axios.get(`https://lemme-learn.herokuapp.com/quiz/teachersquizzes/${teacherId}`)
        .then(res => {
          setQuizzes(prev => ([...prev, ...res.data]))
        })
        .catch(err => console.log(err))
      })
    }
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
    <ScrollView>
      <Text>Quizzes</Text>
      
      {quizzes.length === 0 ? <Text>try loging out and longing back in</Text> : null}
        {quizzes.map(quiz => {
          return <View>
                    <Button title='take quiz' onPress={ () => props.navigation.navigate('Questions')} />
                      <Quiz quiz={quiz} /> 
                </View>
            })}
          {props.user.teacher === false ? null : <Button title='make a quiz' onPress={ () => props.navigation.navigate('MakeQuiz')} /> }
          <Button title="sign out"  onPress={handleSignOut} />
          </ScrollView>
  );
};

export default withFirebase(Quizzes);