import React, {useState} from 'react';
import {View, Button, Text, TextInput,} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import styled from 'styled-components'
import axios from 'axios'


const SignUp = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [teacher, setTeacher] = useState(false)
    const {setErrors, errors, } = props
    console.log(teacher)

  const handleSignUp = (inputs, teacher) => {
    try {
      props.firebaseAuth.signupWithEmail(inputs.email, inputs.password)
      .then(res => {
        props.handleSignUpInContext(res.user)
          })
          .catch(err => console.log(err))
    }
    catch(err) {
      setErrors(err.message)
      console.log(errors)
    }
    finally {
      console.log('user.teacher ???',props.user.teacher)
      props.navigation.navigate(props.user.teacher === true ? 'Quizzes' : 'PickTeacher')
    }
  }

  
      console.log('props in sugnUp',props)
  return (
    <View>
      <Text>Sign up. must provide a valid email address.</Text>
        <TextInput placeholder="email"
          onChangeText={ email => setInputs(prev => ({...prev, email}))} 
            value={inputs.email} />

      <TextInput placeholder="password"
        onChangeText={ password => setInputs(prev => ({...prev, password}))}
          value={inputs.password} />
            <Button title="signup" onPress={() => handleSignUp(inputs)} />

      <Text>are you a teacher or student? </Text>
        <Button title='teacher' onPress={() => setTeacher(true)}/>
          <Button title='student' onPress={() => setTeacher(false)}/>

            {errors !== '' ? <Text>{errors}</Text> : null}
      
    </View>
      
    
  );
};

export default withFirebase(SignUp);


