import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {NativeBaseProvider, ToastProvider} from 'native-base';

const App = () => {
  return (
    <>
      {/* <PaperProvider> */}
      <NativeBaseProvider>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </NativeBaseProvider>

      {/* </PaperProvider> */}
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
