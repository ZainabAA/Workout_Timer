import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Text, Button, Dimensions, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {resetTimer} from '../store/actions/timerActions';

const screen = Dimensions.get('window')

const StartTimer = ({navigation, timer, reset}) => {

  const [remMin, setRemMin] = useState(timer.workMin);
  const [remSec, setRemSec] = useState(timer.workSec);

  const [isPaused, setIsPaused] = useState(0);

  const [currentStatus, setCurrentStatus] = useState('Pause');

  useEffect(()=>{
    let interval = null

    if(parseInt(remMin)===0 && parseInt(remSec)===0){
      clearInterval(interval);
      navigation.navigate('Rest');
    }

    if(!isPaused)
      interval = setInterval(cahnge, 1000);
    else
      clearInterval(interval);
    
    return () => clearInterval(interval)
  }, [remMin, remSec, isPaused]);

  const changeMin = () => {
    if(parseInt(remMin)>0){
      setRemMin(min => min-1);
    }
      
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
      // paused.current = false
      setCurrentStatus('Puase');
    }
    else {
      setIsPaused(1)
      // paused.current = true
      setCurrentStatus('Resume');
    }
  };

  const resetHandle = () => {
    reset({})
    navigation.goBack()
  };

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.go}>GO!</Text>
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
      
        {/* <Button color='#d1d1d1' style={styles.button} title={currentStatus} onPress={pause} />
        <Button color='#d1d1d1' style={styles.button} title='Reset' onPress={resetHandle} /> */}
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  reset: (timer) => dispatch(resetTimer(timer))
});

const mapStateToProps = (state) => ({timer: state.rootTimer.timer});

export default connect(mapStateToProps, mapDispatchToProps)(StartTimer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    // margin: 10,
    padding: 10,
    backgroundColor: '#00ff44'
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
})
