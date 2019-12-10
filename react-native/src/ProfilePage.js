import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";

import { firebaseApp } from './firebase';
import { db } from './firebase';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            driver: false,
            plates: '',
        };
    }

    async getUserData() {
        const user = firebaseApp.auth().currentUser;

        var profRef = db.collection('Profiles');

        let profDoc = profRef.where('usr', '==', user.uid).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    Alert.alert("no profile doc");
                    return;
                }
                snapshot.forEach(doc => {
                    var d = doc.data();
                    this.setState({
                        firstName: d.firstName,
                        lastName: d.lastName,
                        phoneNum: d.phoneNum,
                        email: d.email,
                        driver: d.driver,
                        plates: d.plates,
                    });
                });
            })
            .catch(function (error) {
                Alert.alert("error getting doc");
            });

        return;
    }
    /*
          var profRef =  db.collection('Profiles').doc(user.uid + "P");
    
          profRef.get().then(function(doc) {
            d = doc.data();
             if (doc.exists) {
                this.setState({
                   firstName : d.firstName,
                   lastName : d.lastName,
                   phoneNum : d.phoneNum,
                   email : d.email,
                   driver : d.driver,
                   plates : d.plates,   
                });
             }
             else{
                Alert.alert("no profile doc");
             }
          })
          .catch(function(error){
             Alert.alert("error getting doc");
          });
            return;
        }
    */

    render() {
        const { navigate } = this.props.navigation;
        this.getUserData();
        //const user = firebase.auth().currentUser;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', padding: 10 }}>
                    <Text style={styles.titleText}>Your Profile</Text>
                </View>
                <View style={styles.textInputStyle}>
                    <Text> Name: {this.state.firstName} {this.state.lastName} </Text>
                    <Text> Phone number: {this.state.phoneNum} </Text>
                    <Text> Email: {this.state.email}</Text>
                    <Text> Driver: {(this.state.driver ? 'Yes' : 'No')} </Text>
                    {this.state.driver ?
                        <Text> License plate number: {this.state.plates} </Text>
                        : null}
                </View>

                <View style={styles.bottom}>
                    <Button
                        onPress={() => navigate('BrowseRidesPage')}
                    >
                        <Text> Browse Rides </Text>
                    </Button>

                    <Button
                        onPress={() => navigate('CreateProfile')}
                    >
                        <Text> Edit Profile </Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
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



