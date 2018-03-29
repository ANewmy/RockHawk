// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, WebView } from 'react-native';

class Donations extends Component {
    constructor(props) {
        super(props);
    }

    //Loads the donations page from rockhawk.org in a webview
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
    }
});

export default Donations;
