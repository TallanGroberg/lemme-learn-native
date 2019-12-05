import React, {useState} from 'react';
import {View, Button, Text, TextInput,} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import styled from 'styled-components'
import axios from 'axios'


const SignUp = (props) => {
  const initState = { email: '', password: '', teacher: false,}
  const [inputs, setInputs] = useState(initState)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState('')
 
    console.log('inputs', inputs.email)

  const handleSignUp = async () => {
     
      if (typeof(inputs.email) === 'string' ) {
        await props.firebaseAuth.signupWithEmail(inputs.email, inputs.password)
          .then( async res => {
            axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: res.user.email, firebaseUid: res.user.uid, teacher: inputs.teacher})
            .then(res => console.log('post went through',res.status))
              .catch(err => console.log('post failed',err))
                console.log('posted user')
                const token = await Object.entries(res.user)[5][1].b
                  await props.setToken(token)
                    await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
                      .then(user => {
                        console.log('user data in handleSgnUlInContext',)
                          props.setUser(user.data)
                      })
          })
          .catch(err => {
            console.log(err.message)
            console.log('hit error block')
            setErrors(err.message)
          })
        }

    

      console.log('user. insign up',props.user)
       props.navigation.navigate(props.user.teacher === true ? 'Quizzes' : 'PickTeacher')
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
        <Button title='teacher' onPress={() => setInputs(prev => ({...prev, teacher: true}))}/>
        <Button title='student' onPress={() => setInputs(prev => ({...prev, teacher: false}))}/>
      
      
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

