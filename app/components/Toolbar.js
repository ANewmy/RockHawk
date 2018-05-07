// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    nav() {
        //Navigate to the help screen when the help button is clicked
        this.props.navigation.navigate('Help');
    }

    //Displays the toolbar at the top of the screen
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Help');
                    }}
                    style={styles.leftView}
                >
                    <Text style={styles.leftText}>Help</Text>
                </TouchableOpacity>
                <View style={styles.middleView}>
                    <Text style={styles.titleText}>Rock Hawk</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Contact');
                    }}
                    style={styles.rightView}
                >
                    <Icon name="md-contact" color="white" size={20} type="ionicon" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 122, 34,1)',
    },
    leftView: {
        flex: 1,
        marginTop: 10,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
    middleView: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightView: {
        flex: 1,
        marginTop: 10,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Avenir-Heavy',
    },
});

export default Toolbar;
