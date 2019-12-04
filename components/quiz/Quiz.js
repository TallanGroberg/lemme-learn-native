import React, {useState, useEffect} from 'react';
import {View, Button, Text, Alert} from 'react-native'
import {withFirebase} from '../../config/firebase/context'
import axios from 'axios'
const Quiz = (props) => {
  const [questions, setQuestions] = useState([])
  const {_id, name} = props.quiz

  useEffect( () => {
    axios.get('https://lemme-learn.herokuapp.com/question')
    .then( res => {
      const filterQuestions = res.data.filter(question => question.quiz_id === _id)
      setQuestions(filterQuestions)
    })
    .catch( err => console.log(err))
  }, [])


  return (
    <View>
     
      <Button key={_id}
              title={name}
                onPress={() => Alert.alert(`this is ${name}`)} />
                {questions.map(question => <Text>{question.question}</Text>)}

    </View>
  );
};

export default withFirebase(Quiz);