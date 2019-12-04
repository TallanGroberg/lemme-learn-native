import React, { useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native'
import axios from 'axios'
import {withFirebase} from '../../config/firebase/context'
const PickTeacher = (props) => {
  const [teachers, setTeachers] = useState([])
  const [yourTeachers, setYourTeachers] = useState([])
  console.log('teacher in pickTeacher',yourTeachers)
  console.log('your firebase uid', props.user)
  useEffect( () => {
    axios.get('https://lemme-learn.herokuapp.com/user')
    .then(res => {
      const allTeachers = res.data.filter(person => person.teacher === true)
      setTeachers(allTeachers)
    })
  }, [])

 

  const addTeachers = () => {
    const filterDuplicates = new Set(yourTeachers)
    const filteredArray = [...filterDuplicates]
    console.log('filtered array in pick teacher',)
    
    axios.put(`http://lemme-learn.herokuapp.com/user/${props.user.firebaseUid}`, {yourTeachers: filteredArray})
    .then(res => console.log(res))
    .catch(err => console.log(err))
    props.navigation.navigate('Quizzes')
  }




  return (
    <View>
      <Text>Pick Teacher</Text>
      {teachers.map(teacher => {
        return <Button title={teacher.email} onPress={() => setYourTeachers(prev => ([...prev, teacher.firebaseUid]))} />
      })}
      <Button title='save teachers' onPress={addTeachers} />
    </View>
  );
};

export default withFirebase(PickTeacher);