import React, {useState, useEffect} from 'react';
import {View, Button, Text, Alert} from 'react-native'
const Quiz = (props) => {
  const {_id, name} = props.quiz

  return (
    <View>
      <Text>{name}</Text>
      <Button key={_id}
              title={name}
                onPress={() => Alert.alert(`this is ${name}`)} />

    </View>
  );
};

export default Quiz;