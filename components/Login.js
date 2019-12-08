import React, {useState} from 'react';
import {View, Button, Text, TextInput, KeyboardAvoidingView} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import {FormLabel} from 'react-native-elements'
import axios from 'axios'
import styled from 'styled-components'


const Login = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [fireBaseResponse, setFireBaseResponse] = useState(null)
  const [response, setResponse] = useState('')
  const [errors, setErrors] = useState([])

  console.log('from firebase',fireBaseResponse)
  console.log('from my api', response)
  
  const allErrors = errors.map(err => {
    return <TextError>{errors}</TextError>
  })

  const handleErrors = (arg) => {
    
    const filterDuplicates = new Set([arg, ...errors])
    console.log('the set', filterDuplicates)
    const backToArr = [...filterDuplicates]
    setErrors(prev => ([...backToArr]))
  }

  const handleLogin = async () => {
    await props.firebaseAuth.loginWithEmail(inputs.email, inputs.password)
    .then(async res => {
      //access token!!!!
      setFireBaseResponse(res.user.uid)
      console.log(res.status)
      const token = Object.entries(res.user)[5][1].b
      
        await props.setToken(token)
          await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
            .then(user => {
             
               setResponse(user.data.firebaseUid)
              props.setUser(user.data)
          })
          
        })
        .catch( err => {
          console.log('hit errors')
          handleErrors(err.message)
        })
        if(inputs.email !== '' && inputs.password !== '' && errors.length === 0 && fireBaseResponse === response){
          console.log('firebaseUid',props.user.firebaseUid)
          props.navigation.navigate('Quizzes')
        } 
  }

  const handleEmail = email => {
    setInputs(prev => ({...prev, email}))
    setErrors([])
  }
  const handlePassword = password => {
    setInputs(prev => ({...prev, password}))
    setErrors([])
  }

  return (


    <View style={{marginTop: 175, left: 0, right: 0,}}>
    {errors === '' ? null : allErrors}
      <Text>welcome to lemme-learn, the app where teachers get instant feedback from their students. Login.</Text>
      {errors.length === 0 ? null :<TextError>start typing and the error messages will go away</TextError>}
      <TextInput placeholder="email"
        onChangeText={ email => handleEmail(email)} 
        value={inputs.email} />
      <TextInput placeholder="password"
        onChangeText={ password => handlePassword(password)}
        value={inputs.password} />
        <TextStyle onPress={handleLogin}>double click to login</TextStyle>
        <Button title="dont have an account?" onPress={() => props.navigation.navigate('SignUp')} />
      </View>


    
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

const TextError = styled.Text`
color: red;
`;

export default withFirebase(Login);
//from array 

