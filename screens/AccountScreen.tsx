import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { StyleSheet, SectionList, Switch, AsyncStorage } from 'react-native';

import { ListItem, Divider, SearchBar, Icon, Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';

const sections = [
  {
    data: [
      {
        title: 'Airplane Mode',
        icon: 'ios-airplane',
        hideChevron: true,
        checkbox: true,
      },
      {
        title: 'Wi-Fi',
        icon: 'ios-wifi',
      },
      {
        title: 'Bluetooth',
        icon: 'ios-bluetooth',
        rightTitle: 'Off',
      },
      {
        title: 'Cellular',
        icon: 'ios-phone-portrait',
      },
      {
        title: 'Personal Hotspot',
        icon: 'ios-radio',
        rightTitle: 'Off',
      },
    ],
  }
]

export default class AccountScreen extends Component {
  constructor (props) {
    super(props);
    console.log(props);
    if (props.route.params != undefined) {
      if (props.route.params.user) {
        this.state = {
          user: props.route.params.user,
        };
      }
    } else {
      this.state = {
        user: {},
      };
    }
  }

  login() {
    this.props.navigation.navigate("LoginScreen");
  }
  register() {
    this.props.navigation.navigate("RegisterScreen");
  }
  google() {
    console.log(this.state);
  }
  async getUser() {
    var user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    this.setState({user: user});
  }
  facebook() {
  }
  async removeUser() {
    await AsyncStorage.removeItem("user");
  }
  componentDidMount() {
    if (this.state.user == {} || this.state.user == null || this.state.user == undefined || !this.state.user) {
      this.getUser();
    }
  }
  exit() {
    var url = 'https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-logout';
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/json; charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((json) => {
          this.removeUser();
          this.state.user = null;
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }
  render () {
    if (this.props.route.params != undefined) {
      if ( Object.values(this.props.route.params.user).length > 0 ) {
        console.log(this.state.user);
        console.log(this.props.route.params);
        // this.setState({user: this.props.route.params.user }) 
      }
    }
    return (
      <View style={styles.container}>
        {this.state.user != {} && this.state.user != null ?
          (<View>
            <Text>
              {this.state.user.display_name}
            </Text>
            <Button style={styles.button}
              onPress={()=>this.exit()}
              title="Exit"
            />
          </View>)
          :
          (<View>
            <Button style={styles.button}
              onPress={()=>this.login()}
              title="Login"
            />
            <Button style={styles.button}
              onPress={()=>this.register()}
              title="Register"
            />
            <Button style={styles.button}
              onPress={()=>this.google()}
              title="Google"
            />
            <Button style={styles.button}
              onPress={()=>this.facebook()}
              title="Facebook"
            />
          </View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    marginTop: 100,
    padding: 100,
    marginVertical: 100
  },
});
