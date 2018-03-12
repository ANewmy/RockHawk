import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateUtils } from '../actions/utils';

class Loading extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('HomeScreen');
        }, 1000);
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
        updateUtils: utils => dispatch(updateUtils(utils))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
