import React, {useState,} from 'react'
import {View, Button, Text, TextInput, Alert} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'


const MakeQuiz = (props) => {
  const initState = {teacher: props.user.firebaseUid, name: ''}
  const [inputs, setInputs] = useState(initState)
 

  const handleSubmit = () => {
    if(inputs.name === ''){
      Alert.alert('you cannot have a blank quiz')
    } else {
      axios.post('https://lemme-learn.herokuapp.com/quiz', inputs)
      .catch(err => console.log(err))
      props.navigation.push("Quizzes")
    }
  }

  
  return (
    <View>
      <Text>make a quiz</Text>
      <TextInput placeholder="quiz name" onChangeText={name => setInputs(prev => ({...prev, name})) } />
      <Button title='submit' onPress={handleSubmit} />
      <Button title='go back to quizzes' onPress={() => props.navigation.navigate("Quizzes")} />
    </View>
  );
};

export default withFirebase(MakeQuiz);
