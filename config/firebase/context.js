import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native';

const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({firebaseUid: '', email: '', teacher: false})
  const [token, setToken] = useState('')
  console.log('user',user, token)
  
  const signOut = async () => {
    await setUser({firebaseUid: '', email: ''})
     setToken('')
   
  }


  return (
    <Provider value={{
      firebaseAuth,
      user,
      setUser,
      setToken,
      token,
      signOut,
    }}>
      {props.children}
    </Provider>
  )
}


export const withFirebase = C => props => (
  <Consumer>
    {value => <C {...value} {...props} />}
  </Consumer>
)

export default FireBaseProvider