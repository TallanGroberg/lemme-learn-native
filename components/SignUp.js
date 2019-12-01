import React, {useState} from 'react';
import {View, Button, Text, TextInput} from 'react-native'
import {withFirebase} from '../config/firebase/context'
import {FormLabel} from 'react-native-elements'



const SignUp = (props) => {
  const initState = { email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  // console.log('props in signup',props.firebaseAuth)
  console.log(inputs)

  const handleChange = () => {
    setInputs(input => ({...input, email: inputs.email}))
    
  }

  return (
    <View>
      <TextInput placeholder="email"
       onChangeText={ email => setInputs(prev => ({...prev, email}))} 
       value={inputs.email} />
      <TextInput placeholder="password"
       onChangeText={ password => setInputs(prev => ({...prev, password}))}
       value={inputs.password} />
      
    </View>
      
    
  );
};

export default withFirebase(SignUp);