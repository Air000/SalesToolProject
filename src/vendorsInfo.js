import React, { Component } from 'react';
import {
	Text,
	ListView,
	View,
	ScrollView,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

var ChipsDB = require('../data/products').allProducts;

class ChipsList extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
	      dataSource: ds.cloneWithRows(props.chips)
	    };
	}
	render() {
		return (
			<ListView style={{flex: 3, backgroundColor:'green'}} 
				enableEmptySections={true}
				dataSource={this.state.dataSource} 
				renderRow={(r) => <Text>{r.pn}</Text>} />
		)
	}
};

class ProductsList extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
	      dataSource: ds.cloneWithRows(props.products)
	    };
	}
	_renderProductsRow(rowData) {
		return (
			<View style={{flex: 1, flexDirection: 'row', borderColor:'black', borderStyle: 'solid'}}>
				<View style={{flex: 1, backgroundColor:'red'}}>
					<Text>{rowData.category}</Text>
				</View>
				<ChipsList chips={rowData.chips} />
			</View>
			
		)
	}
	render() {
		return (
			<ListView 
			dataSource={this.state.dataSource} 
			renderRow={this._renderProductsRow} />
		)
	}
}

class VendorsList extends React.Component {
	constructor(props, context) {
	    super(props, context);
		this.state = {
	      vendorAndProducts: props.vendorAndProducts,
	      collapsed: true
	    };
	}
	_toggleExpanded = () => {
	    this.setState({ collapsed: !this.state.collapsed });
	}
	render() {
		return (
			<View>
				<TouchableHighlight onPress={this._toggleExpanded}>
					<View style={styles.header}>
						<Text style={styles.headerText}>{this.state.vendorAndProducts.brand}</Text>
					</View>
				</TouchableHighlight>
				<Collapsible collapsed={this.state.collapsed} align="center">
					<ProductsList style={styles.content} products={this.state.vendorAndProducts.products} />
				</Collapsible>
			</View>
		)
	}
}

class vendorsInfo extends React.Component {
	_back() {
		this.props.navigator.pop();
	}
	render() {
		return (
			<ScrollableTabView tabBarUnderlineColor='#55ACEE' tabBarActiveTextColor='#55ACEE' renderTabBar={() => <DefaultTabBar />} >
		      	<ScrollView tabLabel='Sort by Brands' >	
				 	{ChipsDB.map(createVendorRow)}     	
				</ScrollView>			
		        <Text tabLabel='Sort by Categories'>favorite</Text>
	    	</ScrollableTabView>
		);
	}
}
var createVendorRow = (vendorAndProducts, i) => <VendorsList key={i} vendorAndProducts={vendorAndProducts} />;

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
		backgroundColor: 'rgba(255,255,255,1)',
	},
	inactive: {
		backgroundColor: 'rgba(245,252,255,1)',
	},
});
export default vendorsInfo;