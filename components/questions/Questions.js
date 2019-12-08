import React, { useEffect, useState, } from 'react';
import {View, Text, Button, ScrollView, KeyboardAvoidingView, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {withFirebase} from '../../config/firebase/context'
import axios from 'axios'
import styled from 'styled-components'
import trash from '../images/trash.png'

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

  const handleDelete = (question) => {
    console.log('handleDelete', question)
    axios.delete(`https://lemme-learn.herokuapp.com/question/${question._id}`, question)
    .then( res => {
      updateQuestions()
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
                  <View style={{flexDirection: 'colunm', flexWrap: 'wrap'}}>
                    <Text>{i + 1}. {question.question}</Text>
                      <Text>answer: {question.correctAnswer}</Text>
                        <View style={{flexDirection: 'row'}} >
                          <Image source={trash} style={{height: 30, width: 30}}/>
                            <DeleteStyle onPress={() => handleDelete(question)}>Delete</DeleteStyle>
                        </View>
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

  const DeleteStyle = styled.Text`
    font-size: 10px;
    color: red;
  `;

export default withFirebase(Questions);