import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';

export default class LoginPage extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', top: 50}}>
                <Text>Enter your username and password below:</Text>
            </View>
        );
    }
}