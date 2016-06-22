import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';

var RNFS=require('react-native-fs');

function readBOMfromFile(fileName, callback) {
  var path = RNFS.DocumentDirectoryPath + fileName;
  RNFS.readFile(path, 'utf8')
    .then((contents) => {
      
      callback(contents);
      // return contents;
    })
    .catch((err) => {
      ToastAndroid.show("write error", ToastAndroid.SHORT);
    });
}

export default class bomPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      bomContents: ''
    }
  }
  componentDidMount() {
    
    readBOMfromFile(this.props.fileName, function(contents){
      ToastAndroid.show(contents, ToastAndroid.LONG);
        this.setState({
        bomContents: contents
      })
    });
    
    
  }
  render() {
    return (
      <View >
        <Text>{this.state.bomContents}</Text>
      </View>
    );
  }
}
