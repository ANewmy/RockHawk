//Import react native utilities
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Animated, Platform, ListView, ScrollView, Dimensions } from 'react-native';

//Import redux related utilities
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Import actions
import { updateUtils, infoClicked, closeInfo } from '../actions/location';
import { tabClicked } from '../actions/toolbar';
import { feedbackSubmittedClicked, saveUserInfo } from '../actions/feedback';

//import components
import TabNavigator from '../components/TabNavigator';
import LogoHeader from '../components/LogoHeader';
import Toolbar from '../components/Toolbar';

//Import Tabs
import Home from '../components/Home';
import MapHeader from '../components/MapHeader';
import Map from '../components/Map';
import Feedback from '../components/Feedback';
import Donations from '../components/Donations';

//Define constants for animation parameters
const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const NAV_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

//This component shows information on the home screen
class HomeScreen extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        tab: PropTypes.string,
        coords: PropTypes.object,
        deltas: PropTypes.object,
        hotSpotClicked: PropTypes.bool,
        trailsClicked: PropTypes.bool,
        activitiesClicked: PropTypes.bool,
        facilitiesClicked: PropTypes.bool,
        locationList: PropTypes.array,
        currentHotSpot: PropTypes.object,
        locationData: PropTypes.array,
        feedbackSubmitted: PropTypes.bool,
        trailData: PropTypes.array,
        userInfo: PropTypes.object,
        infoObj: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    renderHeader() {
        if (this.props.tab == 'Map') {
            return (
                <MapHeader
                    navigation={this.props.navigation}
                    hotSpotClicked={this.props.hotSpotClicked}
                    trailsClicked={this.props.trailsClicked}
                    activitiesClicked={this.props.activitiesClicked}
                    facilitiesClicked={this.props.facilitiesClicked}
                    currentHotSpot={this.props.currentHotSpot}
                    infoClicked={this.props.infoClicked}
                />
            );
        } else {
            return <LogoHeader />;
        }
    }

    renderTab() {
        switch (this.props.tab) {
            case 'Home':
                return <Home />;
                break;
            case 'Map':
                return (
                    <Map
                        coords={this.props.coords}
                        deltas={this.props.deltas}
                        hotSpotClicked={this.props.hotSpotClicked}
                        trailsClicked={this.props.trailsClicked}
                        activitiesClicked={this.props.activitiesClicked}
                        facilitiesClicked={this.props.facilitiesClicked}
                        locationList={this.props.locationList}
                        locationData={this.props.locationData}
                        trailData={this.props.trailData}
                        infoObj={this.props.infoObj}
                        infoClicked={this.props.infoClicked}
                        close={this.props.closeInfo}
                    />
                );
                break;
            case 'Feedback':
                return (
                    <Feedback
                        feedbackSubmittedClicked={this.props.feedbackSubmittedClicked}
                        feedbackSubmitted={this.props.feedbackSubmitted}
                        userInfo={this.props.userInfo}
                        saveUserInfo={this.props.saveUserInfo}
                    />
                );
                break;
            case 'Donations':
                return <Donations />;
                break;
            default:
                return null;
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Toolbar navigation={this.props.navigation} />
                </View>
                <View style={styles.header}>{this.renderHeader()}</View>
                <View style={styles.tabNav}>
                    <TabNavigator tabClicked={this.props.tabClicked} currentTab={this.props.tab} />
                </View>
                <View style={styles.screenView}>{this.renderTab()}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
    },
    toolbar: {
        flex: 0.8,
    },
    header: {
        flex: 1.5,
    },
    tabNav: {
        flex: 0.7,
    },
    screenView: {
        flex: 7,
    },
});

const mapStateToProps = state => ({
    tab: state.toolbar.tab,
    coords: state.location.coords,
    deltas: state.location.deltas,
    hotSpotClicked: state.location.hotSpotClicked,
    trailsClicked: state.location.trailsClicked,
    activitiesClicked: state.location.activitiesClicked,
    facilitiesClicked: state.location.facilitiesClicked,
    locationList: state.location.locationList,
    currentHotSpot: state.location.currentHotSpot,
    locationData: state.location.locationData,
    feedbackSubmitted: state.feedback.feedbackSubmitted,
    trailData: state.location.trailData,
    userInfo: state.feedback.userInfo,
    infoObj: state.location.infoObj,
});

const mapDispatchToProps = dispatch => {
    return {
        tabClicked: tab => dispatch(tabClicked(tab)),
        feedbackSubmittedClicked: () => dispatch(feedbackSubmittedClicked()),
        closeInfo: () => dispatch(closeInfo()),
        saveUserInfo: userInfo => dispatch(saveUserInfo(userInfo)),
        infoClicked: infoObj => dispatch(infoClicked(infoObj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
