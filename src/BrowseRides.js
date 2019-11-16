import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableHighlight,
    Alert,
    Button,
} from 'react-native';

import PropTypes from 'prop-types'


// List of example rides to be displayed for testing.
// The data attribute of FlatList is what receives this list
const EXAMPLE_RIDES = [
    new RideEntryData("Bob Newbie", "6YAY616", "616 California St", "11:00"),
    new RideEntryData("First Last", "1ABC234", "999 Address St", "12:00"),
    new RideEntryData("Stoner Dude", "69NICE4", "Blaze It St", "4:20"),
]

export default class BrowseRides extends Component {

    render() {
        return (
            
            <View style={{padding: 10, flexDirection: 'column', flex: 1}}>
            
                <View style={{alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                    <Text style={styles.title}>Available Rides</Text>
                </View>

                <View style={{justifyContent: 'center', flex: 6}}>
                    <FlatList
                        data={EXAMPLE_RIDES}
                        renderItem={({item}) => 
                            <RideEntry
                                name={item.name}
                                licensePlate={item.licensePlate} 
                                location={item.location}  
                                pickupTime={item.pickupTime} 
                            /> }
                        keyExtractor={(item, index) => index.toString()} // Temporary sloppy fix using the index as a key
                        ListEmptyComponent={
                            <Text style={{alignItems: 'center', justifyContent: 'center', padding: 10, fontSize: 15}} >No Rides Available</Text>
                        }
                    />
                </View>

                <View style={styles.bottom}>
                    <Button
                        title="Create Ride"
                        onPress={() => Alert.alert("Go to ride creation page!")}
                    />
                </View>

            </View>
        );
    }
}

/* 
 * Struct to hold info about a specific ride entry. This info is later
 * passed to a RideEntry component to be displayed in the list. We'll 
 * probably get this info from the database, I imagine.
*/
function RideEntryData(name, licensePlate, location, pickupTime) {
    this.name = name;
    this.licensePlate = licensePlate;
    this.location = location;
    this.pickupTime = pickupTime;
}


/*
 * Component for displaying a single ride entry. This is for displaying the
 * data, there is a separate struct called RideEntryData for storing
 * it and passing it around.
*/
class RideEntry extends Component {

    onPress = () => {
        // This occurs when a user taps a specific ride
        var msg = "Signed up for " + this.props.name + "'s ride"
        Alert.alert(msg)  
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.onPress} 
                style={styles.rideEntry}
                underlayColor={'#0a93f5'}
            >
                <View>
                    <Text>Driver Name: {this.props.name}</Text>
                    <Text>License Plate: {this.props.licensePlate}</Text>
                    <Text>Location: {this.props.location}</Text>
                    <Text>Pickup Time: {this.props.pickupTime}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

RideEntry.propTypes = {
    name:           PropTypes.string,
    licensePlate:   PropTypes.string,
    location:       PropTypes.string,
    pickupTime:     PropTypes.string,
}

RideEntry.defaultProps = {
    name:           "default name",
    licensePlate:   "default license plate",
    location:       "default location",
    pickupTime:     "default pickup time",
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        flex: 1,
    },
    
    rideEntry: {
        backgroundColor: '#9AD2FB',
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10,
    },

    title: {
        fontSize: 32,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    }, 
});

