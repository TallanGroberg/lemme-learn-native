import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native'


const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({})

  const userTokenToAsyncStorage = () => {
    if(user !== {} ) {
      AsyncStorage.setItem('token', JSON.stringify(user.uid))
      console.log(AsyncStorage.getItem('token'))
    }
  }

  return (
    <Provider value={{
      firebaseAuth,
      user,
      setUser: setUser,
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