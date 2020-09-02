import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, Button, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {connect} from 'react-redux';
import {resetTimer, changeTimer} from '../store/actions/timerActions';

const screen = Dimensions.get('window');

const RestTimer = ({navigation, timer, reset, decreaseRep}) => {

  const [remMin, setRemMin] = useState(timer.restMin);
  const [remSec, setRemSec] = useState(timer.restSec);

  const [isPaused, setIsPaused] = useState(0);
  
  const [currentStatus, setCurrentStatus] = useState('Pause');

  useEffect(()=>{
    if(parseInt(remMin)===0 && parseInt(remSec)===0){
      clearInterval(interval);
      if(parseInt(timer.rep)>1){
        const newTimer = {
          workMin: timer.workMin,
          workSec: timer.workSec,
          restMin: timer.restMin,
          restSec: timer.restSec,
          rep: timer.rep-1
        };
        decreaseRep(newTimer);
        navigation.navigate('Start');
      }
      else{
        Alert.alert(
          'CONGRATS!',
          'You finished your workout',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );

        navigation.navigate('Home');
      }
    }

    let interval = null;
    if(!isPaused)
      interval = setInterval(cahnge, 1000);
    else
      clearInterval(interval);
    
    return () => clearInterval(interval);
  }, [remMin, remSec, isPaused]);

  const changeMin = () => {
    if(parseInt(remMin)>0)
      setRemMin(min => min-1);
  }

  const cahnge = () => {
    if(parseInt(remSec)===0 && parseInt(remMin)===0)
      return;
    else if (parseInt(remSec)===0){
      setRemSec(59);
      changeMin();
    }
    else
      setRemSec(sec => sec-1);
  }

  const pause = () => {
    if(isPaused){
      setIsPaused(0);
      setCurrentStatus('Puase');
    }
    else {
      setIsPaused(1);
      setCurrentStatus('Resume');
    }
  }

  const resetHandle = () => {
    reset({});
    navigation.navigate('Home');
  };

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.go}>REST</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.time}>{remMin} : {remSec}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={styles.button}
        onPress={pause}>
          <Text style={styles.buttonText}>{currentStatus}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button}
        onPress={resetHandle}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  reset: (timer) => dispatch(resetTimer(timer)),
  decreaseRep: (timer) => dispatch(changeTimer(timer))
});

const mapStateToProps = (state) => ({timer: state.rootTimer.timer});

export default connect(mapStateToProps, mapDispatchToProps)(RestTimer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    padding: 10,
    backgroundColor: '#C6F5F5'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  go: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'white'
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 90,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  buttonText: {
    color:'white', 
    fontSize: 30
  }
});
