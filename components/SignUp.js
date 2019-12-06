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
 


  const handleSignUp = async () => {
     
      if (typeof(inputs.email) === 'string' ) {
        await props.firebaseAuth.signupWithEmail(inputs.email, inputs.password)
          .then( async res => {
            axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: res.user.email, firebaseUid: res.user.uid, teacher: inputs.teacher})
            .then(res => console.log('post went through',res.status))
              .catch(err => console.log('post failed',err))
               
                const token = await Object.entries(res.user)[5][1].b
                  await props.setToken(token)
                    await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
                      .then(user => {
                       
                          props.setUser(user.data)
                      })
          })
          .catch(err => {
            console.log(err.message)
            console.log('hit error block')
            setErrors(err.message)
          })
        }

        props.navigation.navigate("Quizzes")
    }
  

  
      console.log('props in sugnUp',props)
  return (
    <ViewStyle>
      <Text>Sign up. must provide a valid email address.</Text>
        <TextInput placeholder="email"
          onChangeText={ email => setInputs(prev => ({...prev, email}))} 
            value={inputs.email} />

      <TextInput placeholder="password"
        onChangeText={ password => setInputs(prev => ({...prev, password}))}
          value={inputs.password} />
            <TextStyle onPress={() => handleSignUp(inputs)}>signup</TextStyle>

      <Text>are you a teacher or student? </Text>
        <Button title='teacher' onPress={() => setInputs(prev => ({...prev, teacher: true}))}/>
        <Button title='student' onPress={() => setInputs(prev => ({...prev, teacher: false}))}/>
      
      
    </ViewStyle>
      
    
  );
};

const TextStyle = styled.Text`
font-family: sans-serif;
font-size: 25px;
  color: purple;
`;

const ViewStyle = styled.View`
  margin: auto;
  left: 0;
  right: 0;
`;

export default withFirebase(SignUp);


