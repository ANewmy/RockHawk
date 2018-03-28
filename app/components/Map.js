// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

class Map extends Component {
	constructor(props) {
		super(props);
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
					<MapView.Marker
						coordinate={this.props.coords}
						title={'title'}
						description={'description'}
					/>
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
	deltas: props.deltas
});

export default connect(mapStateToProps)(Map);
