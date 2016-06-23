import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScollView,
  ListView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

var ChipsDBByCategories = require('../data/productsOfCategory');
var RNFS=require('react-native-fs');
var BOM_PATH = RNFS.DocumentDirectoryPath +'/'+'boms';

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
function deleteFile(fileName){
  var path = BOM_PATH +'/'+ fileName;

  return RNFS.unlink(path)

    .spread((success, path) => {
      console.log("FILE DELETED:"+success+path);
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log("delete error:"+err);
    });
}
///////////////////////////////////////////////////////////////////////////////
//following function will parse selected chips array to format (sorted by pn):
//[
//     {pn1: {category:'', brand:'', description:''}},
//     {pn2: {category:'', brand:'', description:''}},
//     {pn2: {category:'', brand:'', description:''}}
// ]
///////////////////////////////////////////////////////////////////////////////
function parseSelectedChipsDetail(selectedPns){
  var chipsDetail={};
    selectedPns.chips.forEach(function(selectedChip){
      var chipInfo = {};
      var isChipFound = false;
      for(var i=0; i<ChipsDBByCategories.length; i++){
        var products = ChipsDBByCategories[i].products;
        for(var j=0; j<products.length; j++) {
          var chips = products[j].chips;
          var findedChip = chips.filter(function(chip){
            return chip.pn == selectedChip;
          });
          if(findedChip.length>0){
            isChipFound = true;
            // chipInfo[selectedChip]={
            chipsDetail[selectedChip]={
              category: ChipsDBByCategories[i].category,
              brand: products[j].brand,
              description: findedChip[0].description
            }

            break; 
          }
        }
        if(isChipFound) break;
      }
      // chipsDetail.push(chipInfo);
    })
  return chipsDetail;  
}

function selectedChipsSortedByCategories(sortedByPn, pns){
  var sortedByCategories={};
  var categories = [];
  for(var pn in sortedByPn) {
    // console.log('aa', pn, sortedByPn[pn]);
    if(categories.indexOf(sortedByPn[pn].category)<0)
      categories.push(sortedByPn[pn].category);
  }
  // console.log(categories);
  categories.forEach(function(cate){
    var chipsOfCategory = [];
    pns.forEach(function(pn){
      if(sortedByPn[pn].category==cate)
        chipsOfCategory.push({
          pn: pn,
          brand: sortedByPn[pn].brand,
          description: sortedByPn[pn].description
        })
    });
    sortedByCategories[cate]=chipsOfCategory;
  })
  console.log('sortedByCategories:', sortedByCategories, 'categories:', categories);
  return {sortedByCategories, categories};
}

export default class bomPage extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state={
      segment: '',
      application: '',
      platform: '',
      productCategories: '',
      chipsSelected: {},
      dataSource: ds.cloneWithRowsAndSections({}, [])
    }

  }
  componentDidMount() {
    var ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var self = this;
    readBOMfromFile(this.props.fileName, function(contents){
      var bom = JSON.parse(contents);

      var {sortedByCategories, categories} = selectedChipsSortedByCategories(parseSelectedChipsDetail(bom), bom.chips);
      // console.log(selectedChipsSortedByCategories(parseSelectedChipsDetail(bom), bom.chips));
      self.setState({
        segment: bom.segment,
        application: bom.application,
        platform: bom.platform,
        productCategories: bom.productCategories,
        dataSource: ds.cloneWithRowsAndSections(sortedByCategories, categories)
      })
    });
  }
  renderSectionHeader(data, sectionId) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{sectionId}</Text>
        <View style={styles.sectionHeaderIndicators}>
          <View style={[{flex: 1}, styles.sectionHeaderIndicator]}>
            <Text style={styles.sectionHeaderIndicatorText}>Brand</Text>
          </View>
          <View style={[{flex: 2}, styles.sectionHeaderIndicator]}>
            <Text style={styles.sectionHeaderIndicatorText}>Suggested PN</Text>
          </View>
          <View style={[{flex: 3}, styles.sectionHeaderIndicator]}>
            <Text style={styles.sectionHeaderIndicatorText}>Description</Text>
          </View>
        </View>
      </View>
    );
  }
  renderRow(rowData) {
    return (
      <View style={styles.wrapper}>
        <View style={[{flex: 1}, styles.rowView]}>
          <Text style={styles.text}>{rowData.brand}</Text>
        </View>
        <View style={[{flex: 2}, styles.rowView]}>
          <Text style={styles.text}>{rowData.pn}</Text>
        </View>
        <View style={[{flex: 3}, styles.rowView]}>
          <Text style={styles.text}>{rowData.description}</Text>
        </View>
      </View>
    )
  }
  _onDeleteBom(){
    deleteFile(this.props.fileName);
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
        <ListView
          ref="listView"
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}/>
        <TouchableOpacity
          onPress={()=>this._onDeleteBom.bind(this)}
          style={{flex: 1}}>
          <Text style={{fontSize: 15, textAlign:'center'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

  var styles = StyleSheet.create({
    head: {
      borderTopColor: 'black',
      borderTopWidth: 1
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    rowView: {
      borderWidth: .3, 
      borderColor:'#6b6b6b'
    },
    text: {
      fontSize: 15,
      color: 'black',
      textAlign: 'center',
    },
    sectionHeader: {
      backgroundColor: '#d29c1b'
    },
    sectionHeaderText: {
      textAlign: 'center',
      fontFamily: 'AvenirNext-Medium',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      paddingLeft: 10
    },
    sectionHeaderIndicators: {
      flex: 1,
      flexDirection: 'row'
    },
    sectionHeaderIndicator: {
      borderWidth: .3, 
      borderColor:'#6b6b6b'
    },
    sectionHeaderIndicatorText: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
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
