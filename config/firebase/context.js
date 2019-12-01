import React, {createContext, useState} from 'react'
import {firebaseAuth} from './firebase'
import {AsyncStorage } from 'react-native'

const firebaseContext = createContext({})

const {Provider, Consumer} = firebaseContext


const FireBaseProvider = (props) => {
  const [user, setUser] = useState({})
  
  
  
  

      
     
  const storeData = async () => {
    console.log('hit')
    try {
        await AsyncStorage.setItem('token', user)
    } 
    catch(err) {
      console.log('error message',err.message)
    }
    finally {
      getUserToken(token)
    }
  }

  const getUserToken = async (token) => {
   
    try {
      token = AsyncStorage.getItem('token')
      if(token !== null) {
        console.log('token', token)
      }
    } catch (err) {
      // Error retrieving data
      console.log(err.message);
    }
    return token;
  }

  console.log('get user token in context',getUserToken())
  console.log('async storage',AsyncStorage.getItem('token'))


  return (
    <Provider value={{
      firebaseAuth,
      user,
      setUser,
      storeData,
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