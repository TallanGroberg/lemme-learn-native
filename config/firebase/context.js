import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage} from 'react-native';
import axios from 'axios'
const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [errors, setErrors] = useState([])
  const [response, setResponse] = useState(null)
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const [quizzes, setQuizzes] = useState([])
  console.log('user in context',user)
  console.log('token in context',token)
  console.log('quizzes in context',quizzes)
  
  handleSignUpInContext = async (userFromFirebase, teacher) => {
    await axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: userFromFirebase.email, firebaseUid: userFromFirebase.uid, teacher})
          console.log('posted user')
          const token = Object.entries(userFromFirebase.user)[5][1].b
            await props.setToken(token)
              await axios.get(`http://lemme-learn.herokuapp.com/user/${userFromFirebase.user.uid}`)
                      .then(user => {
                        console.log('user data in handleSgnUlInContext',)
                      props.setUser(user.data)
                      })
  }
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