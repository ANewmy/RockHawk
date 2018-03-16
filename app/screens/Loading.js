import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initPosition } from '../actions/location';

class Loading extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await navigator.geolocation.getCurrentPosition(
            position => {
                this.props.initPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                this.props.navigation.navigate('HomeScreen');
            },
            error => {
                console.log('there was an error getting location');
                this.props.navigation.navigate('HomeScreen');
            },
            { enableHighAccuracy: true }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/logo.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(236, 235, 243, .45)'
    },
    body: {
        flex: 9
    }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        initPosition: coords => dispatch(initPosition(coords))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
