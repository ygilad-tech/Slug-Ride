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

// TODO: Add hooks for actually sending the data to firebase
// TODO: Install and add a time-picker so you don't have to do it with a keyboard

export default class CreateRide extends Component {

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={styles.titleText}>Create a ride</Text>
                </View>

                <View style={{top: 0, marginHorizontal: 30, marginVertical: 10}}>
                    <View>
                        <Text style={styles.textBoxTitle}>Location</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter Address of Pick-up Here"
                        />
                    </View>

                    <View>
                        <Text style={styles.textBoxTitle}>Time</Text>
                        <TextInput 
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter Pick-up Time Here"
                        />
                    </View>

                    <View>
                        <Text style={styles.textBoxTitle}>Seats Available</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            underlineColorAndroid = "transparent"
                            placeholder = "Enter Available Seats"
                            keyboardType = 'numeric'
                        />
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Button
                        title="Create Ride"
                        onPress={() => {
                                navigate('BrowseRidesPage')
                                Alert.alert('Ride has been created')
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
