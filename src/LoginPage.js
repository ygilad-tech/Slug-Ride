import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { Container, Item, Form, Input, Button, Label} from "native-base";
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAKQst4A-9FrvXDz2IPSnWyufX5iehZcoc",
  authDomain: "slugride-ff4c3.firebaseapp.com",
  databaseURL: "https://slugride-ff4c3.firebaseio.com",
  projectId: "slugride-ff4c3",
  storageBucket: "slugride-ff4c3.appspot.com",
  messagingSenderId: "481232900808",
  appId: "1:481232900808:web:dfcecda79bc9dc93598bfd",
  measurementId: "G-9C8ZTKRHX9"
};

firebase.initializeApp(config);


export default class LoginPage extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		email: '',
    		pass: '',
    	};
	}
  SignUp = (email, pass) => {
    if (!email.endsWith(".edu")){
      alert("use your .edu email!");
      return;
    }
    try {
      firebase.auth().createUserWithEmailAndPassword(email, pass);
      firebase.auth().onAuthStateChanged(user => {
         alert("Account Created!");
      })
   } catch (error) {
      console.log(error.toString(error));
    }
  };
  SignIn = (email, pass) => {
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then( user => { 
          const {navigate} = this.props.navigation;
          navigate('BrowseRidesPage')
        }).catch(error => {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password')
            alert('Incorrect password')
          else
            alert(errorMessage)
        });
      //firebase.auth().onAuthStateChanged(user => {
      //   alert("Hello " + user.email);
      //})
  };
	render() {
		return (
		  <Container style={styles.container}>
		    <Form>
		      <Item floatingLabel>
		        <Label>Email</Label>
		        <Input autoCapitalize="none" autoCorrect={false} 
		        onChangeText={(email) => this.setState({email})}/>
		      </Item>
		      <Item floatingLabel>
		        <Label>Password</Label>
		        <Input
		          secureTextEntry={true}
		          autoCapitalize="none"
		          autoCorrect={false}
		          onChangeText={(pass) => this.setState({pass})}
		        />
		      </Item>
		      <Button full rounded 
		      style={{ marginTop: 20 }}
		      onPress={() => {
            this.SignIn(this.state.email, this.state.pass)
          }}>
		        <Text>Sign In</Text>
		      </Button>
		      <Button full rounded 
		      style={{ marginTop: 20 }}
		      onPress={() => result = this.SignUp(this.state.email,
		      this.state.pass)}>
		        <Text>Sign Up</Text>
		      </Button>
		    </Form>
		  </Container>
		);
  	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center"
  }
});

