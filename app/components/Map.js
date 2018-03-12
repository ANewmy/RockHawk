// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    key={0}
                    resizeMode={'contain'}
                    style={{
                        height: 500,
                        width: 500
                    }}
                    source={require('../img/map.jpg')}
                />
                <View key={1} style={{ height: 225 }}>
                    <Text>Footer</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(236, 235, 243, 1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Map;
