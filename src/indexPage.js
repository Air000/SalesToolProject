import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import bomsList from './bomsInfo';
import chipsPage from './chipsPage';
import createBOM from './createBOM_inputInfo';
import blockDiagram from './blockDiagram';

class Index extends React.Component {
  _back() {
    this.props.navigator.pop();
  }
  _openBomList() {
    this.props.navigator.push({
      title: 'BOMs List',
      component: bomsList
    })
  }
  _openVendorInfo() {
    this.props.navigator.push({
      title: 'Products',
      component: chipsPage
    })
  }
  _openCreateBOM() {
    this.props.navigator.push({
      title: 'Create BOM(input info)',
      component: createBOM
    })
  }
  _openBlockDiagrame() {
    this.props.navigator.push({
      title: 'Block Diagrams',
      component: blockDiagram
    })
  }
  _openMsg() {
    ToastAndroid.show('Under Development', ToastAndroid.SHORT);
  }
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.ad_view} >
          <Image style={{flex: 1,  resizeMode: Image.resizeMode.contain}} source={require('../imgs/avnet_legend_small.png')} />
        </View>
        <View style={{flex: 5}} >
          <View style={styles.buttons_view} >
            <TouchableOpacity onPress={this._openVendorInfo.bind(this)} >
              <Image style={styles.button_img} source={require('../imgs/react_logo_small.png')} />
              <Text style={styles.button_text} >Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._openCreateBOM.bind(this)} >
              <Image style={styles.button_img} source={require('../imgs/react_logo_small.png')} />
              <Text style={styles.button_text} >Create BOM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._openBomList.bind(this)} >
              <Image style={styles.button_img} source={require('../imgs/react_logo_small.png')} />
              <Text style={styles.button_text} >Bom List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons_view} >
            <TouchableOpacity onPress={this._openBlockDiagrame.bind(this)} >
              <Image style={styles.button_img} source={require('../imgs/react_logo_small.png')} />
              <Text style={styles.button_text} >Block Diagrams</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._openMsg.bind(this)} >
              <Image style={styles.button_img} source={require('../imgs/react_logo_small.png')} />
              <Text style={styles.button_text} >Other Tool</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._openMsg.bind(this)} >
              <Image style={styles.button_img} source={require('../imgs/react_logo_small.png')} />
              <Text style={styles.button_text} >Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}} ></View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  parent: {
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },

  ad_view: {
    flex: 2, 
    height: 150, 
    marginBottom: 20,
    alignItems: 'center'
  },

  buttons_view: {
    flex: 2,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'center'
  },

  button_text: {
    textAlign: 'center', 
    fontWeight: 'bold'
  },

  button_img: {
    marginHorizontal: 10,
    borderRadius: 10
  }
});

export default Index;