// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { defaults } from '../config/defaults';

class HotspotInfo extends Component {
    constructor(props) {
        super(props);

        var url = defaults.imageAPI + props.hotSpot.picture;

        this.state = {
            url: url,
        };
    }

    //Loads the donations page from rockhawk.org in a webview
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.close();
                        }}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Icon name="close" type="MaterialCommunityIcons" color="black" underlayColor="grey" size={32} />
                    </TouchableOpacity>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, fontFamily: 'Avenir-Heavy', color: 'black' }}>
                            {this.props.hotSpot.name}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.body}>
                    <View style={{ flex: 0.5 }} />

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Avenir-Roman', color: 'black' }}>
                            {this.props.hotSpot.hotspot_info}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5 }} />

                    <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.5 }} />
                        <View style={{ flex: 2 }}>
                            <Image style={{ height: 250, width: 250 }} source={{ uri: this.state.url }} />
                        </View>
                        <View style={{ flex: 4 }} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,.9)',
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 5,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
    },
    body: {
        flex: 9,
    },
});

export default HotspotInfo;
