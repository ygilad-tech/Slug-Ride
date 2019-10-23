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

// TODO: Figure out how to center the buttons on the screen itself
export default class LoginPage extends Component {
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

const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  baseText: {
    fontFamily: 'Cochin',
  },
});
