import React, { Component } from 'react';
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native';


import chipDetailPage from './chipDetailPage';
import CollapsibleList from './collapsibleList';

var ChipsByCategories = require('../data/productsOfCategory');

class createBOM_selectChips extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    var self=this;
		this.state={
			sortByCategoriesView: ChipsByCategories.map(function(categoryAndProducts,i){
		 		return(
		 			<CollapsibleList key={i} id={i} 
			 			sortedProducts={categoryAndProducts} 
			 			sortedBy={"category"} 
			 			navigator={self.props.navigator} 
			 			showCheckBoxForm={true}/>
		 		)
		 	})
		}
	}
	_back() {
		this.props.navigator.pop();
	}
	render() {
		return (
			<View style={{ backgroundColor: '#FFFFFF' }}>
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
					<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#7fb0dd', fontSize: 18}}>Select Chips from Categories</Text>
					<ScrollView style={{height: 400}}>	
					 	{this.state.sortByCategoriesView}     	
					</ScrollView>
				</View>
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