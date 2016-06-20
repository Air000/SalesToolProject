import React, { Component } from 'react';
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class createBOM_selectChips extends React.Component {
	_back() {
		this.props.navigator.pop();
	}
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
				<View style={styles.head}>
					<View style={styles.descContainer}>
						<Text  style={styles.lable}>Segment: </Text>
						<Text>{this.props.segment}</Text>
					</View>
					<View style={styles.descContainer}>
						<Text style={styles.lable}>Application: </Text>
						<Text>{this.props.application}</Text>
					</View>
					<View style={styles.descContainer}>
						<Text style={styles.lable}>Platform: </Text>
						<Text>{this.props.platform}</Text>
					</View>
					<View style={styles.descContainer}>
						<Text style={styles.lable}>Product Categories: </Text>
						<Text>{this.props.productCategories}</Text>
					</View>
				</View>
				<View>
					<Text>Select Chips</Text>
				</View>
				<Text>Welcome to Navigation! {this.props.platform}</Text>
				<TextInput
					onChangeText={age => this.props.changeMyAge(age) }
					placeholder={'Enter your age:'}
					style={{ height: 40, width: 200 }} />
				<TouchableOpacity onPress={this._back.bind(this)}>
					<Text style={{ color: '#55ACEE' }}>Save my age</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	head: {
		borderTopColor: 'black',
		borderTopWidth: 1
	},
	descContainer: {
		flexDirection: 'row',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		backgroundColor: '#e9d648'
	},
	lable: {
		fontWeight: 'bold',
		marginRight: 10,
		marginLeft: 10,
	}
});
export default createBOM_selectChips;