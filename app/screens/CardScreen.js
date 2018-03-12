import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GenericHeader from '../components/GenericHeader';

class CardScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <GenericHeader navigation={this.props.navigation} />
                <View style={{ flex: 9 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(25,82,116,1)'
    },
    body: {
        flex: 9
    }
});

const mapStateToProps = state => ({
    utils: state.utils.utils
});

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen);
