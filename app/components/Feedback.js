// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ListView, Picker, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';

class Feedback extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            comments: '',
            rating: 3,
            ratingText: 'Average',
            ds: [
                {
                    title: 'Eatonton-Putnam Chamber of Commerce',
                    website: 'http://www.visiteatonton.com',
                    phone: '706-485-7701',
                    address:
                        '305 North Madison Avenue Eatonton, GA 31024 Mailing Address PO Box 4088' +
                        'Eatonton, GA 31024',
                    email: 'info@eatonton.com'
                },
                {
                    title: 'Georgia Power',
                    website: 'http://www.georgiapower.com/lakes/home.asp',
                    phone: '888-472-5253',
                    address: null,
                    email: null
                },
                {
                    title: 'Georgia Dept. of Natural Resources, Wildlife Division',
                    website: 'http://www.georgiawildlife.com/',
                    phone: null,
                    address: null,
                    email: null
                },
                {
                    title: 'Historic Piedmont Scenic Byway',
                    website: 'http://scenicbyway.org/',
                    phone: '706-485-7701',
                    address: null,
                    email: null
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

    onStarRatingPress(rating) {
        console.log('rating: ', rating);
        this.setState({
            rating: rating
        });
        switch (rating) {
            case 1:
                this.setState({
                    ratingText: 'Terrible'
                });
                break;
            case 2:
                this.setState({
                    ratingText: 'Poor'
                });
                break;
            case 3:
                this.setState({
                    ratingText: 'Average'
                });
                break;
            case 4:
                this.setState({
                    ratingText: 'Great'
                });
                break;
            case 5:
                this.setState({
                    ratingText: 'Excelent'
                });
                break;
            default:
                break;
        }
    }

    submit() {
        //const url = 'http://192.168.1.79:8000/polls/feedback/';
        const url = 'http://127.0.0.1:8000/polls/feedback/';

        var fetchBody = JSON.stringify({
            timestamp: '2012-09-04 06:00:00',
            satisfactory_level: this.state.rating,
            comments: this.state.comments
        });

        console.log('Submit clicked.. fetching data: ', url, fetchBody);

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: fetchBody
        })
            .then(response => {
                console.log('resposnse: ', response);

                return response.json();
            })
            .then(responseJson => {
                console.log('responseJSON: ', responseJson);
            })
            .catch(error => {
                console.log('error: ', error);
            });
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
                <View style={styles.contactView}>
                    <View style={styles.titleTextView}>
                        <Text style={styles.titleText}>Contact Us</Text>
                    </View>
                    <View style={styles.contactContentView}>
                        <ListView
                            style={styles.container}
                            dataSource={this.state.dataSource}
                            renderRow={data => this.renderRow(data)}
                        />
                    </View>
                </View>

                <View style={styles.inputView}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>Feedback</Text>
                    </View>
                    <View style={styles.starView}>
                        <Text
                            style={{
                                fontSize: 13,
                                marginTop: 5,
                                alignSelf: 'center',
                                fontFamily: 'Avenir-Roman',
                                color: 'black'
                            }}
                        >
                            {this.state.ratingText}
                        </Text>
                        <StarRating
                            disabled={false}
                            fullStarColor="gold"
                            emptyStarColor="black"
                            starSize={25}
                            buttonStyle={{ padding: 5 }}
                            starPadding={10}
                            maxStars={5}
                            rating={this.state.rating}
                            selectedStar={rating => this.onStarRatingPress(rating)}
                        />
                    </View>

                    <TextInput
                        style={styles.commentInput}
                        multiline={true}
                        numberOfLines={6}
                        autoCapitalize="none"
                        placeholder="Leave your comments here"
                        onChangeText={comments => this.setState({ comments: comments })}
                        placeholderTextColor="rgba(0,0,0,.5)"
                    />

                    <View style={styles.submitView}>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={styles.submit} onPress={() => this.submit()}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'column'
    },
    submit: {
        flex: 1,
        margin: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
    },
    submitText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Avenir-Heavy'
    },
    starView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactView: {
        margin: 15,
        flex: 5.5,
        backgroundColor: 'rgba(255,255,255,.7)',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth
    },
    inputView: {
        margin: 15,
        marginTop: 0,
        flex: 4.5,
        backgroundColor: 'rgba(255,255,255,.7)',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth
    },
    commentInput: {
        flex: 1,
        marginRight: 15,
        marginLeft: 15
    },
    submitView: {
        flex: 1,
        flexDirection: 'row'
    },

    titleText: {
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'Avenir-Heavy',
        color: 'black'
    },
    contactTitleText: {
        marginLeft: 15,
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
        fontFamily: 'Avenir-Heavy',
        color: 'darkblue'
    },
    contactSubText: {
        marginLeft: 25,
        fontSize: 12,
        marginBottom: 2,
        fontFamily: 'Avenir-Roman',
        color: 'black'
    },
    contactSubLastText: {
        marginLeft: 25,
        fontSize: 12,
        marginBottom: 2,
        fontFamily: 'Avenir-Roman',
        color: 'black'
    },
    titleTextView: {
        flex: 0.2
    },
    row: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey'
    },
    contactContentView: {
        flex: 1
    }
});

export default Feedback;
