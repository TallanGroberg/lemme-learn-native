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
  const [quiz, setQuiz] = useState({})
  console.log('user',user, "quiz",token)
  
  
  
  const signOut = async () => {
    await setUser({})
     setToken('')
  }


  return (
    <Provider value={{
      firebaseAuth,
      user,
      setUser,
      token,
      setToken,
      quiz,
      setQuiz,
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