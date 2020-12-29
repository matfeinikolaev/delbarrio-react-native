import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class OrderSummaryScreen extends Component {
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

  }

  render () {
    const { store, products, isLoading, chunk, cart, checkoutData } = this.state;

    return (
      <View style={styles.container}>
        <Text>
          Order Summary
        </Text>
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
