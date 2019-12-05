import React, {useState, useEffect} from 'react';
import {View, Button, Text, Alert} from 'react-native'
import {withFirebase} from '../../config/firebase/context'
import axios from 'axios'

import Question from '../student/Questions'

const Quiz = (props) => {
  const [questions, setQuestions] = useState([])
  const [teachersName, setTeachersName] = useState('')
  const {_id, name} = props.quiz

  console.log('navingation props in quiz', props.navigation)

  useEffect( () => {
    axios.get('https://lemme-learn.herokuapp.com/question')
    .then( res => {
      const filterQuestions = res.data.filter(question => question.quiz_id === _id)
      setQuestions(filterQuestions)
    })
    .then( res => {
      axios.get(`https://lemme-learn.herokuapp.com/user/${props.quiz.teacher}`)
      .then(res => {
        setTeachersName(res.data.email)
      })
    })
    .catch( err => console.log(err))
  }, [])



  return (
    <View>
      <Text>{teachersName === undefined || '' ? null : teachersName}</Text>
    
      <Button key={_id}
              title={`quiz name: ${name}`}
                onPress={() => Alert.alert(`this is ${name} `)} />
                {questions.map(question => <Text>{question.question}</Text>)}
    </View>
  );
};

export default withFirebase(Quiz);