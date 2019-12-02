import React, {useState} from 'react';
import {View, Button, Text, TextInput,} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import {FormLabel} from 'react-native-elements'
import axios from 'axios'


const SignUp = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState('')
  
  

  const handleLogin = async () => {
    await props.firebaseAuth.loginWithEmail(inputs.email, inputs.password)
    .then(async res => {
      //access token!!!!
      const token = Object.entries(res.user)[5][1].b
      await props.setToken(token)
      await axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
      .then(res => {
        props.setUser(res.data)
      })
      props.navigation.navigate('Quizzes')
      
    })
    .catch( err => {
      setErrors(err.message)
    })
  }

  return (
    <View>
      <Text>Login.</Text>
      <TextInput placeholder="email"
        onChangeText={ email => setInputs(prev => ({...prev, email}))} 
        value={inputs.email} />
      <TextInput placeholder="password"
        onChangeText={ password => setInputs(prev => ({...prev, password}))}
        value={inputs.password} />
        {errors === '' ? null : <Text>{errors}</Text>}
        <Button title="login" onPress={handleLogin} />
        
      
    </View>
      
    
  );
};

export default withFirebase(SignUp);
//from array 

