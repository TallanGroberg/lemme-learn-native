import React from 'react';
import {View, Text, TextInput} from 'react-native'
import {withFirebase} from "../../config/firebase/context"

const MakeQuestions = (props) => {
  console.log(props)
  return (
    <View>
      <Text>MakeQuestions</Text>
    </View>
  );
};

export default withFirebase(MakeQuestions);