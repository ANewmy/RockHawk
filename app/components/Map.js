// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { defaults } from '../config/defaults';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import geolib from 'geolib';
import { updateVisitorCount, hotSpotEntered } from '../actions/location';

class Map extends Component {
    constructor(props) {
        super(props);

        //Should be replaced by data from servers

        this.state = {
            locationData: defaults.DEFAULT_LOCATION_DATA,
            currentLocation: this.props.coords,
            num: 0,
            hotSpots: [],
            region: {
                longitudeDelta: this.props.deltas.longitudeDelta,
                latitudeDelta: this.props.deltas.latitudeDelta
            },
            trails: [
                {
                    coordinate: [
                        { latitude: 33.082201, longitude: -83.227368 },
                        { latitude: 33.084066, longitude: -83.227892 },
                        { latitude: 33.083746, longitude: -83.22959 },
                        { latitude: 33.085124, longitude: -83.229943 },
                        { latitude: 33.084914, longitude: -83.230963 }
                    ]
                }
            ]
        };
    }

    componentWillMount() {
        if (this.props.locationData.length > 0) {
            this.setState({ locationData: this.props.locationData });
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {}, error => alert(error.message), {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
            distanceFilter: 1
        });
        this.watchID = navigator.geolocation.watchPosition(position => {
            console.log('watch:', position);
            this.setState({ currentLocation: { longitude: position.longitude, latitude: position.latitude } });
        });
        this.checkForHotspot();
    }

    checkForHotspot() {
        var hotSpots = [];

        this.state.locationData.map((obj, index) => {
            if (obj.locationType == defaults.LOCATION_TYPE_HOTSPOT) {
                hotSpots.push(obj);
            }
        });

        hotSpots.map((obj, index) => {
            if (
                geolib.isPointInCircle(
                    { latitude: this.state.currentLocation.latitude, longitude: this.state.currentLocation.longitude },
                    { latitude: obj.latitude, longitude: obj.longitude },
                    obj.hotspotRadius
                )
            ) {
                console.log('User entered location: ', obj);
                this.props.hotSpotEntered(obj);

                if (this.props.locationList.length > 0) {
                    this.props.locationList.map((loc, index) => {
                        if (loc.name != obj.name) {
                            console.log('New location entered');
                            this.props.updateVisitorCount(obj);
                        } else {
                            console.log('User already entered location');
                        }
                    });
                } else {
                    console.log('first location');
                    this.props.updateVisitorCount(obj);
                }
            }
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    renderHotSpots() {
        var hotSpots = [];
        this.state.locationData.map((obj, index) => {
            if (obj.locationType == defaults.LOCATION_TYPE_HOTSPOT) {
                hotSpots.push(
                    <MapView.Circle
                        center={{ longitude: obj.longitude, latitude: obj.latitude }}
                        radius={obj.hotspotRadius}
                        fillColor={'rgba(232,65,67,.6)'}
                        title={obj.name}
                        description={obj.trailInfo}
                        key={index}
                    />
                );
            }
        });
        if (this.props.hotSpotClicked) {
            return hotSpots;
        }
    }

    renderActivities() {
        var activities = [];
        this.state.locationData.map((obj, index) => {
            if (obj.locationType == defaults.LOCATION_TYPE_ACTIVITY) {
                activities.push(
                    <MapView.Marker
                        coordinate={{ longitude: obj.longitude, latitude: obj.latitude }}
                        title={obj.name}
                        description={obj.trailInfo}
                        key={index}
                    >
                        <Icon
                            name="directions-run"
                            type="MaterialCommunityIcons"
                            color="red"
                            underlayColor="grey"
                            size={25}
                        />
                    </MapView.Marker>
                );
            }
        });

        if (this.props.activitiesClicked) {
            return activities;
        }
    }

    renderFacilities() {
        var facilities = [];
        this.state.locationData.map((obj, index) => {
            if (obj.locationType == defaults.LOCATION_TYPE_FACILITY) {
                facilities.push(
                    <MapView.Marker
                        coordinate={{ longitude: obj.longitude, latitude: obj.latitude }}
                        title={obj.name}
                        description={obj.trailInfo}
                        key={index}
                    >
                        <Icon name="place" type="MaterialIcons" color="black" underlayColor="grey" size={30} />
                    </MapView.Marker>
                );
            }
        });

        if (this.props.facilitiesClicked) {
            return facilities;
        }
    }

    renderTrails() {
        var trails = [];

        this.state.trails.map((obj, index) => {
            trails.push(
                <MapView.Polyline coordinates={obj.coordinate} strokeColor="#fff" strokeWidth={5} key={index} />
            );
        });

        if (this.props.trailsClicked) {
            return trails;
        }
    }

    //Displays the MapView container, calls individual render methods to show which markers to display
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    mapType="satellite"
                    showsUserLocation={true}
                    followUserLocation={true}
                    onRegionChangeComplete={region => {
                        var isRead = false;
                        if (isRead) {
                            this.setState({ region: region });
                        }
                    }}
                    region={{
                        latitude: this.props.coords.latitude,
                        longitude: this.props.coords.longitude,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta
                    }}
                >
                    {this.renderHotSpots()}
                    {this.renderActivities()}
                    {this.renderFacilities()}
                    {this.renderTrails()}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

const mapStateToProps = (state, props) => ({
    coords: props.coords,
    deltas: props.deltas,
    hotSpotClicked: props.hotSpotClicked,
    activitiesClicked: props.activitiesClicked,
    trailsClicked: props.trailsClicked,
    facilitiesClicked: props.facilitiesClicked,
    locationList: props.locationList
});

const mapDispatchToProps = dispatch => {
    return {
        updateVisitorCount: location => dispatch(updateVisitorCount(location)),
        hotSpotEntered: location => dispatch(hotSpotEntered(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
