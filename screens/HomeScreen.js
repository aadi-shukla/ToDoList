/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const taskList = await AsyncStorage.getItem('TASKS');
    // console.log('home', JSON.parse(taskList));
    setTaskItems(JSON.parse(taskList));
  };
  const deleteTask = async index => {
    const tempTask = taskItems;
    // console.log('temp', getData());

    const selectedTask = tempTask.filter((item, ind) => {
      return ind !== index;
    });
    setTaskItems(selectedTask);
    // console.log('aa', selectedTask);
    await AsyncStorage.setItem('TASKS', JSON.stringify(selectedTask));
    // console.log('home', taskItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items} />
      </View>
      <FlatList
        data={taskItems}
        renderItem={(item, index) => {
          // console.log('render', item);
          return (
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <BouncyCheckbox
                  size={25}
                  fillColor="red"
                  unfillColor="#FFFFFF"
                  text={item.item.task}
                  iconStyle={{borderColor: 'red'}}
                  innerIconStyle={{borderWidth: 2}}
                  textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  onPress={(isChecked: boolean) => {}}
                />
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteTask(item.index)}>
                <Text style={styles.textDelete}>DELETE</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
          <View style={styles.addWrapper}>
            <Text style={styles.addTask}>ADD TASK</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addTask: {
    padding: 25,
  },

  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  delete: {
    width: 55,
    height: 30,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textDelete: {
    padding: 5,
    fontSize: 11,
  },
});

export default HomeScreen;
