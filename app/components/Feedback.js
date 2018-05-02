import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ListView, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { defaults } from '../config/defaults';
import StarRating from 'react-native-star-rating';

class Feedback extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {
            comments: '',
            rating: 3,
            email: '',
            phoneNumber: '',
            name: '',
            ratingText: 'Average',
            alertMessage: '',
            submits: 0,
            submitClicked: this.props.feedbackSubmitted,
            userInfo: this.props.userInfo,
        };
    }

    //Sets the text for amount of stars
    onStarRatingPress(rating) {
        this.setState({
            rating: rating,
        });

        switch (rating) {
            case 1:
                this.setState({
                    ratingText: 'Terrible',
                });
                break;
            case 2:
                this.setState({
                    ratingText: 'Poor',
                });
                break;
            case 3:
                this.setState({
                    ratingText: 'Average',
                });
                break;
            case 4:
                this.setState({
                    ratingText: 'Great',
                });
                break;
            case 5:
                this.setState({
                    ratingText: 'Excelent',
                });
                break;
            default:
                break;
        }
    }

    //Post the user data to the server
    submit() {
        if (this.state.comments == '') {
            this.setState({ alertMessage: 'Comment field is required' });
        } else {
            var submits = this.state.submits;
            submits++;

            var userInfo = { name: 'Name', email: 'Email', phoneNumber: 'Phone Number' };
            if (this.state.name != '') {
                userInfo.name = this.state.name;
                this.setState({ name: this.state.name });
            }
            if (this.state.email != '') {
                userInfo.email = this.state.email;
                this.setState({ email: this.state.email });
            }
            if (this.state.phoneNumber != '') {
                userInfo.phoneNumber = this.state.phoneNumber;
                this.setState({ phoneNumber: this.state.phoneNumber });
            }

            this.setState({ submitClicked: true, submits: submits, userInfo: userInfo });

            this.props.saveUserInfo(userInfo);
            var newDate = new Date();
            this.props.feedbackSubmittedClicked();

            var fetchBody = JSON.stringify({
                //timestamp: '2012-09-04 06:00:00',
                timestamp: newDate.toISOString(),
                satisfactory_level: this.state.rating,
                comments: this.state.comments,
                name: this.state.name,
                email: this.state.email,
                phone_number: this.state.phoneNumber,
            });

            //set the state back to default
            this.setState({ rating: 3, ratingText: 'Average', comments: '' });

            fetch(defaults.feedbackAPI, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: fetchBody,
            })
                .then(response => {
                    return response.text();
                })
                .then(responseJson => {
                    console.log('feedback.submit.response: ', responseJson);
                })
                .catch(error => {
                    console.log('feedback.submit.error: ', error);
                });
        }
    }

    renderSecondSubmit() {
        if (this.state.submits == 0) {
            return true;
        } else {
            return false;
        }
    }

    renderSecondSubmitColor() {
        if (this.state.submits == 0) {
            return 'rgba(0,0,0,.5)';
        } else {
            return 'rgba(0,0,0,1)';
        }
    }

    //Renders the feedback form. Push individual Views onto the results array in order so that we can use the array to create a scrollable view for the feedback form
    renderFeedbackForm() {
        var result = [];

        result.push(
            <View key={0} style={styles.inputTitleRow}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Feedback</Text>
                </View>
            </View>,
        );

        result.push(
            <View key={1} style={styles.inputRow}>
                <View style={styles.starView}>
                    <Text
                        style={{
                            fontSize: 13,
                            marginTop: 5,
                            alignSelf: 'center',
                            fontFamily: 'Avenir-Roman',
                            color: 'black',
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
            </View>,
        );

        result.push(
            <View key={2} style={styles.inputRow}>
                <TextInput
                    style={styles.commentInput}
                    multiline={false}
                    editable={this.renderSecondSubmit()}
                    numberOfLines={1}
                    placeholder={this.state.userInfo.name}
                    onChangeText={name => this.setState({ name: name })}
                    placeholderTextColor={this.renderSecondSubmitColor()}
                />
            </View>,
        );

        result.push(
            <View key={3} style={styles.inputRow}>
                <TextInput
                    style={styles.commentInput}
                    multiline={false}
                    numberOfLines={1}
                    editable={this.renderSecondSubmit()}
                    keyboardType={'numeric'}
                    autoCapitalize="none"
                    placeholder={this.state.userInfo.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber: phoneNumber })}
                    placeholderTextColor={this.renderSecondSubmitColor()}
                />
            </View>,
        );

        result.push(
            <View key={4} style={styles.inputRow}>
                <TextInput
                    style={styles.commentInput}
                    multiline={false}
                    editable={this.renderSecondSubmit()}
                    numberOfLines={1}
                    keyboardType={'email-address'}
                    autoCapitalize="none"
                    placeholder={this.state.userInfo.email}
                    onChangeText={email => this.setState({ email: email })}
                    placeholderTextColor={this.renderSecondSubmitColor()}
                />
            </View>,
        );

        result.push(
            <View key={5} style={styles.inputCommentRow}>
                <TextInput
                    style={styles.commentInput}
                    multiline={true}
                    numberOfLines={6}
                    autoCapitalize="none"
                    placeholder="Leave your comments here"
                    onChangeText={comments => this.setState({ comments: comments })}
                    placeholderTextColor="rgba(0,0,0,.5)"
                />
            </View>,
        );

        result.push(
            <View key={6} style={styles.inputRow}>
                <Text style={{ color: 'darkred', alignSelf: 'center', fontFamily: 'Avenir-light', fontSize: 12 }}>
                    {this.state.alertMessage}
                </Text>
                <View style={styles.submitView}>
                    <View style={{ flex: 1 }} />

                    <TouchableOpacity style={styles.submit} onPress={() => this.submit()}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }} />
                </View>
            </View>,
        );

        return (
            <View style={styles.inputView}>
                <ScrollView>{result}</ScrollView>
            </View>
        );
    }

    leaveAnother() {
        var submits = this.state.submits;
        submits++;
        this.setState({ submitClicked: false, submits: submits });
    }

    render() {
        if (this.state.submitClicked) {
            return (
                <View style={styles.container}>
                    <View style={styles.inputViewSubmitted}>
                        <View style={{ flex: 1, paddingBottom: 15, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'blue',
                                    fontFamily: 'Avenir-Heavy',
                                }}
                            >
                                Thank you for your response!
                            </Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 15, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.leaveAnother();
                                }}
                                style={styles.leaveAnother}
                            >
                                <Text style={styles.submitText}>Leave Another</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return <View style={styles.container}>{this.renderFeedbackForm()}</View>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'column',
    },
    submit: {
        flex: 1,
        margin: 8,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    leaveAnother: {
        borderRadius: 6,
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    submitText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Avenir-Heavy',
    },
    starView: {
        flex: 0.8,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputView: {
        margin: 15,
        flex: 6,
        backgroundColor: 'rgba(255,255,255,.7)',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
    },
    inputViewSubmitted: {
        margin: 15,
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,.7)',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
    },
    commentInput: {
        flex: 1,
        marginRight: 15,
        marginLeft: 15,
    },
    inputRow: {
        height: 60,
    },
    inputTitleRow: {
        height: 34,
    },
    inputCommentRow: {
        height: 70,
    },
    submitView: {
        flex: 1,
        flexDirection: 'row',
    },
    titleText: {
        flex: 1,
        marginLeft: 15,
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'Avenir-Heavy',
        color: 'black',
    },
    titleView: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey',
        justifyContent: 'center',
    },
    titleTextView: {
        flex: 0.2,
    },
    contactContentView: {
        flex: 1,
    },
});

export default Feedback;
