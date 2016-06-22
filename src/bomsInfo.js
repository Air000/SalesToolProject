import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

var RNFS=require('react-native-fs');

function testRNFS() {
  console.log(RNFS.DocumentDirectoryPath);
  // get a list of files and directories in the main bundle
  RNFS.readDir(RNFS.MainBundlePath)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log('contents:', contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });

   var path = RNFS.DocumentDirectoryPath + '/test.txt'; 
  // write the file
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log(path);
    })
    .catch((err) => {
      console.log('err2:',err.message);
    });  
  RNFS.readFile(path, 'utf8')
    .then((contents) => {
      console.log(contents, "=contents2");
    })
    .catch((err) => {
      console.log('err', err);
    });  
}

function getFilesList(){
  RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
      console.log(result);
      ToastAndroid.show('GOT RESULT'+JSON.stringify(result) , ToastAndroid.SHORT);
      // stat the first file
      return result;
    })
    .catch((err) => {
      ToastAndroid.show('readDir error', ToastAndroid.SHORT);
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

export default class bomsInfo extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      files: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.setState({
    //   files: ds.cloneWithRows(getFilesList())
    // });
    getFilesList()
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView 
          enableEmptySections={true}
          dataSource={this.state.files} 
          renderRow={(rowData) => <Text>{rowData}</Text>} />
      </View>
    );
  }
}
