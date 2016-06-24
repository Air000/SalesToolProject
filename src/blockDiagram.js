import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ListView,
  ScollView,
  ToastAndroid
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

var AutomotiveImg1 = require('../imgs/Adas_Box.png');
var AutomotiveImg2 = require('../imgs/Adas_Evk.png');
var UsbTypeC = require('../imgs/UsbTypeC.png');
var PowerBankTypeC = require('../imgs/PowerBankTypeC.png');
const SECTIONS = [
  {
    title: 'Automotive',
    content: [AutomotiveImg1, AutomotiveImg2],
  },
  {
    title: 'Type C Docking',
    content: [UsbTypeC, PowerBankTypeC, UsbTypeC],
  }
];
class blockDiagram extends Component {
  constructor(props){
      super(props);
      // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      // this.state = {
      //   dataSource: ds.cloneWithRows(SECTIONS[0].content)
      // };
  }
   
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView style={{flex: 1, height:400}}
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(section.content)} 
        renderRow={(rowData) => {
          return (
            <Image style={{width:300, height: 200, resizeMode:'stretch', alignSelf:'center', marginBottom: 10}} source={rowData}/>
          )
        }
      } />
    );
  }

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent} />
    );
  }
};
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
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
});

export default blockDiagram;