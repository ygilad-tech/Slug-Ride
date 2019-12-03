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
import { db, firebaseApp } from './firebase';


// List of example rides to be displayed for testing.
// The data attribute of FlatList is what receives this list
const EXAMPLE_RIDES = [
    new RideEntryData("Bob Newbie", "6YAY616", "616 California St", "11:00", "4", false),
    new RideEntryData("First Last", "1ABC234", "999 Address St", "12:00", "2", false),
    new RideEntryData("Stoner Dude", "69NICE4", "Blaze It St", "4:20", "5", false),
]

export default class BrowseRides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rides: [],
        };
    }

    async getFireData (){
        const markers = [];
        await db.collection('RidesList').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    var d = doc.data();
                    
                    var inCar = d.inCar
                    var isInCar = false

                    if (inCar === undefined) {
                        console.warn("BrowseRides warning: 'inCar' variable is undefined, so adding riders to it may fail." +
                            "This might mean that the document in the database wasn't initialized with an inCar entry. Document ID: " + doc.id)
                    } else {
                        inCar.forEach(uid => {
                            if (uid === firebaseApp.auth().currentUser.uid)
                                isInCar = true
                        });
                    }

                    entry = new RideEntryData(doc.id, d.DriverName, d.plateNum, d.pickUpAddr, d.pickUpTime, d.seatsAv, isInCar);
                    //console.log(entry);
                    //https://stackoverflow.com/questions/51000169/how-to-check-a-certain-data-already-exists-in-firestore-or-not
                    //above link for making it check whether or not data exists already
                    if (!this.state.rides.some(r => r.DriverName == d.DriverName)) {
                        this.setState({
                            rides: [...this.state.rides, entry]
                        });
                    }
                    
                    //markers.concat(entry);
                    //console.log(markers.length);
                    });
            });

            return;
        }

    async userUpdatesRide(rideID) {
        // This function is called to update a user's status with regard to a specific ride.
        // It should be called when a user taps a ride, either to sign up or un-sign up for it.

        await db.collection('RidesList').doc(rideID).get()
            .then(doc => {
                if (!doc.exists) {
                    console.warn("Warning: no such document exists")
                } else {
                    var d = doc.data()
                    var inCar = d.inCar
                    var isInCar = false

                    if (inCar === undefined) {
                        console.warn("BrowseRides warning: 'inCar' variable is undefined, so adding riders to it may fail." +
                            "This might mean that the document in the database wasn't initialized with an inCar entry. Document ID: " + doc.id)
                    } else {
                        var index
                        inCar.forEach((userID, i) => { // should this await?
                            if (userID === firebaseApp.auth().currentUser.uid) {
                                isInCar = true
                                index = i
                            }
                        });

                        var newInCar = inCar
                        if (isInCar) {
                            var newInCar = inCar
                            newInCar.splice(index, 1)
                        } else {
                            var newInCar = inCar
                            newInCar.push(firebaseApp.auth().currentUser.uid)
                        }
                    
                        db.collection('RidesList').doc(rideID).update({
                            "inCar": newInCar
                        })
                    }                    
                }
            });


    }

    render() {
        var elems = [];
        this.getFireData();
        //console.log(elems[0]);

        const {navigate} = this.props.navigation;
        return (

            <View style={{padding: 10, flexDirection: 'column', flex: 1}}>
            
                <View style={{alignItems: 'center', padding: 10, justifyContent: 'center'}}>
                    <Text style={styles.title}>Available Rides</Text>
                </View>

                <View style={{justifyContent: 'center', flex: 6}}>
                    <FlatList
                        data={this.state.rides}
                        renderItem={({item}) => 
                            <RideEntry
                                rideID={item.rideID}
                                DriverName={item.DriverName}
                                plateNum={item.plateNum} 
                                pickUpAddr={item.pickUpAddr}  
                                pickUpTime={item.pickUpTime}
                                seatsAv={Number(item.seatsAv)}
                                initialCarState={item.isInCar} // this is subject to change
                                updateRideFunc={this.userUpdatesRide}
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
                        onPress={() => navigate('CreateRidePage')}
                    />
                    <Button
                        title="View Profile"
                        onPress={() =>navigate('ProfilePage')}
                    />
                    <Button
                        title="Create Profile!"
                        onPress={() =>navigate('CreateProfile')}
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
function RideEntryData(rideID, DriverName, plateNum, pickUpAddr, pickUpTime, seatsAv, isInCar) {
    this.rideID = rideID;
    this.DriverName = DriverName;
    this.plateNum = plateNum;
    this.pickUpAddr = pickUpAddr;
    this.pickUpTime = pickUpTime;
    this.seatsAv = seatsAv;
    this.isInCar = isInCar;
}


/*
 * Component for displaying a single ride entry. This is for displaying the
 * data, there is a separate struct called RideEntryData for storing
 * it and passing it around.
*/
class RideEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInCar: this.props.initialCarState,
        };
    }

    onPress = () => {
        // This occurs when a user taps a specific ride

        // TODO: Account for failure states. Also this whole structure sucks.
        this.props.updateRideFunc(this.props.rideID)

        var msg
        if (this.state.isInCar){
            msg = "You are no longer singed up for " + this.props.DriverName + "'s ride"
        } else{
            msg = "Signed up for " + this.props.DriverName + "'s ride"
        }

        this.setState((prevState) => ({
                isInCar: !prevState.isInCar,
            })
        );

        Alert.alert(msg)  
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.onPress} 
                style={[
                    styles.rideEntry,
                    this.state.isInCar ? {backgroundColor: '#0a93f5' } : {backgroundColor: '#9AD2FB'},
                ]}
                underlayColor={'#0a93f5'}
            >
                <View>
                    <Text>Driver Name: {this.props.DriverName}</Text>
                    <Text>License Plate: {this.props.plateNum}</Text>
                    <Text>Location: {this.props.pickUpAddr}</Text>
                    <Text>Pickup Time: {this.props.pickUpTime}</Text>
                    <Text>Seats Available: {this.props.seatsAv}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

/*
RideEntry.propTypes = {
    DriverName:     PropTypes.string,
    licensePlate:   PropTypes.string,
    location:       PropTypes.string,
    pickupTime:     PropTypes.string,
    seatsAv:        PropTypes.number,
}
*/

RideEntry.defaultProps = {
    DriverName:     "default name",
    plateNum:   "default license plate",
    pickUpAddr:       "default location",
    pickUpTime:     "default pickup time",
    seatsAv:     "0",
    initialCarState: false,
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        flex: 1,
    },
    
    rideEntry: {
        //backgroundColor: '#9AD2FB',
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
