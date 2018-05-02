import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import MapHelp from '../components/MapHelp';

import { initPosition, getLocationData } from '../actions/location';

class Help extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            showInfo: '',
            tabInfo: '',
        };
    }

    setTabInfo(tab) {
        this.setState({ tabInfo: tab });
    }

    renderTabInfo() {
        switch (this.state.tabInfo) {
            case 'hotspots':
                return (
                    <Text style={styles.tabInfoText}>
                        The Hotspots tab is used to display the hotspots located around the park. Hotspots are areas of
                        interest that when you are within a certain distance, an alert will pop up and when clicked will
                        show you the information on what is around you.
                    </Text>
                );
                break;

            case 'activities':
                return (
                    <Text style={styles.tabInfoText}>
                        When the Activities tab is clicked, activities around the park will pop up on the map.
                        Activities can include things like archery ranges, or fun beaches. You can use this tab to see
                        how far you are located from certain activity locations, and also be able to see all of the
                        activities the park has to offer.
                    </Text>
                );
                break;

            case 'facilities':
                return (
                    <Text style={styles.tabInfoText}>
                        Select this tab when you want to see the facilities that are located around the park. A facility
                        can range from restrooms, park information locations, or rest stops.
                    </Text>
                );
                break;

            case 'trails':
                return (
                    <Text style={styles.tabInfoText}>
                        The trails tab will show all of the trails that the park has to offer. The color of the trail
                        indicates the length of a trail, shown by this ledger: ..
                    </Text>
                );
                break;

            default:
                break;
        }
    }

    renderHelp() {
        switch (this.state.showInfo) {
            case 'map':
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Avenir-Heavy' }}>This is the Map tab</Text>
                            <Text style={{ fontSize: 14, marginTop: 10, fontFamily: 'Avenir-Roman' }}>
                                Select a tab for more info
                            </Text>
                        </View>
                        <MapHelp setTabInfo={this.setTabInfo.bind(this)} />
                        <View style={{ flex: 3 }}>{this.renderTabInfo()}</View>
                    </View>
                );
                break;

            case 'feedback':
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Avenir-Heavy' }}>This is the Feedback tab</Text>
                            <Text style={{ fontSize: 14, marginTop: 10, margin: 10, fontFamily: 'Avenir-Roman' }}>
                                The feedback tab is used so that we can provide a better way for guests to let us know
                                how we are doing. Please feel free to share information on anything you feel could be
                                done better around the park, or to let the staff know of any issues you see around the
                                park. The only required field is the comments section, so if you would prefer to remain
                                anonymous you may leave the other fields blank.
                            </Text>
                        </View>
                    </View>
                );
                break;
            case 'home':
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Avenir-Heavy' }}>This is the Home tab</Text>
                            <Text style={{ fontSize: 14, marginTop: 10, margin: 10, fontFamily: 'Avenir-Roman' }}>
                                The Home tab contains basic information about the effigy site, Rock Hawk. You can click
                                the learn more tab that appears to navigate to our website to learn more information.
                            </Text>
                        </View>
                    </View>
                );
                break;
            default:
                break;
        }
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
                            <Text style={styles.titleText}>Help</Text>
                        </View>
                        <View style={styles.rightView} />
                    </View>
                </View>

                <View style={{ flex: 9.2 }}>
                    <Text style={{ padding: 10, fontSize: 16, fontFamily: 'Avenir-Heavy', color: 'blue' }}>
                        Select a tab to learn more information
                    </Text>
                    <View style={styles.tabNav}>
                        <View style={styles.container1}>
                            <View style={styles.header}>
                                <View style={styles.homeView}>
                                    <TouchableOpacity
                                        style={styles.buttonFormat}
                                        onPress={() => {
                                            this.setState({ showInfo: 'home' });
                                        }}
                                    >
                                        <Text style={styles.homeText}>Home</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mapView}>
                                    <TouchableOpacity
                                        style={styles.buttonFormat}
                                        onPress={() => {
                                            this.setState({ showInfo: 'map' });
                                        }}
                                    >
                                        <Text style={styles.mapText}>Map</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.feedbackView}>
                                    <TouchableOpacity
                                        style={styles.buttonFormat}
                                        onPress={() => {
                                            this.setState({ showInfo: 'feedback' });
                                        }}
                                    >
                                        <Text style={styles.mapText}>Feedback</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.donationsView}>
                                    <TouchableOpacity
                                        style={styles.buttonFormat}
                                        onPress={() => {
                                            this.setState({ showInfo: 'donations' });
                                        }}
                                    >
                                        <Text style={styles.mapText}>Donations</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.screenView}>{this.renderHelp()}</View>
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
    tabInfoText: {
        padding: 10,
        fontSize: 16,
        fontFamily: 'Avenir-Roman',
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
    tabNav: {
        flex: 0.7,
        padding: 5,
    },
    screenView: {
        flex: 7,
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
    //TabNav styles
    container1: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonFormat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(90, 133, 101,1)',
    },
    buttonFormatClicked: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 97, 73,1)',
    },
    homeView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    homeText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
    mapView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    mapText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
    feedbackView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    feedbackText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
    donationsView: {
        flex: 1,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
    },
    donationsText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white',
    },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        initPosition: coords => dispatch(initPosition(coords)),
        getLocationData: () => dispatch(getLocationData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Help);
