import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, Picker, TouchableOpacity, SafeAreaView} from 'react-native';
// import {Picker} from '@react-native-community/picker';

import {connect} from 'react-redux';
import {changeTimer} from '../store/actions/timerActions';

import Constants from 'expo-constants';

const Main = ({navigation, setTimer}) => {
    const [restMin, setRestMin] = useState(0);
    const [restSec, setRestSec] = useState(0);
    const [rep, setRep] = useState(0);
    const [workMin, setWorkMin] = useState(0);
    const [workSec, setWorkSec] = useState(0);
    const [warning, setWarning] = useState(null);

    let i = 0;
    const numbers = [];
    for (i = 0; i <= 59; i++) {
      numbers.push(i); 
    };

    const startHandler = () => {
      if(parseInt(rep)===0){
        setWarning(<Text style={styles.warning}>*You need to specify repitions</Text>);
        return;
      }
      const timer={
        workMin: workMin,
        workSec: workSec,
        restMin: restMin,
        restSec: restSec,
        rep: rep
      };
      setTimer(timer);
      navigation.navigate('Start');
    }
	
    return(
      <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.paragraph}>Interval</Text>

		
      <View style={styles.selection}>
		<Picker
          style={{ width: '50%' }}
          selectedValue={workMin}
          onValueChange={(itemValue, itemIndex) => {setWorkMin(itemValue)}}>
          {numbers.map((num) => (
            <Picker.Item label={num.toString()} value={num} key={num} />
          ))}
        </Picker>
		
        <Picker
          style={{ width: '50%' }}
          selectedValue={workSec}
          onValueChange={(itemValue, itemIndex) => {setWorkSec(itemValue)}}>
          {numbers.map((num) => (
            <Picker.Item label={num.toString()} value={num} key={num} />
          ))}
        </Picker>
      </View>

      <Text style={styles.paragraph}>Rest</Text>

      <View style={styles.selection}>
        <Picker
          style={{ width: '50%' }}
          selectedValue={restMin}
          onValueChange={(itemValue, itemIndex) => {setRestMin(itemValue)}}>
          {numbers.map((num) => (
            <Picker.Item label={num.toString()} value={num} key={num} />
          ))}
        </Picker>

        <Picker
          style={{ width: '50%' }}
          selectedValue={restSec}
          onValueChange={(itemValue, itemIndex) => {setRestSec(itemValue)}}>
          {numbers.map((num) => (
            <Picker.Item label={num.toString()} value={num} key={num} />
          ))}
        </Picker>
      </View>

      <Text style={styles.paragraph}>Repetitions</Text>
      {warning}

      <View style={styles.selection}>
        <Picker
          style={{ width: '50%' }}
          selectedValue={rep}
          onValueChange={(itemValue, itemIndex) => setRep(itemValue)}>
          {numbers.map((num) => (
            <Picker.Item label={num.toString()} value={num} key={num} />
          ))}
        </Picker>
      </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={styles.button}
        onPress={startHandler}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
}
const mapDispatchToProps = (dispatch) => ({
  setTimer: (timer) => dispatch(changeTimer(timer))
});

export default connect(null, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
    padding: 8,
    // justifyContent: 'center'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  paragraph: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  selection: {
    flexDirection: 'row',
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    // paddingLeft: '100',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#E1B4ED',
    padding: 10,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: 'black'
  },
  buttonText: {
    color:'white', 
    fontSize: 30
  }
});