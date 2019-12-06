import React, { useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'
const PickTeacher = (props) => {
  const [teachers, setTeachers] = useState([])
  const [yourTeachers, setYourTeachers] = useState([])
  const [error, setError] = useState('')

  
  useEffect( () => {
      axios.get('https://lemme-learn.herokuapp.com/user/teachers')
        .then(res => {
          setTeachers(res.data)
        })
        .catch(err => console.log(res))
  }, [])

  const addTeachers = () => {
      axios.put(`https://lemme-learn.herokuapp.com/user/${props.user.firebaseUid}`, {yourTeachers: yourTeachers})
      .then(res => props.navigation.navigate('Login'))
      .catch(err => setError(err.message))
  }




  return (
    <View>
      <Text>Pick Teachers, then you will be prompted to login.</Text>
      {error === '' || undefined || null ? null : <Text>{error}</Text>}
      {teachers.map(teacher => {
        return <Button title={teacher.email} onPress={() => setYourTeachers(prev => ([...prev, teacher.firebaseUid]))} />
      })}
      <Button title='save teachers' onPress={addTeachers} />
    </View>
  );
};

export default withFirebase(PickTeacher);