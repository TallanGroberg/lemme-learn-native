import React, { useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'
const PickTeacher = (props) => {
  const [teachers, setTeachers] = useState([])
  const [yourTeachers, setYourTeachers] = useState([])
  const [error, setError] = useState('')

  
  useEffect( () => {
    axios.get('https://lemme-learn.herokuapp.com/user')
    .then(res => {
      const allTeachers = res.data.filter(person => person.teacher === true)
      setTeachers(allTeachers)
    })
  }, [])

  const addTeachers = async  () => {
    try {
      await axios.put(`https://lemme-learn.herokuapp.com/user/${props.user.firebaseUid}`, {yourTeachers: yourTeachers})
      .then(res => console.log(res.data, res.status))
      .catch(err => setError(err.message))
    }
    catch(err) {
      setError(err.message)
    }
    finally {
      props.navigation.navigate('Login')
    }
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