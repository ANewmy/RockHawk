// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    //Navigates to the rockhawk homepage
    click() {
        Linking.openURL('http://rockhawk.org/')
            .then(url => {})
            .catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <ImageBackground source={require('../img/homeBackground.jpg')} style={styles.backgroundImage}>
                <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 10,
                        }}
                    >
                        <Text style={styles.titleText}>Welcome To Rock Hawk</Text>
                        <Text style={styles.text}>
                            The outdoor classroom that has hundreds of educational displays along the 25 miles of trails
                            that surround and lead to the ancient effigy.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <TouchableOpacity
                    onPress={() => this.click()}
                    style={{
                        alignItems: 'center',
                        margin: 7,
                        borderRadius: 7,
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: 'lightgrey',
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Avenir-Heavy', color: 'darkblue' }}>
                            See more info on our website
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon
                            name="chevron-right"
                            type="MaterialIcons"
                            color="darkblue"
                            underlayColor="grey"
                            size={35}
                        />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null, // or 'stretch'
    },
    listView: {
        flex: 1,
        flexDirection: 'column',
    },
    container1: {
        flex: 1,
        backgroundColor: '#f4f7f9',
        paddingTop: 30,
    },
    bodyView: {
        flex: 9,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
    },
    bodyText: {
        flex: 1,
        fontSize: 14,
        margin: 5,
        padding: 3,
        color: 'black',
        fontFamily: 'Avenir-light',
    },
    leftView: {
        flex: 1,
        marginTop: 15,
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
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
    titleText: {
        fontSize: 24,
        color: 'yellow',
        fontFamily: 'Avenir-Heavy',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        //    flex: 1,
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 18,
        color: 'yellow',
        fontFamily: 'Avenir-Heavy',
        backgroundColor: 'transparent',
        paddingTop: 10,
        textAlign: 'center',
    },
    row: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey',
    },
});

export default Home;
