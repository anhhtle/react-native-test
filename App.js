import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/dashboard/DashboardScreen';
import MmaScreen from './components/mma/MmaScreen';

const RootStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Dashboard: {screen: DashboardScreen},
    Mma: {screen: MmaScreen}
  },
  {
    initialRouteName: 'Mma',
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
