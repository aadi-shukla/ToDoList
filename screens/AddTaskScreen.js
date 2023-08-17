/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

let tasks = [];

const AddTaskScreen = ({navigation}) => {
  const [task, setTask] = useState('');

  const addTask = async () => {
    let existingTasks = [];
    tasks = [];
    let a = JSON.parse(await AsyncStorage.getItem('TASKS'));
    existingTasks = a;
    // console.log('data', existingTasks);
    existingTasks.map(item => {
      tasks.push(item);
    });
    tasks.push({task: task});
    await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
    navigation.goBack();
  };

  const addTaskHandler = () => {
    task === '' ? Alert.alert('Please enter a task') : addTask();
  };

  return (
    <View style={styles.writeTaskWrapper}>
      <TextInput
        style={styles.input}
        placeholder={'Add a task'}
        value={task}
        onChangeText={text => setTask(text)}
      />
      <TouchableOpacity onPress={() => addTaskHandler()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addTask}>ADD TASK</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
  },
  addText: {},
});

export default AddTaskScreen;
