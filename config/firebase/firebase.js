import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import firebaseConfig from './firebaseconfig'

firebase.initializeApp(firebaseConfig)

export const firebaseAuth = {
  //auth
  loginWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
  },
  signupWithEmail: (email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
  },
  signOut: (email,password) => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },

  //firestore 

  createNewUser: userData => {
    return firebase
      .firestore()
      .collection()
      .doc(`${userData.uid}`)
      .set(userData)
  }

}

export default firebase