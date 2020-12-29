import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class FinalScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      store: [],
      products: [],
      isLoading: true,
      chunk: 0,
      cart: {},
      checkoutData: {},
      orderReview: {},
      result: {},
    };
  }
  componentDidMount() {
    var url = 'https://delbarrio.ec/' + this.props.route.params.path + '/wp-admin/admin-ajax.php?action=mstoreapp-get_checkout_form';
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
        this.setState({checkoutData: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.updateOrder();
      });
  }
  updateOrder() {
    var url = 'https://delbarrio.ec/' + this.props.route.params.path + '/wp-admin/admin-ajax.php?action=mstoreapp-update_order_review';
    var body = JSON.stringify(this.state.checkoutData);
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/json; charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({orderReview: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  checkout() {
    this.props.navigation.navigate("FinalScreen", {checkoutData: this.state.checkoutData});
  }
  placeOrder() {
    var url = 'https://delbarrio.ec/' + this.props.route.params.path + '/index.php/checkout?wc-ajax=checkout';
    var body = JSON.stringify(this.state.checkoutData);
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/json; charset=UTF-8'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({result: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.handleOrder();
      });
  }

  handleOrder() {
    // if (this.state.result.result == "success") {
    //   console.log("Success");
      this.props.navigation.navigate("OrderSummaryScreen");
    // }
    // else if (this.state.result.result == "failure") {
    //   console.log("Failure");
    // }
  }

  render () {
    const { store, products, isLoading, chunk, cart, checkoutData } = this.state;

    return (
      <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
        <View>
          <Text>
          {checkoutData.billing_first_name}
          </Text>
          <Button title="Place Order"
            onPress={()=>this.placeOrder()}
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
