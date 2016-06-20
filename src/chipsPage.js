import React, { Component } from 'react';
import {
	Text,
	ListView,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
// import Collapsible from 'react-native-collapsible';
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
// var ChipsByCategories=genCategoriesList();
// console.log(JSON.stringify(genCategoriesList()));

// class ChipsList extends React.Component {
// 	constructor(props, context) {
// 	    super(props, context);
// 	    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// 		this.state = {
// 	      dataSource: ds.cloneWithRows(props.chips)
// 	    };
// 	}
// 	_onOpenChipDetail(r) {
// 		this.props.navigator.push({
// 			title: r.pn,
// 			component: chipDetailPage,
// 			params: {
// 				chip: r
// 			}
// 	    })
// 	}
// 	render() {
// 		return (
// 			<ListView style={{flex: 3}}
// 				enableEmptySections={true}
// 				dataSource={this.state.dataSource} 
// 				renderRow={(rowData) => {
// 					return (
// 						<TouchableOpacity
//         					onPress={()=>this._onOpenChipDetail(rowData)}
//         					style={{borderWidth: .3, borderColor:'#6b6b6b'}}>
// 							<Text style={{fontSize: 15, textAlign:'center'}}>{rowData.pn}</Text>
// 						</TouchableOpacity>)
						
// 					}
// 				} />		
// 		)
// 	}
// };

// class ProductsList extends React.Component {
// 	constructor(props, context) {
// 	    super(props, context);
// 	    this._renderProductsRow=this._renderProductsRow.bind(this); //bind this to _renderProductRow for ES6
// 	   	var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// 		this.state = {
// 	      dataSource: ds.cloneWithRows(props.products)
// 	    };
// 	}
// 	_renderProductsRow(rowData) {
// 		return (
// 			<View style={{flex: 1, flexDirection: 'row'}}>
// 				<View style={{flex: 1, borderWidth: .3, borderColor:'#6b6b6b'}}>
// 					<Text style={{fontSize: 15, fontWeight: 'bold', textAlign:'center'}}>{this.props.sortedBy=="brand"?rowData.category:rowData.brand}</Text>
// 				</View>
// 				<ChipsList chips={rowData.chips} navigator={this.props.navigator} />
// 			</View>
			
// 		)
// 	}
// 	render() {
// 		return (
// 			<ListView enableEmptySections={true}
// 			dataSource={this.state.dataSource} 
// 			renderRow={this._renderProductsRow} />
// 		)
// 	}
// }

// class CollapsibleList extends React.Component {
// 	constructor(props, context) {
// 	    super(props, context);
// 		this.state = {
// 	      sortedProducts: props.sortedProducts,
// 	      sortedBy: props.sortedBy,
// 	      id: props.id,
// 	      collapsed: true
// 	    };
// 	}
// 	_toggleExpanded = () => {
// 	    this.setState({ collapsed: !this.state.collapsed });
// 	}
// 	render() {
// 		let evenRow = this.state.id%2==0;
// 		return (
// 			<View>
// 				<TouchableOpacity onPress={this._toggleExpanded} style={[styles.header, this.state.collapsed?(evenRow && styles.evenVendorRow):styles.active]}>
// 					<Text style={styles.headerText}>{this.state.sortedBy=="brand"?this.state.sortedProducts.brand:this.state.sortedProducts.category}</Text>
// 				</TouchableOpacity>
// 				<Collapsible collapsed={this.state.collapsed} align="center">
// 					<ProductsList style={styles.content} sortedBy={this.state.sortedBy} products={this.state.sortedProducts.products} navigator={this.props.navigator} />
// 				</Collapsible>
// 			</View>
// 		)
// 	}
// }

class ChipsPage extends React.Component {
	constructor(props, context) {
		super(props,context);
		this.state = {
			sortByCategoriesView: <Text>Loading</Text>,
			isViewLoad: false
		};
	}
	_back() {
		this.props.navigator.pop();
	}
	_onChangeTab() {
		if(this.state.isViewLoad)return;
		var self = this;
		this.setState(
			{
				sortByCategoriesView: ChipsByCategories.map(function(categoryAndProducts,i){
			 		return(
			 			<CollapsibleList key={i} id={i} sortedProducts={categoryAndProducts} sortedBy={"category"} navigator={self.props.navigator} />
			 		)
			 	}),
			 	isViewLoad: true
			}
		)
	}
	render() {
		var self = this;
		return (
			<ScrollableTabView 
				tabBarUnderlineColor='#55ACEE' 
				tabBarActiveTextColor='#55ACEE' 
				renderTabBar={() => <DefaultTabBar />} 
				onChangeTab={this._onChangeTab.bind(this)} >
			      	<ScrollView tabLabel='Sort by Brands' >	
					 	{ChipsDB.map(function(vendorAndProducts,i){
					 		return(
					 			<CollapsibleList key={i} id={i} sortedProducts={vendorAndProducts} sortedBy={"brand"} navigator={self.props.navigator} />
					 		)
					 	})}     	
					</ScrollView>			
			        <ScrollView tabLabel='Sort by Categories' >	
					 	{this.state.sortByCategoriesView}     	
					</ScrollView>
	    	</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F5FCFF',
	},
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