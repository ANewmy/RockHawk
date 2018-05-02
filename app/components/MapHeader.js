// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import HotspotInfo from '../components/HotspotInfo';

import { hotSpotClicked, trailsClicked, activitiesClicked, facilitiesClicked } from '../actions/location';

class MapHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            infoView: false,
        };
    }

    renderHotSpot() {
        if (this.props.hotSpotClicked) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(hotSpotClicked(false))}
                    style={styles.hotSpotClicked}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon name="flag" type="MaterialCommunityIcons" color="black" underlayColor="grey" size={22} />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Hotspots</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(hotSpotClicked(true))}
                    style={styles.hotSpots}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon name="flag" type="MaterialCommunityIcons" color="black" underlayColor="grey" size={22} />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Hotspots</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    renderTrails() {
        if (this.props.trailsClicked) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(trailsClicked(false))}
                    style={styles.trailsClicked}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon
                            name="directions"
                            type="MaterialCommunityIcons"
                            color="black"
                            underlayColor="grey"
                            size={22}
                        />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Trails</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(trailsClicked(true))}
                    style={styles.trails}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon
                            name="directions"
                            type="MaterialCommunityIcons"
                            color="black"
                            underlayColor="grey"
                            size={22}
                        />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Trails</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    renderActivities() {
        if (this.props.activitiesClicked) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(activitiesClicked(false))}
                    style={styles.trailsClicked}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon
                            name="directions-run"
                            type="MaterialCommunityIcons"
                            color="black"
                            underlayColor="grey"
                            size={22}
                        />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Activities</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(activitiesClicked(true))}
                    style={styles.trails}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon
                            name="directions-run"
                            type="MaterialCommunityIcons"
                            color="black"
                            underlayColor="grey"
                            size={22}
                        />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Activities</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    renderFacilities() {
        if (this.props.facilitiesClicked) {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(facilitiesClicked(false))}
                    style={styles.trailsClicked}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon name="place" type="MaterialIcons" color="black" underlayColor="grey" size={22} />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Facilities</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.dispatch(facilitiesClicked(true))}
                    style={styles.trails}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon name="place" type="MaterialIcons" color="black" underlayColor="grey" size={22} />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Facilities</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    renderCurrentHotSpot() {
        if (this.props.currentHotSpot != null) {
            return (
                <TouchableOpacity onPress={() => this.setState({ infoView: true })} style={styles.currentHotSpot}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Icon name="priority-high" type="MaterialIcons" color="black" underlayColor="grey" size={22} />
                    </View>
                    <View style={styles.controlTextView}>
                        <Text style={styles.optionText}>Info</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    renderInfoView() {
        if (this.state.infoView) {
            return <HotspotInfo close={this.closeCallback.bind(this)} hotSpot={this.props.currentHotSpot} />;
        }
    }

    closeCallback() {
        this.setState({ infoView: false });
    }

    //Renders the map toolbar when user clicks a button
    render() {
        return (
            <View style={styles.container}>
                {this.renderInfoView()}
                <View style={styles.middlePanel}>
                    {this.renderFacilities()}
                    {this.renderActivities()}
                    {this.renderTrails()}
                    {this.renderHotSpot()}
                    {this.renderCurrentHotSpot()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    rightPanel: {
        flex: 1,
        margin: 10,
        marginLeft: 5,
        marginRight: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    upIcon: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
    },
    optionText: {
        flex: 1,
        fontFamily: 'Avenir-light',
        color: 'black',
        fontSize: 10,
        alignSelf: 'flex-end',
    },
    downIcon: {
        flex: 1,
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middlePanel: {
        flex: 6,
        margin: 10,
        flexDirection: 'row',
        marginLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    middlePanelInfo: {
        flex: 6,
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        //    backgroundColor: 'grey'
    },
    hotSpots: {
        flex: 1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    hotSpotClicked: {
        flex: 1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    trails: {
        flex: 1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    infoBack: {
        flex: 1,
        margin: 5,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hotSpots1: {
        flex: 1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    trailsClicked: {
        flex: 1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    currentHotSpot: {
        flex: 1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        backgroundColor: 'red',
        borderRadius: 5,
    },
    controlTextView: { flex: 1, marginTop: 10 },
});

export default MapHeader;
