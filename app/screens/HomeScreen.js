//Import react native utilities
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Animated, Platform, ListView, ScrollView, Dimensions } from 'react-native';

//Import redux related utilities
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Import actions
import { updateUtils } from '../actions/utils';
import { tabClicked } from '../actions/toolbar';

//import components
import TabNavigator from '../components/TabNavigator';
import LogoHeader from '../components/LogoHeader';
import Toolbar from '../components/Toolbar';

//Import Tabs
import Home from '../components/Home';
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
        tab: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    componentDidMount() {}

    updateMessage() {
        this.props.updateUtils({ title: 'hey' });
    }

    renderTab() {
        switch (this.props.tab) {
            case 'Home':
                return <Home />;
                break;
            case 'Map':
                return <Map />;
                break;
            case 'Feedback':
                return <Feedback />;
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
        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp'
        });
        const scrollTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -(HEADER_MIN_HEIGHT + NAV_HEIGHT + 20)],
            extrapolate: 'clamp'
        });

        const navTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -(HEADER_SCROLL_DISTANCE + HEADER_MIN_HEIGHT)],
            extrapolate: 'clamp'
        });

        const CONTENT_HEIGHT = HEADER_SCROLL_DISTANCE + HEADER_MIN_HEIGHT + NAV_HEIGHT;

        const contentTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -(NAV_HEIGHT - 10)],
            extrapolate: 'clamp'
        });

        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.75, 0.25, 0],
            extrapolate: 'clamp'
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp'
        });

        const titleTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.fill}>
                <Animated.ScrollView
                    style={[styles.scrollView, { transform: [{ translateY: scrollTranslate }] }]}
                    scrollEventThrottle={1}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
                        useNativeDriver: true
                    })}
                >
                    {this.renderTab()}
                </Animated.ScrollView>

                <Animated.View
                    style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerTranslate }] }]}
                >
                    <LogoHeader opacity={headerOpacity} />
                </Animated.View>

                <Animated.View style={[styles.nav, { transform: [{ translateY: navTranslate }] }]}>
                    <TabNavigator tabClicked={this.props.tabClicked} currentTab={this.props.tab} />
                </Animated.View>

                <Animated.View style={[styles.bar]}>
                    <Toolbar />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: 'rgba(236, 235, 243, 1)'
    },
    scrollView: {
        backgroundColor: 'rgba(236, 235, 243, 1)',
        top: NAV_HEIGHT + HEADER_MIN_HEIGHT + HEADER_MAX_HEIGHT
    },
    header: {
        position: 'absolute',
        //flex: 1,
        top: HEADER_MIN_HEIGHT,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(25,52,116,1)',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT
    },
    nav: {
        position: 'absolute',
        top: HEADER_MIN_HEIGHT + HEADER_MAX_HEIGHT,
        backgroundColor: 'green',
        left: 0,
        right: 0,
        width: null,
        height: NAV_HEIGHT
    },
    bar: {
        backgroundColor: 'rgba(5, 122, 34, 1)',
        height: HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
});

const mapStateToProps = state => ({
    tab: state.toolbar.tab
});

const mapDispatchToProps = dispatch => {
    return {
        updateUtils: utils => dispatch(updateUtils(utils)),
        tabClicked: tab => dispatch(tabClicked(tab))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
