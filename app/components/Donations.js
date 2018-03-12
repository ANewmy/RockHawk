// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, WebView } from 'react-native';

class Donations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{
                        uri:
                            'https://www.paypal.com/donate/?token=LNuc-ILC62c6IQipYsHcX5o6oRv54CVwMnD7edk5q0jAS15XInjYh0FjN51cuC5bABkxGW&country.x=US&locale.x=US&Z3JncnB0='
                    }}
                    style={{ height: 800 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    leftView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    middleView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Avenir-Heavy'
    }
});

export default Donations;
