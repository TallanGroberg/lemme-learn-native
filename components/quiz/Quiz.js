import React, {useState, useEffect} from 'react';
import {View, Button, Text, Alert} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'

const Quiz = (props) => {
  const [questions, setQuestions] = useState([])
  const [teachersName, setTeachersName] = useState('')
  const {_id, name} = props.quiz

  useEffect( () => {
    axios.get('http://lemme-learn.herokuapp.com/question')
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
              title={name}
                onPress={() => Alert.alert(`this is `)} />
                {questions.map(question => <Text>{question.question}</Text>)}

    </View>
  );
};

export default withFirebase(Quiz);