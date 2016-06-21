import React, { Component } from 'react';
import {
	Text,
	ListView,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	InteractionManager
} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import chipDetailPage from './chipDetailPage';
import CollapsibleList from './collapsibleList';

var ChipsDB = require('../data/productsOfVendor').allProducts;
var OriginChipsDB = require('../data/products').allProducts;
var ChipsByCategories = require('../data/productsOfCategory');

var genProductsByCate = function(cate) {
	var products = [];
	OriginChipsDB.forEach(function(item){
		var chips = item.products.filter(function(i){
				return i.category==cate
			})[0].chips;

		if(chips.length>0){
			products.push({
				brand: item.brand,
				chips: chips
			});
		}
		
	});

	return products;
}

var genCategoriesList = function() {
	var categories = [];
	OriginChipsDB[0].products.forEach(function(item) {
		categories.push(item.category);
	});
	return categories.map(function(category) {
		var products = genProductsByCate(category);
		return {
			category: category,
			products: products
		}
	})
}

class ChipsPage extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.state = {
			renderPlaceholderOnly: true
		};
	}
	componentDidMount() { 
		InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: false}); 
		}); 
	}
	_back() {
		this.props.navigator.pop();
	}
	_renderPlaceholderView() { 
		return ( 
			<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}> 
				 <ProgressBar />
			</View> 
		); 
	}
	_renderCallapsibleListView(sortBy) {
		var self = this;
		var productsDB = sortBy=='brand'?ChipsDB:ChipsByCategories;
		return (
			productsDB.map(function(sortedProducts,i){
		 		return(
		 			<CollapsibleList key={i} id={i} sortedProducts={sortedProducts} sortedBy={sortBy} navigator={self.props.navigator} />
		 		)
		 	})	
		)
	}
	render() {
		if (this.state.renderPlaceholderOnly) { return this._renderPlaceholderView(); }
		return (
			<ScrollableTabView 
				tabBarUnderlineColor='#55ACEE' 
				tabBarActiveTextColor='#55ACEE' 
				renderTabBar={() => <DefaultTabBar />}>
			      	<ScrollView tabLabel='Sort by Brands' style={{marginHorizontal: 20}}>	
					 	{this._renderCallapsibleListView('brand')}     	
					</ScrollView>			
			        <ScrollView tabLabel='Sort by Categories' style={{marginHorizontal: 20}}>	
					 	{this._renderCallapsibleListView('category')}     	
					</ScrollView>
	    	</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '300',
		marginBottom: 20,
	},
	header: {
		backgroundColor: '#F5FCFF',
		padding: 10,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
	},
	content: {
		flex: 1,
		padding: 5,
		flexDirection: 'row',
		backgroundColor: '#fff',
	},
	active: {
		backgroundColor: '#55ACEE',
	},
	inactive: {
		backgroundColor: 'rgba(245,252,255,1)',
	},
	evenVendorRow: {
		backgroundColor: '#7fb0dd'
	}
});
export default ChipsPage;