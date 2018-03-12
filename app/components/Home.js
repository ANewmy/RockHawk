// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    renderPanels() {
        var panels = [];

        var panelData = [
            {
                title: 'Rock Hawk: The Outdoor Classroom',
                text:
                    ' Rock Hawk is an outdoor classroom that has hundreds of educational displays along the 25 miles of trails that surround and lead to the ancient effigy The displays along the trail and wetlands and the indoor and outdoor interpretive centers near' +
                    'the effigy cover a wide variety of flora and fauna as well as 12,000 years of the area’s' +
                    'history, including a history of Putnam County’s unique large effigies, old cemeteries, home' +
                    'sites, quarries and more.' +
                    'Recreational opportunities include: camping, boating, fishing, archery (3-D & static plus' +
                    'limited hunting), beach, hiking & biking, and nature watching.'
            },
            {
                title: 'History of Rock Hawk Effigy',
                text:
                    'The Rock Hawk Effigy is located near the Historic Piedmont Scenic Byway (Georgia Highway 16), which was once the Okfuskee Trail. The prehistoric trail was a major “highway” through the Southeast that ultimately connected Charleston, SC with the Mississippi River.' +
                    'It is not known who built the Rock Hawk Effigy, nor exactly when or why. Most of what we know comes from the limited research that has been conducted on the mounds and from speculation. The effigy was located on land occupied by Native Americans before early settlers took ownership via treaties and land grants shortly after 1800. The effigy consists of milky quartz rocks and is in the shape of a hawk. Some of the rocks are so large that some archaeologists believe they were dragged there with the use of deerskins. The Hawk appears to be flying southeast.'
            },
            {
                title: 'Little Family Cemeteries',
                text:
                    'The site contains two cemeteries. The smallest contains the graves of the early Little and Stinson families with more than 20 burials, is along the Rock Hawk Trail, and can be seen from the park road. The second cemetery, also along the Rock Hawk Trail, which has more than 100 graves, was probably a slave cemetery originally and later included burials not only of Little family members but also of other area residents as well.'
            }
        ];
    }

    render() {
        return <View />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    container1: {
        flex: 1,
        backgroundColor: '#f4f7f9',
        paddingTop: 30
    },
    bodyView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    bodyText: {
        flex: 1,
        fontSize: 14,
        color: 'black',
        fontFamily: 'Avenir-light'
    },
    leftView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    middleView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightView: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: 'white'
    },
    titleText: {
        fontSize: 18,
        color: 'darkblue',
        fontFamily: 'Avenir-Heavy'
    }
});

export default Home;
