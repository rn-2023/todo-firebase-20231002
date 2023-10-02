import { useState } from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import { child, push, ref, remove, update } from 'firebase/database';
import { db, TODOS_REF } from './firebase/Config';
import styles from './style/style';

export default function App() {

  const [newTodo, setNewTodo] = useState('');

  const addNewTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        done: false,
        todoItem: newTodo
      }
      const newTodoItemKey = push(child(ref(db), TODOS_REF)).key;
      const updates = {};
      updates[TODOS_REF + newTodoItemKey] = newTodoItem;
      setNewTodo('');
      return update(ref(db), updates);
    }
  }

  const removeTodos = () => {
    remove(ref(db), TODOS_REF);
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Todolist', 'Remove all items?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', 
        onPress: () => removeTodos()
      }],
      { cancelable: false}
  );

  return (
    <View 
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.header}>Todolist</Text>
      <View style={styles.newItem}>
        <TextInput 
          placeholder='Add new todo'
          value={newTodo}
          style={styles.textInput}
          onChangeText={setNewTodo}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button 
          title='Add new Todo item'
          onPress={() => addNewTodo()}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button 
          title='Remove all todos'
          onPress={() => createTwoButtonAlert()}
        />
      </View>
    </View>
  );
}