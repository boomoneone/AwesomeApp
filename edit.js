import React, { useEffect, useState } from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Firestore from '@react-native-firebase/firestore';
import { Actions } from 'react-native-router-flux';

function Edit({  id }) {
    const ref = Firestore().collection('todos');
    const [ todo, setTodo ] = useState('');

    useEffect(() => {
         ref.doc(id).get().then(
             (result) => {
                setTodo(result.data().title)
           }
        )
    });
    
    function editTodo() {
        ref.doc(id).update({
            title: todo
        }).then(() => {
            Actions.home()
        })

    }   
    
    return (
        <>
           <Appbar>
             <Appbar.Content title={'แก้ไขงานที่ต้องทำ'} />
           </Appbar>
           <Text>doc id : {id}</Text>
       <TextInput label={'ชื่องานที่ต้องทำ'} value={todo} onChangeText={setTodo} />
      <Button onPress={() => editTodo()}>Edit TODO</Button>

        </>
    )
};


export default Edit;