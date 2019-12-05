import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native';

const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  console.log('user',user, token)
  
  handleSignUpInContext = async (userFromFirebase, teacher) => {
    console.log('hit signup in context')
    console.log('userFromFirebase', userFromFirebase.email, userFromFirebase.uid, teacher)
    await axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: userFromFirebase.email, firebaseUid: userFromFirebase.uid, teacher: teacher})
      .then(res => console.log(res))
        .catch(err => console.log(err))
          console.log('posted user')
          const token = Object.entries(userFromFirebase.user)[5][1].b
            await setToken(token)
              await axios.get(`http://lemme-learn.herokuapp.com/user/${userFromFirebase.user.uid}`)
                      .then(user => {
                        console.log('user data in handleSgnUlInContext',)
                      setUser(user.data)
                      })
  }
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
      handleSignUpInContext
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