import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native';
import indexPage from './indexPage';

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
    
      var layout =
          <View style = { styles.parent } >
            <View style = {styles.login} >
              <TextInput 
                text = { this.state.username }
                placeholder = "user name" 
                onChangeText={(e) => {
                  this.setState({username: e})
                }} />
   
              <TextInput 
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
      ;
      return layout;
  }
  handleButtonPress(e) {
      console.log('I was pressed');
      
      if(this.state.username in usersDB) {
        if(usersDB[this.state.username]==this.state.password){
          ToastAndroid.show('Login Success', ToastAndroid.SHORT)
          this.props.navigator.push({
            title: 'Index',
            component: indexPage
          })
        }else{
          ToastAndroid.show('Password Incorrect', ToastAndroid.SHORT)
        }
      } else {
        ToastAndroid.show('User Not Found', ToastAndroid.SHORT)
      }


  }
};

var styles = StyleSheet.create({
 
    // For the container View
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

export default loginPage;