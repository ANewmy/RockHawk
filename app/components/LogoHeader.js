// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';

class LogoHeader extends Component {
    constructor(props) {
        super(props);
    }

    //Simple component for the logo in the header
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image style={{ height: 90, width: 90 }} resizeMode="contain" source={require('../img/logo.png')} />
                </View>
                <View style={styles.otherView}>
                    <Text>Outdoor Classroom</Text>
                    <Text>25 miles & 12,000 years</Text>
                    <Text>of nature & history</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    logoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(216, 215, 223, 1)'
    },
    otherView: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: 'rgba(216, 215, 223, 1)'
    }
});

export default LogoHeader;
