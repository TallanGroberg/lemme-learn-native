import React, {useState} from 'react';
import {View, Button, Text, TextInput,} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import styled from 'styled-components'
import axios from 'axios'


const SignUp = (props) => {
  const initState = { email: '', password: '', teacher: false,}
  const [inputs, setInputs] = useState(initState)
  const [fireBaseResponse, setFireBaseResponse] = useState(null)
  const [response, setResponse] = useState('')
  const [error, setError] = useState([])

  const errorMessages = error.map(err => {
  return <TextError>{err}</TextError>})
  
 
  

  const handleErrors = (arg) => {
    const filterDuplicates = new Set([arg, ...error])
    const backToArr = [...filterDuplicates]
    setError(prev => ([...backToArr]))
  }



  const handleSignUp = async () => {

    if (typeof(inputs.email) === 'string' ) {
        await props.firebaseAuth.signupWithEmail(inputs.email, inputs.password)
          .then( async res => {
            await setFireBaseResponse(res.user.uid)
            axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: res.user.email, firebaseUid: res.user.uid, teacher: inputs.teacher})
            .then(res => console.log('post went through',res.status))
              .catch(err => handleErrors(err.message))
               
                const token = await Object.entries(res.user)[5][1].b
                  await props.setToken(token)
                    await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
                      .then( user => {
                        console.log(user.data)
                            setResponse(user.data.firebaseUid)
                              props.setUser(user.data)
                      })
                      .catch(err => handleErrors(err.message))
          })
          .catch(err => {
            console.log('hit error block')
            handleErrors(err.message)
          })
        }

        if(error.length === 0 && inputs.email !== '' && inputs.password !== '' && fireBaseResponse 
        !== null) {
          props.navigation.navigate("Quizzes")
        } else {
          handleError('unsuccessful signup')
        }
    }

    const handleEmail = (email) => {
      setInputs(prev => ({...prev, email}))
      setError([])
    }
    const handlePassword = (password) => {
      setInputs(prev => ({...prev, password}))
      setError([])
    }

    const makeTeacher = () => {
      setInputs(prev => ({...prev, teacher: true}))
   

    } 
    const makeStudent = () => {
      setInputs(prev => ({...prev, teacher: false}))
      
    } 
  
  return (
    <ViewStyle >
      {error.length !== 0 ? errorMessages : null}
      <Text>double click to sign up.</Text>
        <TextInput placeholder="email"
          onChangeText={ email => handleEmail(email)} 
            value={inputs.email} />

      <TextInput placeholder="password"
        onChangeText={ password => handlePassword(password)}
          value={inputs.password} />

      <Text>Role: {inputs.teacher === true ? "Teacher" : "Student"} </Text>
        <RoleStyle style={{color: inputs.teacher === true ? "purple" : "black"}} onPress={makeTeacher}>Teacher</RoleStyle>
        <RoleStyle style={{color: inputs.teacher === true ? "black" : "purple"}} onPress={makeStudent}>Student</RoleStyle>
            <TextStyle onPress={() => handleSignUp(inputs)}>double click to signup</TextStyle>
      
      
    </ViewStyle>
      
    
  );
};

const TextStyle = styled.Text`
font-family: sans-serif;
font-size: 30px;
  color: purple;
`;
const TextError = styled.Text`
color: red;
`;

const RoleStyle = styled.Text`
  font-size: 20px;
`;

const ViewStyle = styled.View`
  margin-top: 100px;
`;


export default withFirebase(SignUp);


