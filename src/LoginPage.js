import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase';

export default class LoginPage extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		email: '',
    		pass: '',
    	};
	}
 HEAD
	SignUp = (email, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
  };
  SignIn = (email, password) => {
    try {
      firebase.auth().signInUserWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged(user => {
         alert(user.email);
      })
    } catch (error) {
      console.log(error.toString(error));
    }
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
          onPress={() => this.SignIn(this.state.email,
          this.state.password)}>
            <Text>Sign In</Text>
          </Button>
          <Button full rounded 
          style={{ marginTop: 20 }}
          onPress={() => this.SignUp(this.state.email,
          this.state.password)}>
            <Text>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
    // render() {
    //     return (
    //         //<View style={{alignItems: 'center', top: 50}}>
    //         //    <Text>Enter your email and password below:</Text>
    //         //</View>
    //         <View style = {{padding: 10}}>
	   //          <TextInput 
				// 	style = {{height: 20, paddingVertical: 0}}
				// 	underlineColorAndroid = "transparent"
	   //         		placeholder = "Enter your UCSC email here"
	   //         		onChangeText={(email) => this.setState({email})}
	   //        		value={this.state.email}
	   //         	/>
	   //          <TextInput 
				// 	style = {{height: 20, paddingVertical: 0}}
				// 	underlineColorAndroid = "transparent"
	   //         		placeholder = "Enter your password here"
	   //         		onChangeText={(pass) => this.setState({pass})}
	   //        		value={this.state.pass}
	   //         	/>
	   //         	<Button 
	   //          	title = "Done!"
	   //          	onPress={() => Alert.alert('done')}
	   //          />
	   //      </View>

    render() {
		const {navigate} = this.props.navigation; /* Allows navigation to other screens */
        return (
            //<View style={{alignItems: 'center', top: 50}}>
            //    <Text>Enter your email and password below:</Text>
            //</View>
            <View style = {{padding: 10}}>
	            <TextInput 
					style = {{height: 20, paddingVertical: 0}}
					underlineColorAndroid = "transparent"
	           		placeholder = "Enter your UCSC email here"
	           		onChangeText={(email) => this.setState({email})}
	          		value={this.state.email}
	           	/>
	            <TextInput 
					style = {{height: 20, paddingVertical: 0}}
					underlineColorAndroid = "transparent"
	           		placeholder = "Enter your password here"
	           		onChangeText={(pass) => this.setState({pass})}
	          		value={this.state.pass}
	           	/>
	           	<Button 
	            	title = "Done!"
	            	onPress={() => navigate('BrowseRidesPage')}
	            />
	        </View>
 ec660b3dd476189230af54ffe6734fb9947e746d
	            
            
    //         ///	<Text style={{padding: 10, fontSize: 42}}>
    //       	//	{this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
    //     	//	</Text>

            
 HEAD
    //     );
    // }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center"
  }
});

        );
    }
}
 ec660b3dd476189230af54ffe6734fb9947e746d
