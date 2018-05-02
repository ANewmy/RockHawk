import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ListView, TouchableOpacity } from 'react-native';
import { defaults } from '../config/defaults';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import { initPosition, getLocationData } from '../actions/location';

class Contact extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
        });
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            ds: defaults.ds,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    renderRow(data) {
        return (
            <View style={styles.row}>
                <Text style={styles.contactTitleText}>{data.title}</Text>
                <Text style={styles.contactSubText}>{data.website}</Text>
                <Text style={styles.contactSubText}>{data.phone}</Text>
                <Text style={styles.contactSubText}>{data.address}</Text>
                <Text style={styles.contactSubLastText}>{data.email}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tool}>
                    <View style={styles.containerToolBar}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                            style={styles.leftView}
                        >
                            <Icon
                                name="chevron-left"
                                type="MaterialCommunityIcons"
                                color="white"
                                underlayColor="grey"
                                size={32}
                            />
                        </TouchableOpacity>
                        <View style={styles.middleView}>
                            <Text style={styles.titleText}>Contact Us</Text>
                        </View>
                        <View style={styles.rightView} />
                    </View>
                </View>
                <View style={{ flex: 9.2 }}>
                    <View style={styles.contactView}>
                        <View style={styles.titleTextView}>
                            <Text style={styles.titleTextContact}>Contact Us</Text>
                        </View>

                        <View style={styles.contactContentView}>
                            <ListView
                                style={styles.container}
                                dataSource={this.state.dataSource}
                                renderRow={data => this.renderRow(data)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
    },
    tool: {
        flex: 0.8,
    },
    containerToolBar: {
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
    contactView: {
        margin: 15,
        flex: 4,
        backgroundColor: 'rgba(255,255,255,.7)',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
    },
    titleTextContact: {
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'Avenir-Heavy',
        color: 'black',
    },
    contactContentView: {
        flex: 1,
    },
    row: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey',
    },
    contactTitleText: {
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
        fontFamily: 'Avenir-Heavy',
        color: 'darkblue',
    },
    contactSubText: {
        marginLeft: 25,
        fontSize: 12,
        marginBottom: 2,
        fontFamily: 'Avenir-Roman',
        color: 'black',
    },
    contactSubLastText: {
        marginLeft: 25,
        fontSize: 12,
        marginBottom: 2,
        fontFamily: 'Avenir-Roman',
        color: 'black',
    },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        initPosition: coords => dispatch(initPosition(coords)),
        getLocationData: () => dispatch(getLocationData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
