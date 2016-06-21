import React, { Component } from 'react';
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ToastAndroid,
	InteractionManager
} from 'react-native';

import ProgressBar from 'ProgressBarAndroid';
import chipDetailPage from './chipDetailPage';
import CollapsibleList from './collapsibleList';

var Button = require('react-native-button');
var ChipsByCategories = require('../data/productsOfCategory');
var RNFS=require('react-native-fs');

function writeBOMtoFile(bom, fileName){
	var path = RNFS.DocumentDirectoryPath + fileName;
	RNFS.writeFile(path, JSON.stringify(bom), 'utf8')
    .then((success) => {
      ToastAndroid.show("write success", ToastAndroid.SHORT);
    })
    .catch((err) => {
      ToastAndroid.show("write error", ToastAndroid.SHORT);
    });  
}
function readBOMfromFile(fileName) {
	var path = RNFS.DocumentDirectoryPath + fileName;
	RNFS.readFile(path, 'utf8')
    .then((contents) => {
      ToastAndroid.show(contents, ToastAndroid.SHORT);
      return contents;
    })
    .catch((err) => {
      ToastAndroid.show("write error", ToastAndroid.SHORT);
    });
}
class createBOM_selectChips extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this._onChipSelectChange=this._onChipSelectChange.bind(this);
		this.state={
			renderPlaceholderOnly: true,
			selectedChips: []
		}
	}
	componentDidMount() { 
		InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: false}); 
		}); 
	}
	_onChipSelectChange(pn, isSelected){
		
		if(isSelected) {	//add chip's pn to selectedChips array
			if(this.state.selectedChips.indexOf(pn)<0){
				this.state.selectedChips.push(pn);
				this.setState({
					selectedChips: this.state.selectedChips
				});
			}
		}else{	//delete chip's pn from selectedChips array
			var index = this.state.selectedChips.indexOf(pn)
			if(index>=0) {
				this.state.selectedChips.splice(index,1)
				this.setState({
					selectedChips: this.state.selectedChips
				});
			}
		}
		ToastAndroid.show(this.state.selectedChips.toString(), ToastAndroid.SHORT);
	}
	_renderSortByCategoriesView() {
		var self=this;
		return (
			ChipsByCategories.map(function(categoryAndProducts,i){
		 		return(
		 			<CollapsibleList key={i} id={i} 
			 			sortedProducts={categoryAndProducts} 
			 			sortedBy={"category"} 
			 			navigator={self.props.navigator}
			 			onChipSelectHandler={self._onChipSelectChange} 
			 			showCheckBoxForm={true}/>
		 		)
		 	})
	 	)
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
	_saveButtonPress() {
		ToastAndroid.show("_saveButtonPress", ToastAndroid.SHORT);
		var bom = {
			segment: this.props.segment,
			application: this.props.application,
			platform: this.props.platform,
			productCategories: this.props.productCategories,
			chips: this.state.selectedChips 
		};

		writeBOMtoFile(bom, 'bom1.txt');
		readBOMfromFile('bom1.txt');

	}
	render() {
		if(this.state.renderPlaceholderOnly){return this._renderPlaceholderView();}
		return (
			<View style={{flex: 1}}>
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
				<View style={{marginHorizontal: 20, flex: 12}}>
					<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#7fb0dd', fontSize: 18}}>Select Chips from Categories</Text>
					<ScrollView >	
					 	{this._renderSortByCategoriesView()}     	
					</ScrollView>
				</View>
				
				<Button
					style={ styles.buttonStyle }
					containerStyle={styles.buttonContainer}
					onPress={this._saveButtonPress.bind(this)}
					>
					Save
				</Button>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	head: {
		flex: 3,
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
	},
	buttonContainer: {
      overflow:'hidden', 
      borderRadius:8,
      marginVertical: 10,
      width: 100,
      flex: 1,
      marginRight: 20,
      alignSelf: 'flex-end',
      backgroundColor: 'white'
    },

    buttonStyle: {
      fontSize: 20, 
      color: 'green'
    }
});
export default createBOM_selectChips;