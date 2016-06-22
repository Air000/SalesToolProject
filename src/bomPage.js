import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';

var ChipsDBByCategories = require('../data/productsOfCategory');
var RNFS=require('react-native-fs');

function readBOMfromFile(fileName, callback) {
  var path = RNFS.DocumentDirectoryPath+'/'+fileName;
  RNFS.readFile(path, 'utf8')
    .then((contents) => {
      
      callback(contents);
      // return contents;
    })
    .catch((err) => {
      ToastAndroid.show("read error:"+err, ToastAndroid.SHORT);
    });
}

export default class bomPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      segment: '',
      application: '',
      platform: '',
      productCategories: '',
      chipsSelected: []
    }
  }
  componentDidMount() {
    var self = this;
    readBOMfromFile(this.props.fileName, function(contents){
      var bom = JSON.parse(contents);

      self.setState({
        segment: bom.segment,
        application: bom.application,
        platform: bom.platform,
        productCategories: bom.productCategories,
        chipsSelected: bom.chips
      })
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.head}>
          <View style={styles.descContainer}>
            <Text  style={styles.lable}>Segment: </Text>
            <Text>{this.state.segment}</Text>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.lable}>Application: </Text>
            <Text>{this.state.application}</Text>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.lable}>Platform: </Text>
            <Text>{this.state.platform}</Text>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.lable}>Product Categories: </Text>
            <Text>{this.state.productCategories}</Text>
          </View>
        </View>
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
    }
  });
