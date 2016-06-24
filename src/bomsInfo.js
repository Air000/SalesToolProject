import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import bomPage from './bomPage';

var RNFS=require('react-native-fs');
var BOM_PATH = RNFS.DocumentDirectoryPath +'/'+'boms';
function getFilesList(callback){
  RNFS.readdir(BOM_PATH)
    .then((files) => {
      console.log(files);
      callback(files);
    })
    .catch((err) => {
      console.log('readdir error: '+err);
    });
}

function readBOMfromFile(fileName, callback) {
  var path = BOM_PATH+'/'+fileName;
  RNFS.readFile(path, 'utf8')
    .then((contents) => {
      
      callback(contents);
    })
    .catch((err) => {
      console.log("read error:"+err);
    });
}

export default class bomsInfo extends Component {
  constructor(props) {
    super(props);
    this._updateFileList=this._updateFileList.bind(this);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      files: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    this._updateFileList();
  }
  _updateFileList(){
    // ToastAndroid.show('_updateFileList',ToastAndroid.SHORT);
    var self=this;
    getFilesList(function(files){
      self.setState({
        files: self.state.files.cloneWithRows(files)
      })
    })
  }
  _deleteBom(fileName){
    var index=this.state.files.indexOf(fileName);
    this.state.files.splice(index, 1);
    this.setState({
      
      files: this.state.files.cloneWithRows(this.state.files)
    })
  }
  _onOpenBomDetail(fileName){
    this.props.navigator.push({
      title: 'BOM',
      component: bomPage,
      params: {
        fileName: fileName,
        _updateFileList: this._updateFileList
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
      <ListView 
        style={{padding: 10, marginHorizontal: 20, marginVertical: 10}}
        enableEmptySections={true}
        dataSource={this.state.files} 
        renderRow={(file) => (
          <TouchableOpacity
            onPress={()=>this._onOpenBomDetail(file)}
            style={{flex: 1, backgroundColor:'#c7effb',  borderRadius: 5, marginBottom: 5 }}>
            <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center'}}>{file.split('.')[0].replace(/_/g,' ')}</Text>
          </TouchableOpacity>
          )} />
      </View>
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
