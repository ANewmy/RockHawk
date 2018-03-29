// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Linking,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    ListView,
    Animated
} from 'react-native';
import { Icon } from 'react-native-elements';

class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            ds: [
                {
                    title: 'Rock Hawk: The Outdoor Classroom',
                    text:
                        ' Rock Hawk is an outdoor classroom that has hundreds of educational displays along the 25 miles of trails that surround and lead to the ancient effigy The displays along the trail and wetlands and the indoor and outdoor interpretive centers near' +
                        'the effigy cover a wide variety of flora and fauna as well as 12,000 years of the area’s' +
                        'history, including a history of Putnam County’s unique large effigies, old cemeteries, home' +
                        'sites, quarries and more. \n\n' +
                        'Recreational opportunities include: camping, boating, fishing, archery (3-D & static plus' +
                        'limited hunting), beach, hiking & biking, and nature watching.\n'
                },
                {
                    title: 'History of Rock Hawk Effigy',
                    text:
                        'The Rock Hawk Effigy is located near the Historic Piedmont Scenic Byway (Georgia Highway 16), which was once the Okfuskee Trail. The prehistoric trail was a major “highway” through the Southeast that ultimately connected Charleston, SC with the Mississippi River. \n\n' +
                        'It is not known who built the Rock Hawk Effigy, nor exactly when or why. Most of what we know comes from the limited research that has been conducted on the mounds and from speculation. \n\nThe effigy was located on land occupied by Native Americans before early settlers took ownership via treaties and land grants shortly after 1800. The effigy consists of milky quartz rocks and is in the shape of a hawk. Some of the rocks are so large that some archaeologists believe they were dragged there with the use of deerskins. The Hawk appears to be flying southeast.\n'
                },
                {
                    title: 'Little Family Cemeteries',
                    text:
                        'The site contains two cemeteries. The smallest contains the graves of the early Little and Stinson families with more than 20 burials, is along the Rock Hawk Trail, and can be seen from the park road. \n\nThe second cemetery, also along the Rock Hawk Trail, which has more than 100 graves, was probably a slave cemetery originally and later included burials not only of Little family members but also of other area residents as well.\n'
                }
            ],
            dataSource: ds.cloneWithRows(['row 1', 'row 2'])
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.ds)
        });
    }

    renderRow(data) {
        return (
            <View style={styles.row}>
                <Text style={styles.titleText}>{data.title}</Text>
                <Text style={styles.bodyText}>{data.text}</Text>
            </View>
        );
    }

    //Navigates to the rockhawk homepage
    click() {
        Linking.openURL('http://rockhawk.org/')
            .then(url => {})
            .catch(err => console.error('An error occurred', err));
    }

    render() {
        var scrollY = new Animated.Value(0);

        const headerTranslate = scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -44],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.container}>
                <Animated.View
                    style={[
                        {
                            height: 44,
                            position: 'absolute',
                            bottom: -44,
                            left: 0,
                            zIndex: 10,
                            right: 0
                        },
                        { transform: [{ translateY: headerTranslate }] }
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => this.click()}
                        style={{ flex: 1, backgroundColor: 'lightgrey', flexDirection: 'row' }}
                    >
                        <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Avenir-Heavy', color: 'darkblue' }}>
                                Learn More
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon
                                name="chevron-right"
                                type="MaterialIcons"
                                color="darkblue"
                                underlayColor="grey"
                                size={35}
                            />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.ScrollView
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                        useNativeDriver: true
                    })}
                >
                    <View style={styles.bodyView}>
                        <ListView
                            style={styles.listView}
                            dataSource={this.state.dataSource}
                            renderRow={data => this.renderRow(data)}
                        />
                    </View>
                    <View style={{ height: 44 }} />
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10
    },
    listView: {
        flex: 1,
        flexDirection: 'column'
    },
    container1: {
        flex: 1,
        backgroundColor: '#f4f7f9',
        paddingTop: 30
    },
    bodyView: {
        flex: 9,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5
    },
    bodyText: {
        flex: 1,
        fontSize: 14,
        margin: 5,
        padding: 3,
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
        padding: 5,
        fontFamily: 'Avenir-Heavy'
    },
    row: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey'
    }
});

export default Home;
