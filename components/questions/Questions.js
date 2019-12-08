import React, { useEffect, useState, } from 'react';
import {View, Text, Button, ScrollView, KeyboardAvoidingView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {withFirebase} from '../../config/firebase/context'
import axios from 'axios'
import styled from 'styled-components'

import MakeQuestions from './MakeQuestions'
import AnswerQuestions from './AnswerQuestions'

const Questions = props => {
  const [hideQuestion, setHideQuestion] = useState(false)
  const [questions, setQuestions] = useState([])
    const [questionsForGrading, setQuestionsForGrading] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState([])
    const {user} = props

  console.log('props from questionsForGrading',questionsForGrading)
  useEffect( () => {
    updateQuestions()
  }, [])

  const updateQuestions = () => {
    axios.get('https://lemme-learn.herokuapp.com/question')
    .then( res => {
      const filterQuestions = res.data.filter(question => question.quiz_id === props.quiz._id)
      setQuestions(filterQuestions)
    })
  }

  const addStudentsAnswers = (question) => {
   console.log('addStudentsAnswers');
    setQuestionsForGrading(prev => ([...prev, question ]))
    
  }
  const sendsubmissionsToDataBase = () => {
    questionsForGrading.map(question => {
      axios.post('https://lemme-learn.herokuapp.com/grading', question)
      .then(res => {
        console.log(res.status)
        setSubmitted(prev => (!prev))
      })
      .catch(err => {
        console.log(err.message)
        setError(prev => ([...prev, err.message]))
      })
    })
  }

  

  return (
    <KeyboardAwareScrollView style={{position: 'relative', marginBottom: 10}}>
      <Text>questions</Text>
      {questions.map((question,i) => {
        return <KeyboardAvoidingView style={{margin: 10}} >
                  {props.user.teacher === false && 
                  <View>
                    {error.length > 0 && <Text>{error}</Text>}
                    <Text>{i + 1}. {question.question}</Text>
                    <AnswerQuestions key={i}
                      question={question}
                      addStudentsAnswers={addStudentsAnswers}  
                        updateQuestions={updateQuestions} 
                        />
                          {submitted === true && <Text>you have successfully submitted this question: {i}</Text>}
                  </View>
                  }
                  {props.user.teacher === true && 
                  <View style={{justifyContent: 'flex-end'}}>
                    <Text>{i + 1}. Question: {question.question}</Text>
                      <Text>correct answer: {question.correctAnswer}</Text>
                  </View>
                  }
              </KeyboardAvoidingView>
      })}
      {props.user.teacher === true && 
      
          <MakeQuestions updateQuestions={updateQuestions} />
        
      }
      <TextStyle onPress={sendsubmissionsToDataBase}>submit quiz</TextStyle>
          <Button title='back to quizzes' onPress={() => props.navigation.push("Quizzes")} />
    </KeyboardAwareScrollView>
  );
};

const TextStyle = styled.Text`

  font-family: sans-serif;
  font-size: 25px;
    color: purple;
  `;

export default withFirebase(Questions);