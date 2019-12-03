import React, {useState,} from 'react'
import {View, Button, Text, TextInput} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'


const MakeQuiz = (props) => {
  const initState = {teacher: props.user.firebaseUid, name: ''}
  const [inputs, setInputs] = useState(initState)
  console.log('inputs in makequiz',inputs)
  console.log(props.user.firebaseUid)
  const handleSubmit = () => {
    axios.post('https://lemme-learn.herokuapp.com/quiz', inputs)
    .catch(err => console.log(err))
    props.navigation.push("Quizzes")
  }

  
  return (
    <View>
      <Text>make a quiz</Text>
      <TextInput placeholder="quiz name" onChangeText={name => setInputs(prev => ({...prev, name})) } />
      <Button title='submit' onPress={handleSubmit} />
    </View>
  );
};

export default withFirebase(MakeQuiz);
