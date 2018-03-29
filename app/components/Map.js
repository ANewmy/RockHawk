// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class Map extends Component {
    constructor(props) {
        super(props);
        console.log('Map props: ', props);
        this.state = {
            hotSpots: [
                {
                    coordinate: { latitude: 33.081684, longitude: -83.230886 },
                    title: 'Atkinson Hall',
                    description: 'this is where class'
                },
                {
                    coordinate: { latitude: 33.080825, longitude: -83.228375 },
                    title: 'The Brick',
                    description: 'Food Here'
                },
                {
                    coordinate: { latitude: 33.081544, longitude: -83.227954 },
                    title: 'Amicci Milledgeville',
                    description: 'Food Here'
                },
                {
                    coordinate: { latitude: 33.081631, longitude: -83.226325 },
                    title: 'United States Postal Service',
                    description: 'Mail letters here'
                },
                {
                    coordinate: { latitude: 33.080676, longitude: -83.227185 },
                    title: 'Capital City',
                    description: 'Propbably need bobcat ID'
                }
            ],
            activities: [
                {
                    coordinate: { latitude: 33.08109, longitude: -83.230539 },
                    title: 'Front Campus',
                    description: 'Dogs allowed'
                },
                {
                    coordinate: { latitude: 33.082665, longitude: -83.232281 },
                    title: 'Georgia College Meseum',
                    description: 'Cool stuff here'
                },
                {
                    coordinate: { latitude: 33.076403, longitude: -83.233826 },
                    title: 'Centennial Center',
                    description: 'Basketball happens sometimes'
                },
                {
                    coordinate: { latitude: 33.07768, longitude: -83.23374 },
                    title: 'Tennis Courts',
                    description: 'Marshall plays here sometimes'
                },
                {
                    coordinate: { latitude: 33.081692, longitude: -83.218829 },
                    title: 'Greenway',
                    description: 'My dog likes it here'
                }
            ],
            facilities: [
                {
                    coordinate: { latitude: 33.08368, longitude: -83.223765 },
                    title: 'Station On McIntosh',
                    description: 'People Live here?'
                },
                {
                    coordinate: { latitude: 33.086048, longitude: -83.229167 },
                    title: 'College Station',
                    description: 'People Live here!'
                },
                {
                    coordinate: { latitude: 33.078249, longitude: -83.232703 },
                    title: 'Dorms',
                    description: 'Freshman sleep here sometimes'
                },
                {
                    coordinate: { latitude: 33.084704, longitude: -83.230818 },
                    title: 'Andrews House',
                    description: 'Lady also lives here'
                }
            ],
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

    renderHotSpots() {
        var hotSpots = [];
        this.state.hotSpots.map((obj, index) => {
            hotSpots.push(
                <MapView.Circle
                    center={obj.coordinate}
                    radius={40}
                    fillColor={'rgba(232,65,67,.6)'}
                    title={obj.title}
                    description={obj.description}
                    key={index}
                />
            );
        });

        if (this.props.hotSpotClicked) {
            return hotSpots;
        }
    }

    renderActivities() {
        var activities = [];
        this.state.activities.map((obj, index) => {
            activities.push(
                <MapView.Marker coordinate={obj.coordinate} title={obj.title} description={obj.description} key={index}>
                    <Icon
                        name="directions-run"
                        type="MaterialCommunityIcons"
                        color="red"
                        underlayColor="grey"
                        size={25}
                    />
                </MapView.Marker>
            );
        });

        if (this.props.activitiesClicked) {
            return activities;
        }
    }

    renderFacilities() {
        var facilities = [];
        this.state.facilities.map((obj, index) => {
            facilities.push(
                <MapView.Marker coordinate={obj.coordinate} title={obj.title} description={obj.description} key={index}>
                    <Icon name="place" type="MaterialIcons" color="black" underlayColor="grey" size={30} />
                </MapView.Marker>
            );
        });

        if (this.props.facilitiesClicked) {
            return facilities;
        }
    }

    renderTrails() {
        var trails = [];

        this.state.trails.map((obj, index) => {
            trails.push(
                <MapView.Polyline
                    coordinates={obj.coordinate}
                    strokeColor="#fff" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={5}
                    key={index}
                />
            );
        });

        if (this.props.trailsClicked) {
            return trails;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    mapType="satellite"
                    region={{
                        latitude: this.props.coords.latitude,
                        longitude: this.props.coords.longitude,
                        latitudeDelta: this.props.deltas.latitudeDelta,
                        longitudeDelta: this.props.deltas.longitudeDelta
                    }}
                >
                    {this.renderHotSpots()}
                    {this.renderActivities()}
                    {this.renderFacilities()}
                    {this.renderTrails()}
                    <MapView.Marker coordinate={this.props.coords} title={'You'}>
                        <Icon name="person-pin-circle" color="blue" size={35} type="MaterialIcons" />
                    </MapView.Marker>
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
    facilitiesClicked: props.facilitiesClicked
});

export default connect(mapStateToProps)(Map);
