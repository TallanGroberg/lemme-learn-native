import React from 'react';
import {View, Button} from 'react-native'
import {withFirebase} from '../config/firebase/context'


const Nav = (props) => {


  
  const handleSignOut = async () => {
    console.log('handlSignOut')
    try {
      await props.firebaseAuth.signOut()
      await props.signOut()
      props.navigation.goBack("SignUp")
    }
    catch(err) {
      console.log(err)
    }
    
  }
  return (
    <View>
      {props.token === '' || undefined ? null : <Button title="sign out" onPress={() => props.navigation.goBack() } onPress={handleSignOut} />}
    </View>
  );
};

export default withFirebase(Nav);