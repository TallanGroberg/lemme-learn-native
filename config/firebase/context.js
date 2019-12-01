import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native';

const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')

  console.log('in context',token, user.email)
  
  const signOut = async () => {
    await setUser({})
    await setToken('')
    .then( () => {
      console.log('tok', token, 'user',user.email)
    })
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