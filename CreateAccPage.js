import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Alert,
} from 'react-native';

export default class CreateAccPage extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		email: '',
    		pass1: '',
    		pass2: '',
    	};
	}

    render() {
        return (

        	<View style={{padding: 10}}>
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
	            		onChangeText={(pass1) => this.setState({pass1})}
	          			value={this.state.pass1}
	            	/>

	            	<TextInput 
						style = {{height: 20, paddingVertical: 0}}
						underlineColorAndroid = "transparent"
	            		placeholder = "Enter your password again"
	            		onChangeText={(pass2) => this.setState({pass2})}
	          			value={this.state.pass2}
	            	/>

	            	<Button 
	            		title = "Create Account"
	            		onPress={() => Alert.alert('done')}
	            	/>
            </View>



            //<View style={{alignItems: 'center', top: 50}}>
            //    <Text>Create an account!</Text>
            //</View>
        );
    }
}