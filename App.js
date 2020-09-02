import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';

// You can import from local files
import store from './store';
import Route from './navigation/Route';

// or any pure javascript modules available in npm

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
