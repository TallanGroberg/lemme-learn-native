import React, {useState} from 'react';
import {View, Button, Text, TextInput, KeyboardAvoidingView} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import {FormLabel} from 'react-native-elements'
import axios from 'axios'
import styled from 'styled-components'


const SignUp = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState([])
  
  console.log(errors)

  const handleLogin = async () => {
    await props.firebaseAuth.loginWithEmail(inputs.email, inputs.password)
    .then(async res => {
      //access token!!!!
     
      const token = Object.entries(res.user)[5][1].b
        await props.setToken(token)
          await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
            .then(user => {
           
              props.setUser(user.data)
          })
          
        })
        .catch( err => {
          setErrors(prev => ([...prev, err.message]))
        })
        props.navigation.navigate('Quizzes')
  }

  const _asyncInAsync =  (token) => {
    AsyncStorage.setItem('userToken',  token)
  }

  return (
  <KeyboardAvoidingView>
    <ViewStyle>
      <Text>welcome to lemme-learn, the app where teachers get instant feedback from their students. Login.</Text>
        
      <TextInput placeholder="email"
        onChangeText={ email => setInputs(prev => ({...prev, email}))} 
        value={inputs.email} />
      <TextInput placeholder="password"
        onChangeText={ password => setInputs(prev => ({...prev, password}))}
        value={inputs.password} />
        {errors === '' ? null : <Text>{errors}</Text>}
     
        <TextStyle onPress={handleLogin}>login</TextStyle>
        <Button title="dont have an account?" onPress={() => props.navigation.navigate('SignUp')} />
      
    </ViewStyle>
  </KeyboardAvoidingView>
    
  );
};

const TextStyle = styled.Text`

font-family: sans-serif;
font-size: 25px;
  color: purple;
`;

const ViewStyle = styled.View`
  position: relative;
  margin: auto;
  left: 0;
  right: 0;
  
`;

export default withFirebase(SignUp);
//from array 

