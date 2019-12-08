import React, {useState} from 'react';
import {View,Text,Button, TextInput} from 'react-native'
import axios from 'axios'
import styled from 'styled-components'

const EditQuestion = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputs, setInputs] = useState({question: '', correctAnswer: '',})

  const handleEdit = (inputs) => {
    console.log('handle Edit', inputs)
    axios.put(`https://lemme-learn.herokuapp.com/question/${props.question._id}`, inputs)
    .then( async res => {
      await props.updateQuestions()
      setIsEditing(prev => (!prev))
    })

  }
  return (
    <View>
      <EditStyle onPress={() => setIsEditing(prev => (!prev))}>{isEditing ? 'hide' : "edit question"}</EditStyle>
      {isEditing ? <View><TextInput placeholder='new question'
                      onChangeText={question => setInputs(prev => ({...prev, question}))} />
                        <TextInput placeholder='new answer'
                          onChangeText={answer => setInputs(prev => ({...prev, correctAnswer: answer}))} />
                            <Button title='submit edits' onPress={() => handleEdit(inputs) } />
                      </View>
                       : null}
    </View>
  );
};

const EditStyle = styled.Text`
  font-size: 15px;
  color: purple;
`;

export default EditQuestion;