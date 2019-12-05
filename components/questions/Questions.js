import React, { useEffect, useState, } from 'react';
import {View, Text,} from 'react-native'
import {withFirebase} from '../../config/firebase/context'
import axios from 'axios'

import MakeQuestions from './MakeQuestions'

const Questions = props => {
  const [questions, setQuestions] = useState([])
    const {user} = props

  console.log('props from question',questions)
  useEffect( () => {
    updateQuestions()
  }, [])

  const updateQuestions = () => {
    axios.get('http://lemme-learn.herokuapp.com/question')
    .then( res => {
      const filterQuestions = res.data.filter(question => question.quiz_id === props.quiz._id)
      setQuestions(filterQuestions)
    })
  }

 

  return (
    <View>
      <Text>questions</Text>
      {questions.map(question => {
        return <View>
                  <Text>{question.question}</Text>
              </View>
      })}
      {props.user.teacher === true && <MakeQuestions updateQuestions={updateQuestions}  />}
    </View>
  );
};



export default withFirebase(Questions);