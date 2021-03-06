// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class TabNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.homeView}>
                        {this.props.currentTab == 'Home' ? (
                            <TouchableOpacity
                                style={styles.buttonFormatClicked}
                                onPress={() => {
                                    this.props.tabClicked('Home');
                                }}
                            >
                                <Text style={styles.homeText}>Home</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.buttonFormat}
                                onPress={() => {
                                    this.props.tabClicked('Home');
                                }}
                            >
                                <Text style={styles.homeText}>Home</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.mapView}>
                        {this.props.currentTab == 'Map' ? (
                            <TouchableOpacity
                                style={styles.buttonFormatClicked}
                                onPress={() => {
                                    this.props.tabClicked('Map');
                                }}
                            >
                                <Text style={styles.homeText}>Map</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.buttonFormat}
                                onPress={() => {
                                    this.props.tabClicked('Map');
                                }}
                            >
                                <Text style={styles.mapText}>Map</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.feedbackView}>
                        {this.props.currentTab == 'Feedback' ? (
                            <TouchableOpacity
                                style={styles.buttonFormatClicked}
                                onPress={() => {
                                    this.props.tabClicked('Feedback');
                                }}
                            >
                                <Text style={styles.homeText}>Feedback</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.buttonFormat}
                                onPress={() => {
                                    this.props.tabClicked('Feedback');
                                }}
                            >
                                <Text style={styles.mapText}>Feedback</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.donationsView}>
                        {this.props.currentTab == 'Donations' ? (
                            <TouchableOpacity
                                style={styles.buttonFormatClicked}
                                onPress={() => {
                                    this.props.tabClicked('Donations');
                                }}
                            >
                                <Text style={styles.homeText}>Donations</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.buttonFormat}
                                onPress={() => {
                                    this.props.tabClicked('Donations');
                                }}
                            >
                                <Text style={styles.mapText}>Donations</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonFormat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(90, 133, 101,1)'
    },
    buttonFormatClicked: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 97, 73,1)'
    },
    homeView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0
    },
    homeText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    mapView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    mapText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    feedbackView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    feedbackText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    donationsView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0
    },
    donationsText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    }
});

export default TabNavigator;
