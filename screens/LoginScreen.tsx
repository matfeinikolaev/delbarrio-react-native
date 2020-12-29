import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { StyleSheet, SectionList, Switch, TextInput, Document, AsyncStorage } from 'react-native';

import { ListItem, Divider, SearchBar, Icon, Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  onChangeText(text, field) {
    switch (field) {
      case "email" : this.state.email = text;
        break;
      case "pass" : this.state.password = text;
        break;
    }
  }

  submit() {
    var url = 'https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-login';
    var body = "username=" + this.state.email + "&password=" + this.state.password;
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/json; charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.errors) {
          console.log(json);
        }
        else if (json.data) {
          this.setUser(json.data);
          this.props.navigation.navigate("AccountScreen", {user: json.data});
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }

  signUp() {
    this.props.navigation.navigate("RegisterScreen");
  }

  async setUser(user) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "email")}
          editable
          placeholder="Email"
        />
        <TextInput
          id="input"
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "pass")}
          editable
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          placeholder="Password"
        />
        <Button
          onPress={()=>this.submit()}
          title="Login"
        />
        <Button
          onPress={()=>this.signUp()}
          title="Sign up"
        />
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
});
