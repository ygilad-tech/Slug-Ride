import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import { NavigationEvents } from 'react-navigation';

import {firebaseApp } from './firebase'

import {db } from './firebase'


export default class CreateProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            driver: false,
            plates: '',
            usr: ''
        };
    }

    render() {
        const {navigate} = this.props.navigation
        const user_ = firebaseApp.auth().currentUser;
        if (user_){
            this.state.usr = user_.uid;
        }
        //this.state.user = user_;
        return (
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={styles.titleText}>Create your profile!</Text>
                </View>

                <View style={{top: 0, marginHorizontal: 30, marginVertical: 10}}>
                    <View>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "First name"
                            onChangeText={(firstName) =>  this.setState({firstName})}
                            value = {this.state.firstName}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Last name"
                            onChangeText={(lastName) =>  this.setState({lastName})}
                            value = {this.state.lastName}
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Phone number"
                            onChangeText={(phoneNum) =>  this.setState({phoneNum})}
                            value = {this.state.phoneNum}
                        />
                    </View>

                    <View>
                        <TextInput 
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Email"
                            onChangeText={(email) =>  this.setState({email})}
                            value = {this.state.email}
                        />
                    </View>

                    <View>
                        <CheckBox
                            //style={{flex: 1, padding: 10}}
                            center
                            title= 'Are you a driver?'
                            onClick={() => {
                                this.setState({
                                    isChecked: !this.state.isChecked,
                                    driver: !this.state.isChecked
                                })
                            }}
                            isChecked = {this.state.isChecked}
                            driver = {this.state.driver}
                            leftText={"Driver?"}
                        />
                    </View>
                    {this.state.driver ? 
                    <View>
                        <TextInput 
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Plates"
                            onChangeText={(plates) =>  this.setState({plates})}
                            value = {this.state.plates}
                        />
                    </View>
                    : null}
                </View>

                <View style={styles.bottom}>
                    <Button
                        title="Finish Profile"
                        onPress={() => {
                                db.collection('Profiles').doc().set({
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName,
                                    phoneNum: this.state.phoneNum,
                                    email: this.state.email,
                                    driver: this.state.driver,
                                    plates: this.state.plates,
                                    usr: this.state.usr
                                })
                                .then(() =>{
                                    navigate('ProfilePage')
                                    Alert.alert('Profile set!')
                                })
                            }
                        }
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
      },

    textBoxTitle: {
        fontSize: 20,
        alignItems: 'center',
    },

    textInputStyle: {
        backgroundColor: '#9AD2FB',
        marginVertical: 4,
        borderRadius: 10,
        fontSize: 16,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        padding: 10,
    }, 
});
