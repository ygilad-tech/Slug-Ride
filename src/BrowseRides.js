import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types'

export default class BrowseRides extends Component {

    render() {
        return (
            <View style={{padding: 10}}>
                <RideEntry />
            </View>
        );
    }
}

class RideEntry extends Component {

    render() {
        return (
            <View style={styles.container}>
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
    }
});

