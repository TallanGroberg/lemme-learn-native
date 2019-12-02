import React, {useState,} from 'react'
import {View, Button, Text, TextInput} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'


const MakeQuiz = (props) => {
  const initState = {teacher: '', name: ''}
  const [inputs, setInputs] = useState({})
  
  const handleSubmit = () => {
    axios.post('http://lemme-learn.herokuapp.com/quiz', inputs)
    .catch(err => console.log(err))
    props.navigation.goBack()
  }
  
  return (
    <View>
      <Text>make a quiz</Text>
      <TextInput placeholder="quiz name" onChangeText={name => setInputs(prev => ({...prev, teacher: props.user.uid, name})) } />
      <Button title='submit' onPress={handleSubmit} />
    </View>
  );
};

export default withFirebase(MakeQuiz);
