/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Firestore from '@react-native-firebase/firestore';
import Todo from './Todo';
import { Actions } from 'react-native-router-flux';

function Home() {
  const ref = Firestore().collection('todos');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      console.log(querySnapshot)
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  });
  
  const [ todo, setTodo ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ todos, setTodos ] = useState([]);

  async function addTodo() {
    if(todo == '') {
      await Alert.alert(
          'คำเตือน!!!', 
          'กรุณาพิมพ์ข้อความลงที่สร้างงานใหม่ด้วย', 
          [ {text: 'ตกลง'} ]
      )
    } else {
      await ref.add({
        title: todo,
        complete: false,
      });
      setTodo('');
    }
  }

  function gotoAdd() {
    Actions.add()
}

  if (loading) {
    return null; // or a spinner
  }
  
  return (
    <>
      <Appbar>
        <Appbar.Content title={'งานที่ต้องทำ'} />
      </Appbar>
      <FlatList 
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <Button onPress={() => gotoAdd()}>สร้างงานใหม่</Button>
    </>
  );
};

export default Home;