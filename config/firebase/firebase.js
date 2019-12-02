import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import firebaseConfig from './firebaseconfig'

firebase.initializeApp(firebaseConfig)





export const firebaseAuth = {
  //auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
  },
  getIdToken: (email,password) => {
    return firebase.auth().getIdToken(true)
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
  },

}





export default firebase