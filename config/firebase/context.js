import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native';

const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({
   
    _id: "5de6f72b2478ed0017cf1c90",
    email: "Sa2@s.com",
    firebaseUid: "4pG6fUMnkFXZhd6r33t8xHVhOqE2",
    teacher: false,
    yourTeachers: [
      "xtbuTsXyBwUNBJXedraZQfnP4wr2",
      "H5cmhhY8pdhILReT7q8U1GiGtB83",
    ],
  })
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