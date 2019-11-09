import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
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
            
            <View style={{padding: 10}}>
                <View style={{alignItems: 'center', padding: 10}}>
                    <Text style={styles.title}>Available Rides</Text>
                </View>

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
                />
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

    render() {
        return (
            <View style={styles.rideEntry}>
                <Text>Driver Name: {this.props.name}</Text>
                <Text>License Plate: {this.props.licensePlate}</Text>
                <Text>Location: {this.props.location}</Text>
                <Text>Pickup Time: {this.props.pickupTime}</Text>
            </View>
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
        borderColor: '#d6d7da'
    },
    
    rideEntry: {
        backgroundColor: '#9AD2FB',
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 32,
    },
});

