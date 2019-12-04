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
  
  const handleSignUp = async (inputs) => {

    console.log('props in context',props)
    
      firebaseAuth.signupWithEmail(inputs.email, inputs.password)
      .then(async res => {
          await axios.post(`http://lemme-learn.herokuapp.com/user/`, {email: inputs.email, firebaseUid: res.user.uid, teacher})
            .catch(err => console.log( err.message))

            const token = Object.entries(res.user)[5][1].b

              await props.setToken(token)
                axios.get(`http://lemme-learn.herokuapp.com/user/${res.user.uid}`)
                        .then(user => {
                          setUser(user.data)
                        })
                        .catch(err => setErrors(prev => ([...prev, err.message])))
      })
          .catch(err => setErrors(prev => ([...prev, err.message])))
            setErrors(prev => ([...prev, err.message]))
            prop.navigation.navigate('PickTeacher')

  }

  const signOut = async () => {
    await setUser({})
     setToken('')
  }

  const getQuizzes = () => {
    if(user.teacher === true) {
      axios.get('https://lemme-learn.herokuapp.com/quiz')
      .then(res => {
          const yourQuizzes = res.data.filter(quiz => quiz.teacher === user.firebaseUid)
          setQuizzes(yourQuizzes)
        })
        .catch(err => console.error(err))
      } 
      if(user.teacher === false){
        user.yourTeachers.map( aTeacher => {
          console.log('a teacher',aTeacher)
          axios.get(`https://lemme-learn.herokuapp.com/quiz/teachersquizzes/${aTeacher}`)
          .then(res => {
            setQuizzes(prev => ([...prev, ...res.data]))
          })
          .catch(err => console.log(err))
        })
      }
  }


  return (
    <Provider value={{
      firebaseAuth,
      user,
      setUser,
      setToken,
      token,
      signOut,
      quizzes,
      getQuizzes,
      handleSignUp,
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