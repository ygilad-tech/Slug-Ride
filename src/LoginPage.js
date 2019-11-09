import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Alert,
} from 'react-native';

export default class LoginPage extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		email: '',
    		pass: '',
    	};
	}
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
	            
            
            ///	<Text style={{padding: 10, fontSize: 42}}>
          	//	{this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        	//	</Text>

            
        );
    }
}
