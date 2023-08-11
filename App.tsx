import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <>
      {/* <PaperProvider> */}
      <AppNavigator />
      {/* </PaperProvider> */}
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
