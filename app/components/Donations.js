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
                        uri: 'http://rockhawk.org/donate/'
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
