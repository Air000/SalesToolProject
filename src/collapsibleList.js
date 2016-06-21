import React, { Component } from 'react';
import {
	Text,
	ListView,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	ToastAndroid
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import chipDetailPage from './chipDetailPage';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';

class CheckboxForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false
        };

        this.selectCheckbox = this.selectCheckbox.bind(this);
    }

    selectCheckbox() {
        this.setState({
            selected: !this.state.selected
        });
        this.props.onChipSelectHandler(this.props.pn, !this.state.selected);
    }

    render() {
        const defaultColor = '#fff';

        // Only onSelect prop is required
        return (
            <CheckboxField
                onSelect={this.selectCheckbox}
                selected={this.state.selected}
                defaultColor={defaultColor}
                selectedColor='#247fd2'
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}>
            </CheckboxField>
        )
    }
}
class ChipsList extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
	      dataSource: ds.cloneWithRows(props.chips)
	    };
	}
	_onOpenChipDetail(r) {
		// ToastAndroid.show('chips.length:'+this.props.chips.length, ToastAndroid.SHORT);
		this.props.navigator.push({
			title: r.pn,
			component: chipDetailPage,
			params: {
				chip: r
			}
	    })
	}
	_renderCheckBoxForm(pn) {
		if(this.props.showCheckBoxForm){
			return (
				<CheckboxForm pn={pn} onChipSelectHandler={this.props.onChipSelectHandler}/>
			);
		}else{
			return;
		}
	}
	render() {
		return (
			<ListView style={{flex: 3}}
				enableEmptySections={true}
				initialListSize = {this.props.chips.length}
				pageSize={this.props.chips.length}
				dataSource={this.state.dataSource} 
				renderRow={(rowData) => {
					return (
						<View style={{ flex: 1, flexDirection: 'row', borderWidth: .3, borderColor:'#6b6b6b'}}>
					        <TouchableOpacity
	        					onPress={()=>this._onOpenChipDetail(rowData)}
	        					style={{flex: 1}}>
								<Text style={{fontSize: 15, textAlign:'center'}}>{rowData.pn}</Text>
							</TouchableOpacity>
							{this._renderCheckBoxForm(rowData.pn)}
					      </View>
						)
						
					}
				} />		
		)
	}
};

class ProductsList extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this._renderProductsRow=this._renderProductsRow.bind(this); //bind this to _renderProductRow for ES6
	   	var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
	      dataSource: ds.cloneWithRows(props.products)
	    };
	}
	_renderProductsRow(rowData) {
		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 1, borderWidth: .3, borderColor:'#6b6b6b'}}>
					<Text style={{fontSize: 15, fontWeight: 'bold', textAlign:'center'}}>{this.props.sortedBy=="brand"?rowData.category:rowData.brand}</Text>
				</View>
				<ChipsList 
					chips={rowData.chips} 
					navigator={this.props.navigator} 
					showCheckBoxForm={this.props.showCheckBoxForm} 
					onChipSelectHandler={this.props.onChipSelectHandler}/>
			</View>
			
		)
	}
	render() {
		return (
			<ListView enableEmptySections={true}
			initialListSize = {this.props.products.length}
			pageSize={this.props.products.length}
			dataSource={this.state.dataSource} 
			renderRow={this._renderProductsRow} />
		)
	}
}

class CollapsibleList extends React.Component {
	constructor(props, context) {
	    super(props, context);
		this.state = {
	      sortedProducts: props.sortedProducts,
	      sortedBy: props.sortedBy,
	      id: props.id,
	      collapsed: true
	    };
	}
	_toggleExpanded = () => {
	    this.setState({ collapsed: !this.state.collapsed });
	}
	render() {
		let evenRow = this.state.id%2==0;
		return (
			<View>
				<TouchableOpacity onPress={this._toggleExpanded} style={[styles.header, this.state.collapsed?(evenRow && styles.evenVendorRow):styles.active]}>
					<Text style={styles.headerText}>{this.state.sortedBy=="brand"?this.state.sortedProducts.brand:this.state.sortedProducts.category}</Text>
				</TouchableOpacity>
				<Collapsible collapsed={this.state.collapsed} align="center">
					<ProductsList 
						style={styles.content} 
						sortedBy={this.state.sortedBy} 
						products={this.state.sortedProducts.products} 
						navigator={this.props.navigator} 
						showCheckBoxForm={this.props.showCheckBoxForm} 
						onChipSelectHandler={this.props.onChipSelectHandler} />
				</Collapsible>
			</View>
		)
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
		borderRadius: 10
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
	},

	containerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        flex: 1
    },
    checkboxStyle: {
        width: 23,
        height: 23,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10
    }
});

export default CollapsibleList;