import React, { useEffect, useState, } from 'react';
import {View, Text,} from 'react-native'
import {withFirebase} from '../../config/firebase/context'
import axios from 'axios'

const Questions = props => {
  const [questions, setQuestions] = useState([])
  console.log('props from question',questions)
  useEffect( () => {
    axios.get('http://lemme-learn.herokuapp.com/question')
    .then( res => {
      const filterQuestions = res.data.filter(question => question.quiz_id === props.quiz._id)
      setQuestions(filterQuestions)
    })
  }, [])

  return (
    <View>
      <Text>questions</Text>
      {questions.map(question => {
        return <Text>{question.question}</Text>
      })}
    </View>
  );
};



export default withFirebase(Questions);