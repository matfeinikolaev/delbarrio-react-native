import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class CartScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      store: [],
      products: [],
      isLoading: true,
      chunk: 0,
      cart: {}
    };
  }

  componentDidMount() {
    var url = 'https://delbarrio.ec/' + this.props.route.params.store.path + 'wp-admin/admin-ajax.php?action=mstoreapp-cart';
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/json; charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: body // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(Object.values(json.cart_contents));
        this.setState({cart: Object.values(json.cart_contents)});
      })
      .catch((error) => console.error(error))
      .finally(() => { 
          this.setState({ isLoading: false });
      });
  }

  getUser() {

  }

  checkout() {
    if (!AsyncStorage.getItem("user")) {
      this.props.navigation.navigate("Account", { origin: "CartScreen" });
    }
    else this.props.navigation.navigate("CheckoutScreen", {cart: this.state.cart, path: this.props.route.params.store.path});
  }

  render() {
    const { store, products, isLoading, chunk, cart } = this.state;
    return (
      <View style={styles.container} >
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
          <View>
            <Image
              style={styles.logo}
              source={{
                uri: this.state.cart[0].thumb,
              }}
            />
            <Text>
              {this.state.cart[0].name}
            </Text>
            <Text>
              {this.state.cart[0].price}
            </Text>
            <Button
              title="Checkout"
              onPress={() => this.checkout()}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  text: {
    width: 100,
    height: 100
  },
  logo: {
    width: 100,
    height: 58,
    margin: 24,
    alignContent: "center",
    justifyContent: "center"
  },
  button: {
    alignContent: "flex-start",
    justifyContent: "flex-start"
  }
});
