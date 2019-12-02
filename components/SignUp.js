import React, {useState} from 'react';
import {View, Button, Text, TextInput,} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import styled from 'styled-components'
import axios from 'axios'


const SignUp = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState('')
  const [teacher, setTeacher] = useState(false)
    console.log(teacher)

  const handleSignUp = async () => {
    try {
      await props.firebaseAuth.signupWithEmail(inputs.email, inputs.password)
      .then(async res => {
          axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: inputs.email, firebaseUid: res.user.uid, teacher})
            await props.setToken(token)
              await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
                      .then(user => {
                      props.setUser(user.data)
                      })
            const token = Object.entries(res.user)[5][1].b
            
          })
          .catch(err => console.log(err))
    }
    catch(err) {
      setErrors(err.message)
      console.log(errors)
    }
    finally {
      props.navigation.navigate('Quizzes')
    }
  }

  

  return (
    <SignUpStyle>
      <Text>Sign up. must provide a valid email address.</Text>
      <TextInput placeholder="email"
       onChangeText={ email => setInputs(prev => ({...prev, email}))} 
       value={inputs.email} />
      <TextInput placeholder="password"
       onChangeText={ password => setInputs(prev => ({...prev, password}))}
       value={inputs.password} />
       <Button title="signup" onPress={handleSignUp} />
       {errors === '' ? null : <Text>{errors}</Text>}
      <Text>are you a teacher or student? </Text>
        <Button title='teacher' onPress={() => setTeacher(true)}/>
        <Button title='student' onPress={() => setTeacher(false)}/>
      
      
    </SignUpStyle>
      
    
  );
};

const SignUpStyle = styled.View`
  Button {
    background-color: red;
  }

`


export default withFirebase(SignUp);
//from array 

