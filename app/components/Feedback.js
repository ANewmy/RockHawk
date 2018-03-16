// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class Feedback extends Component {
    constructor(props) {
        super(props);
    }

    submit() {
        console.log('Submit clicked.. fetching data');

        fetch('http://127.0.0.1:8086/listUsers')
            .then(response => {
                if (response.status != 200) {
                    console.log('resposnse: ', response);
                }
                return response.json();
            })
            .then(responseJson => {
                console.log('responseJSON: ', responseJson);
                console.log('His name is: ', responseJson.name);
                console.log('his password is: ', responseJson.password);
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.submit()} style={styles.submit}>
                    <Text style={styles.submitText}>Submit</Text>
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
        justifyContent: 'center'
    },
    submit: {
        //flex: 1,
        height: 60,
        width: 150,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
    },
    submitText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Avenir-Heavy'
    }
});

export default Feedback;
