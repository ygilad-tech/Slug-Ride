import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { Container, Item, Form, Input, Button, Label} from "native-base";

import {firebaseApp } from './firebase';
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

    async getUserData(){
      const user = firebaseApp.auth().currentUser;
      var userID = user.uid + "";
        await db.collection('Profiles').get()
          .then(querySnapshot => {
              querySnapshot.docs.forEach(doc => {
                  d = doc.data();
                  var checkID = d.usr + "";

                  if (userID == checkID) {
                      this.setState({
                        firstName : d.firstName,
                        lastName : d.lastName,
                        phoneNum : d.phoneNum,
                        email : d.email,
                        driver : d.driver,
                        plates : d.plates,                        
                      });
                  }
              });
        })
        .catch(function(error){
          Alert.alert("yuval sucks");
        });
        return;
      /*
      const user = firebaseApp.auth().currentUser;
      if (user){
         var prof = db.collection('Profiles').where("email", "==", user.email)
            .get()
            .then(function(querySnapshot) {
               querySnapshot.forEach(function(doc) {
                  if (doc.exists){
                     d = doc.data();
                     this.state.firstName = d.firstName;
                     this.state.lastName = d.lastName;
                     this.state.phoneNum = d.phoneNum;
                     this.state.email = d.email;
                     this.state.driver = d.driver;
                     this.state.plates = d.plates;
                  }
                });
            })
            .catch(function(error) {
               Alert.alert('user profile not found');
            });
      }
      else{
         Alert.alert('user profile not found');
      }
      */
    }


   render() {
      const {navigate} = this.props.navigation;
      this.getUserData();
      //const user = firebase.auth().currentUser;

      return(
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', padding: 10}}>
            <Text style={styles.titleText}>Your Profile</Text>
          </View>
          <View style = {styles.textInputStyle}>
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
                title="Browse Rides"
                onPress={() => navigate('BrowseRides')}
              />
              <Button
                title="Edit profile"
                onPress={() => navigate('CreateProfile')}
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



