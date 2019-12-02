import React, { useState, useEffect, } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import {firebaseAuth} from './config/firebase/firebase'
import FireBaseProvider, {withFireBase} from './config/firebase/context'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Nav from './components/Nav'

const App = (props) => {

    return (
        <FireBaseProvider value={firebaseAuth}>
          <Home />
        </FireBaseProvider>
    );
  }

  



  export default App






