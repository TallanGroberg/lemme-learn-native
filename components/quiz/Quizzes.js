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
  
    const {user, setUser} = props
 
  
  useEffect( () => {
    axios.get(`https://lemm-learn.herokuapp.com/${user.firebaseUid}`)
      .then( res => {
        console.log('got user again!!')
        setUser(...res.data)
      })


    if(props.user.teacher === true) {
    axios.get('https://lemme-learn.herokuapp.com/quiz')
    .then(res => {
        const yourQuizzes = res.data.filter(quiz => quiz.teacher === props.user.firebaseUid)
        setQuizzes(yourQuizzes)
      })
      .catch(err => console.error(err))
    } 

    if(props.user.teacher === false) {
      props.user.yourTeachers.map(teacherId => {
        axios.get(`https://lemme-learn.herokuapp.com/quiz/teachersquizzes/${teacherId}`)
        .then(res => {
          setQuizzes(prev => ([...prev, ...res.data]))
        })
        .catch(err => console.log(err))
      })
    }
  }, [])

  const goToQuiz = (quiz) => {
    console.log('hit goToQuiz')
    props.setQuiz(quiz)
    props.navigation.navigate('Questions')
  }


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
      
      {quizzes.length === 0 ? <Text>{props.teacher === true ? `try refreshing the page` : `Pick some teachers to see there quizzes, log back in and the quizzes should appear`}</Text> : null}
        {quizzes.map(quiz => {
          return <View>
                      <Quiz quiz={quiz} /> 
                      <Button title="take quiz" onPress={() => goToQuiz(quiz) } />
                </View>
            })}
          {props.user.teacher === false ?
              <Button title={props.user.yourTeachers.length === undefined || props.user.yourTeachers.length > 0 ? 'change teachers' : 'add teachers'} onPress={() => props.navigation.navigate('PickTeacher')} /> 
            :
              <Button title='make a quiz' onPress={() => props.navigation.navigate('MakeQuiz')} /> 
          }
          <Button title="sign out"  onPress={handleSignOut} />
          </ScrollView>
  );
};

export default withFirebase(Quizzes);