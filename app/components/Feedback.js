// @flow

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Picker,
	TouchableOpacity
} from 'react-native';
import StarRating from 'react-native-star-rating';

class Feedback extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comments: '',
			rating: 3,
			ratingText: 'Average'
		};
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

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.contactView}>
					<View style={styles.titleView}>
						<Text style={styles.titleText}>Contact Us</Text>
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
						<TouchableOpacity
							style={styles.submit}
							onPress={() => this.submit()}
						>
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
		flex: 4,
		backgroundColor: 'rgba(255,255,255,.7)',
		borderColor: 'grey',
		borderRadius: 5,
		borderWidth: StyleSheet.hairlineWidth
	},
	inputView: {
		margin: 15,
		marginTop: 0,
		flex: 6,
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
	titleView: {
		flex: 0.8,
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	titleText: {
		flex: 1,
		marginLeft: 15,
		marginTop: 5,
		fontSize: 18,
		fontFamily: 'Avenir-Heavy',
		color: 'black'
	}
});

export default Feedback;
