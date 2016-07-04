import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Platform
} from 'react-native';
import indexPage from './indexPage';

import Toast from 'react-native-root-toast';
var Button = require('react-native-button')
var usersDB = require('../data/usersDB')

class loginPage extends Component {
  constructor(props){
        super(props);
        this.state = {
          username: '',
          password: ''
        };
    }
  _openPage(e) {
    this.props.navigator.push({
      title: 'AEMC Sales Tool',
      component: indexPage
    })
  }  
  render() {
    return(
      <View style = { styles.parent } >
        <View style = {styles.login} >
          <TextInput 
            style = {{height: 40}}
            text = { this.state.username }
            placeholder = "user name" 
            onChangeText={(e) => {
              this.setState({username: e})
            }} />

          <TextInput
            style = {{height: 40}} 
            secureTextEntry={true}
            text = { this.state.password } 
            placeholder = "password"
            onChangeText={(e) => {
              this.setState({password: e})
            }} />
          <Button
            style={ styles.buttonStyle }
            containerStyle={styles.buttonContainer}
            onPress={this.handleButtonPress.bind(this)}
          >
            Login
          </Button>
        </View> 
        
        <View>
          <Text>{JSON.stringify(usersDB)}</Text>
        </View> 
        <View style={styles.test}>
          <TouchableOpacity style={styles.right} onPress={this._openPage.bind(this)}> 
            <Image style={styles.poke} source={require('../imgs/poke.png')} /> 
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  handleButtonPress(e) {
    if(this.state.username in usersDB) {
      if(usersDB[this.state.username]==this.state.password){
        if(Platform.OS === 'ios'){
          Toast.show('Login Success', {
            duration: Toast.durations.SHORT, 
            position: Toast.positions.BOTTOM 
          
          });
        }else
          ToastAndroid.show('Login Success', ToastAndroid.SHORT)

        this.props.navigator.push({
          title: 'Index',
          component: indexPage
        })
      }else{
        if(Platform.OS === 'ios'){
          Toast.show('Password Incorrect', {
            duration: Toast.durations.SHORT, 
            position: Toast.positions.BOTTOM 
          
          });
        }else
          ToastAndroid.show('Password Incorrect', ToastAndroid.SHORT)
      }
    } else {
      if(Platform.OS === 'ios'){
        Toast.show('User Not Found', {
          duration: Toast.durations.SHORT, 
          position: Toast.positions.BOTTOM 
        
        });
      }else
        ToastAndroid.show('User Not Found', ToastAndroid.SHORT)
    }
  }
};

var styles = StyleSheet.create({
  parent: {
      padding: 16,
      flex: 1
  },

  login: {
      flex: 5
  },

  test: {
    flex: 1,
    alignSelf: 'flex-end'
  },

  buttonContainer: {
    padding:10, 
    height:45, 
    overflow:'hidden', 
    borderRadius:4, 
    backgroundColor: '#55ACEE'
  },

  buttonStyle: {
    fontSize: 20, 
    color: 'white'
  },
  poke: {
    marginTop: 10,
    marginBottom: 10,
    width: 60,
    height: 60
  }
});

export default loginPage;