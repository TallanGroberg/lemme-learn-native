import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native';

const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState('testing token')
  console.log(user)
  
  const signOut = async () => {
    await setUser({})
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