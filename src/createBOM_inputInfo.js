import React, { Component } from 'react';
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	Image,
	Picker,
	TouchableOpacity
} from 'react-native';
import createBOM_selectChips from './createBOM_selectChips';

var vendorList = require('../data/vendorList');
var PickerItem = Picker.Item;

class createBOM_inputInfo extends React.Component {
	constructor(props, context) {
	    super(props, context);
		this.state = {
	      segment: "segment",
	      application: "application",
	      platformsList: vendorList,
	      platform: "platform",
	      productCategories: "",
	    };
	}
	_back() {
		this.props.navigator.pop();
	}
	_openPage() {
		this.props.navigator.push({
			title: 'Create BOM(select PN)',
			component: createBOM_selectChips,
			params: {
				segment: this.state.segment,
				application: this.state.application,
				platform: this.state.platform,
				productCategories: this.state.productCategories
			}
	    })
	}
	render() {
		return (
			<View style={styles.parent}>
				<View style={{flex: 5}}>
					<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>Please Enter Following Info:</Text>
					<View style={styles.infoView}>
						<Text style={styles.infoText}>Segment:</Text>
						<TextInput style={styles.infoInput}
							onChangeText={segment => this.setState({segment: segment}) }
							placeholder={'ex. Automotive'} placeholderTextColor='#cecece' />
					</View>
					<View style={styles.infoView}>	
						<Text style={styles.infoText}>Application:</Text>
					
						<TextInput style={styles.infoInput}
							onChangeText={application => this.setState({application: application}) }
							placeholder={'ex. Infotainment'} placeholderTextColor='#cecece'/>
					</View>		
					<View style={styles.infoView}>
						<Text style={styles.infoText}>Select Platform:</Text>
						<Picker 
		                    selectedValue={this.state.platform}
		                    onValueChange={ (platform) => (this.setState({platform:platform}) ) }  >
		  									{this.state.platformsList.map((s, i) => {
												return <PickerItem
	  										 		key={i}
						                         	value={s}
						                         	label={s} />
		  									}) }
		                </Picker>
					</View>		
					<View style={styles.infoView}>		
						<Text style={styles.infoText}>Product Categories:</Text>
						<TextInput style={styles.infoInput}
							onChangeText={productCategories => this.setState({productCategories: productCategories}) }
							placeholder={''} placeholderTextColor='#cecece' />
					</View>		
				</View>	
				<View style={styles.direct}>
					<Text style={{fontSize: 18, fontStyle: 'italic'}}>Select Chips</Text>
					<TouchableOpacity style={styles.right} onPress={this._openPage.bind(this)}> 
					<Image style={styles.poke} source={require('../imgs/poke.png')} /> 
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
 	parent: {
 		flex: 1, 
 		alignItems: 'center', 
 		padding: 16
 	},	
 	infoView: {
 		margin: 10,
 		// backgroundColor: '#55ACEE'
 	},
 	infoText: {
 		backgroundColor: '#55ACEE',
 		color: 'white',
 		fontSize: 18,
 		fontWeight: 'bold',
 	},
 	infoInput: {
 		height: 40
 	},
    direct: {
		flex: 1,
		flexDirection: 'row', 
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent:'center'
    },

    buttonContainer: {
      padding:10, 
      height:45, 
      overflow:'hidden', 
      borderRadius:4, 
      backgroundColor: 'white'
    },

    buttonStyle: {
      fontSize: 20, 
      color: 'green'
    },
    poke: {
      marginTop: 10,
      marginBottom: 10,
      width: 60,
      height: 60
    }
});

export default createBOM_inputInfo;