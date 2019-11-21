import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    Alert,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {db } from './firebase';


// TODO: Add hooks for actually sending the data to firebase
// TODO: Install and add a time-picker so you don't have to do it with a keyboard

export default class CreateRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DriverName: '',
            puAddy: '',
            puTime: '',
            numSeats: '',
        };
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={styles.titleText}>Create a ride</Text>
                </View>

                <View style={{top: 0, marginHorizontal: 30, marginVertical: 10}}>
                    <View>
                        <Text style={styles.textBoxTitle}>Your name</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter name Here"
                            onChangeText={(DriverName) =>  this.setState({DriverName})}
                            value = {this.state.DriverName}
                        />
                    </View>
                    <View>
                        <Text style={styles.textBoxTitle}>Location</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter Address of Pick-up Here"
                            onChangeText={(puAddy) =>  this.setState({puAddy})}
                            value = {this.state.puAddy}
                        />
                    </View>

                    <View>
                        <Text style={styles.textBoxTitle}>Time</Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter Pick-up Time Here"
                            onChangeText={(puTime) =>  this.setState({puTime})}
                            value = {this.state.puTime}
                        />
                    </View>

                    <View>
                        <Text style={styles.textBoxTitle}>Seats Available</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter Available Seats"
                            keyboardType = 'numeric'
                            onChangeText={(numSeats) =>  this.setState({numSeats})}
                            value = {this.state.numSeats}
                        />
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Button
                        title="Create Ride"
                        onPress={() => {
                                db.collection('RidesList').doc("pls").set({
                                    pickUpAddr: this.state.puAddy,
                                    pickUpTime: this.state.puTime,
                                    seatsAv: this.state.numSeats,
                                    DriverName: this.state.DriverName
                                })
                                .then(() =>{
                                    navigate('BrowseRidesPage')
                                    Alert.alert('Ride has been created')
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
