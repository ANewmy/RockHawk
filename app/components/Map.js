/*
* --Map Component--
* Rendered when the user clicks the Map tab
* This component is mounted in the HomeScreen.js file
* The main render() method calls 4 other methods:
renderHotSpots()
renderActivities()
renderFacilities()
renderTrails()
* These methods check for state variables and return markers on the map when those variables are set to true
*/

//Import react packages
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

//Import third party packages
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import geolib from 'geolib';

//Import custom files we created
import { defaults } from '../config/defaults';
import { updateVisitorCount, hotSpotEntered } from '../actions/location';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationData: defaults.DEFAULT_LOCATION_DATA,
            trailData: defaults.DEFAULT_TRAIL_DATA,
            currentLocation: this.props.coords,
            hotSpots: [],
            showTrailInfo: false,
            region: {
                longitudeDelta: this.props.deltas.longitudeDelta,
                latitudeDelta: this.props.deltas.latitudeDelta,
            },
        };
    }

    //If the server responded with data, set the data to the state. If not, the state will continue to use the data stored in config/defaults.js
    componentWillMount() {
        console.log('state', this.state.currentLocation);
        if (this.props.locationData.length > 0) {
            this.setState({ locationData: this.props.locationData });
        }

        if (this.props.trailData.length > 0) {
            this.setState({ trailData: this.props.trailData });
        }
    }

    componentDidMount() {
        //Get the current location
        navigator.geolocation.getCurrentPosition(position => {}, error => alert(error.message), {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
            distanceFilter: 1,
        });

        //Starts to watch the users position, stops on componentWillUnmount().
        this.watchID = navigator.geolocation.watchPosition(position => {
            this.setState({ currentLocation: { longitude: position.longitude, latitude: position.latitude } });
            console.log('cur ', this.state.currentLocation);
        });

        //Start the checkForHotspot() method. This will periodically check to see if the users location is inside the radius of a hotspot.
        this.checkForHotspot();
    }

    checkForHotspot() {
        var hotSpots = [];

        //Do this so we can get only the location objects that are hotspots out of the locationData array.
        this.state.locationData.map((obj, index) => {
            if (obj.location_type == defaults.LOCATION_TYPE_HOTSPOT) {
                hotSpots.push(obj);
            }
        });

        //Map all the hotspots to check if the user is currently inside of one.
        hotSpots.map((obj, index) => {
            //If the users coordinates are within the radius of a hotspot.
            if (
                geolib.isPointInCircle(
                    { latitude: this.state.currentLocation.latitude, longitude: this.state.currentLocation.longitude },
                    { latitude: obj.latitude, longitude: obj.longitude },
                    obj.hotspot_radius,
                )
            ) {
                //Dispatches when the users coordinates are inside of a hotspot
                this.props.hotSpotEntered(obj);

                if (this.props.locationList.length > 0) {
                    this.props.locationList.map((loc, index) => {
                        if (loc.name != obj.name) {
                            //Gets dispatched when a user enteres a new location for the first time.
                            this.props.updateVisitorCount(obj);
                        } else {
                            //Only enters this block when the user already entered this location, to which nothing happens.
                        }
                    });
                } else {
                    //Only gets dispatched when the user enters a location for the first time.
                    this.props.updateVisitorCount(obj);
                }
            }
        });
    }

    //When the user clicks another tab, this stops watching the users location.
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    renderHotSpots() {
        var hotSpots = [];

        //Iterate through the locationData array and add objects that match location type hotspot to the hotspot array
        this.state.locationData.map((obj, index) => {
            if (obj.location_type == defaults.LOCATION_TYPE_HOTSPOT) {
                hotSpots.push(
                    <MapView.Circle
                        center={{ longitude: obj.longitude, latitude: obj.latitude }}
                        radius={obj.hotspot_radius}
                        fillColor={'rgba(232,65,67,.6)'}
                        title={obj.name}
                        description={obj.hotspot_info}
                        key={index}
                    />,
                );
            }
        });

        //Once the user clicks the Hotspots button this is set to true via the location actions in actions/location.js
        if (this.props.hotSpotClicked) {
            return hotSpots;
        }
    }

    renderActivities() {
        var activities = [];

        //Iterate through the locationData array and add objects that match location type activty to the activities array
        this.state.locationData.map((obj, index) => {
            if (obj.location_type == defaults.LOCATION_TYPE_ACTIVITY) {
                activities.push(
                    <MapView.Marker
                        coordinate={{ longitude: obj.longitude, latitude: obj.latitude }}
                        title={obj.name}
                        description={obj.hotspot_info}
                        key={index}
                    >
                        <Icon
                            name="directions-run"
                            type="MaterialCommunityIcons"
                            color="red"
                            underlayColor="grey"
                            size={25}
                        />
                    </MapView.Marker>,
                );
            }
        });

        //Once the user clicks the Activities button this is set to true via the location actions in actions/location.js
        if (this.props.activitiesClicked) {
            return activities;
        }
    }

    renderFacilities() {
        var facilities = [];

        //Iterate through the locationData array and add objects that match location type facility to the facilities array
        this.state.locationData.map((obj, index) => {
            if (obj.location_type == defaults.LOCATION_TYPE_FACILITY) {
                facilities.push(
                    <MapView.Marker
                        coordinate={{ longitude: obj.longitude, latitude: obj.latitude }}
                        title={obj.name}
                        description={obj.hotspot_info}
                        key={index}
                    >
                        <Icon name="place" type="MaterialIcons" color="black" underlayColor="grey" size={30} />
                    </MapView.Marker>,
                );
            }
        });

        //Once the user clicks the Facilities button this is set to true via the location actions in actions/location.js
        if (this.props.facilitiesClicked) {
            return facilities;
        }
    }

    trailClicked(obj) {
        console.log('clicked trail', obj);
        //this.setState({ showTrailInfo: true });
    }

    renderTrails() {
        var trails = [];

        //Iterate through trailData object that is set in the state, either using data from server or the default trail data points location in defaults.js
        this.state.trailData.map((obj, index) => {
            var coordinates = [];

            //For each trail in the traiData array, map through the latitude array, and using a parallel array, create an object with the matching longitude/latitude
            obj.trail_latitudes.map((lat, index) => {
                coordinates.push({ latitude: obj.trail_latitudes[index], longitude: obj.trail_longitudes[index] });
            });

            //push the array of objects containing a latitude and longitude point for each point in the trail
            trails.push(
                <MapView.Polyline
                    onPress={() => {
                        this.trailClicked(obj);
                    }}
                    coordinates={coordinates}
                    strokeColor="red"
                    strokeWidth={2}
                    key={index}
                />,
            );
        });

        //Once the user clicks the Trails button this is set to true via the location actions in actions/location.js
        if (this.props.trailsClicked) {
            return trails;
        }
    }

    renderTrailInfo() {
        //return <HotspotInfo
    }

    //Displays the MapView container, calls individual render methods to show which markers to display
    render() {
        console.log('loc dat: ', this.state.locationData);
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
                        longitudeDelta: this.state.region.longitudeDelta,
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
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

const mapStateToProps = (state, props) => ({
    coords: props.coords,
    deltas: props.deltas,
    hotSpotClicked: props.hotSpotClicked,
    activitiesClicked: props.activitiesClicked,
    trailsClicked: props.trailsClicked,
    facilitiesClicked: props.facilitiesClicked,
    locationList: props.locationList,
});

const mapDispatchToProps = dispatch => {
    return {
        updateVisitorCount: location => dispatch(updateVisitorCount(location)),
        hotSpotEntered: location => dispatch(hotSpotEntered(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
