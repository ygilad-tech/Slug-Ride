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

import LoginPage from './LoginPage';

// TODO: Figure out how to center the buttons on the screen itself
class FirstPage extends Component {
  render() {
    const {navigate} = this.props.navigation;
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
            onPress={() => navigate('LoginPage')}
          />
        </View>
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  FirstPage: {screen: FirstPage},
  LoginPage: {screen: LoginPage},
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
