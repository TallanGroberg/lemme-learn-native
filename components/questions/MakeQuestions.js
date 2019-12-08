import React, {useState,} from 'react';
import {View, Text, TextInput, Button} from 'react-native'
import {withFirebase} from "../../config/firebase/context"
import axios from 'axios'

const MakeQuestions = (props) => {
  const {user, quiz, updateQuestions} = props
    const initState = {
      question: '',
      correctAnswer: '',
      quiz_id: quiz._id,
      teacher_id: user.firebaseUid,
    }
      const [inputs, setInputs] = useState(initState)
      console.log('iekdie',inputs)


  const handleSubmit = () => {
    console.log('handle submit')
    axios.post(`https://lemme-learn.herokuapp.com/question`, inputs)
    .then(res => {
      console.log('hit res')
      updateQuestions()
    })
    .catch(err => console.log(err.message))
    console.log('no errors submit handled')
    setInputs(initState)
  }

  

  return (
    <View>
      <Text>MakeQuestions</Text>
        <TextInput placeholder='question'
          value={inputs.question} 
            onChangeText={ question => setInputs(prev => ({...prev, question}))} />
        <TextInput placeholder='correct answer'
          value={inputs.correctAnswer}
            onChangeText={ correctAnswer => setInputs(prev => ({...prev, correctAnswer}))} />
              <Button title="submit" onPress={handleSubmit} />
    </View>
  );
};

export default withFirebase(MakeQuestions);