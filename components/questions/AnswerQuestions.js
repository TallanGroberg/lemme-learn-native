import React, { useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native'
import axios from 'axios'
import {withFirebase} from "../../config/firebase/context"
import styled from 'styled-components'

const AnswerQuestions = (props) => {
  const [hideQuestion, setHideQuestion] = useState(false)
  const [grading, setGrading] = useState({
    quiz_id: props.quiz._id, 
    question_id: props.question._id,
    students_answer: '',
    student_Uid: props.user.firebaseUid,
    answered_correctly: false
  })
  console.log('grading objanswer ', grading.students_answer, hideQuestion)

  const sendStudentsAnswer = () => {
    console.log('hitting grading')
    props.addStudentsAnswers(grading)
    setHideQuestion(prev => (!prev))
    
  }

  // when they submit a question send it to the parent components state
  //hide the question after they submit it

  return (
    <View>
      {hideQuestion === true ? <Text>resubmit</Text> : 
      <View>
      <Text>{props.question.question}</Text>
      <TextInput placeholder='your answer'
        onChangeText={students_answer => setGrading(prev => ({...prev, students_answer}))} />
        <TextStyle onPress={sendStudentsAnswer}>submit question</TextStyle>
        </View>}
    </View>
  );
};

const TextStyle = styled.Text`

font-family: sans-serif;
font-size: 15px;
  color: purple;
`;

export default withFirebase(AnswerQuestions);