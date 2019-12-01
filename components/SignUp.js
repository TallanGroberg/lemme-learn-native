import React, {useState} from 'react';
import {View, Button, Text, TextInput,} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import {FormLabel} from 'react-native-elements'



const SignUp = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState('')
  
  

  const handleSignUp = async () => {
    try {
      await props.firebaseAuth.signupWithEmail(inputs.email, inputs.password)
      .then(async res => {
        await props.setUser(res.user)
        props.storeData()
      })
    }
    catch(err) {
      setErrors(err.message)
      console.log(errors)
    }
  }

  const handleLogin = async () => {
    await props.firebaseAuth.loginWithEmail(inputs.email, inputs.password)
    .then(res => {
      //access token!!!!
      const token = Object.entries(res.user)[5][1].b
      props.setToken(token)
      props.setUser(res.user)
    })
    .catch( err => {
      setErrors(err.message)
    })
  }

  return (
    <View>
      <Text>Sign up. must provide a valid email address.</Text>
      <TextInput placeholder="email"
       onChangeText={ email => setInputs(prev => ({...prev, email}))} 
       value={inputs.email} />
      <TextInput placeholder="password"
       onChangeText={ password => setInputs(prev => ({...prev, password}))}
       value={inputs.password} />
       <Button title="signup" onPress={handleSignUp} />
       {errors === '' ? null : <Text>{errors}</Text>}
       <Button title="login" onPress={handleLogin} />
       
      
    </View>
      
    
  );
};

export default withFirebase(SignUp);
//from array 

