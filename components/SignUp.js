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
        const token = Object.entries(res.user)[5][1].b
        console.log(token)
        await props.setUser(res.user)
        await props.setToken(token)
        props.navigation.navigate('Quizzes')
      })
    }
    catch(err) {
      setErrors(err.message)
      console.log(errors)
    }
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
   
       
      
    </View>
      
    
  );
};

export default withFirebase(SignUp);
//from array 

