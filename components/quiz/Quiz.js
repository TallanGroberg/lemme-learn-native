import React, {useState, useEffect} from 'react';
import {View, Button, Text, Alert} from 'react-native'
import {withFirebase} from '../../config/firebase/context'
import Question from '../questions/Questions'
import axios from 'axios'
import styled from 'styled-components'

const Quiz = (props) => {
  const [questions, setQuestions] = useState([])
  const [teachersName, setTeachersName] = useState('')
  const {_id, name} = props.quiz



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
      <Text onPress={() => console.log('you pressed text')}>{teachersName === undefined || '' ? null : teachersName}</Text>
    </View>
  );
};

const ButtonStyle = styled.Button`
  color: purple;
`;

export default withFirebase(Quiz);