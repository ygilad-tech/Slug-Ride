/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// TODO: Figure out how to center the buttons on the screen itself
class LoginPage extends Component {
  render() {
    return (
      <View>
        <View style={{alignItems: 'center', top: 50}}>
          <Text style={styles.titleText}> SlugRide! </Text>
        </View>
        <View style={{justifyContent: 'space-between', alignItems: 'center', top: 200}}> 
          <Button
            title="Create an Account"
            onPress={() => Alert.alert('Go to account creation screen!') }
          />
          <Text style={styles.baseText}> or </Text>
          <Button
            title="Login"
            onPress={() => Alert.alert('Go to the login screen!')}
          />
        </View>
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  Login: {screen: LoginPage},
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  baseText: {
    fontFamily: 'Cochin',
  },
});
