import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { StyleSheet, SectionList, Switch, TextInput, Document } from 'react-native';

import { ListItem, Divider, SearchBar, Icon, Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: ""
    }
  }

  onChangeText(text, field) {
    switch (field) {
      case "email" : this.state.email = text;
        break;
      case "first_name" : this.state.first_name = text;
        break;
      case "last_name" : this.state.last_name = text;
        break;
      case "phone" : this.state.phone = text;
        break;
      case "pass" : this.state.password = text;
        break;
    }
  }

  submit() {
    console.log(this.state);
    var url = 'https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-create-user';
    var body = "first_name=" + this.state.first_name + "&last_name=" + this.state.last_name + "&phone=" + this.state.phone + "&email=" + this.state.email + "&password=" + this.state.password;
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
          console.log("Error");
        }
        else if (json.data) {
          console.log("Success");
        }
        console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }

  login() {
    this.props.navigation.navigate("LoginScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "first_name")}
          editable
          placeholder="First name"
        />
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "last_name")}
          editable
          placeholder="Last name"
        />
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "phone")}
          editable
          placeholder="Phone"
        />
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
          title="Sign up"
        />
        <Button
          onPress={()=>this.login()}
          title="Log in"
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
