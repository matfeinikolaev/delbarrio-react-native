import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class ProductScreen extends Component {
  constructor (props) {
    super(props);

    this.state = {
      store: this.props.route.params.store,
      product: this.props.route.params.product,
      isLoading: true,
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <View>
      <Card pointerEvents="none">
        <Card.Title>
          {this.state.product.name}
        </Card.Title>
        <Card.Divider/>
        <Card.Image
          style={styles.logo}
          source={{
          uri: this.state.product.images[0].src
        }} />
        <Text>
          {this.state.product.price}
        </Text>
        <Button
          title="Add to Cart"
          />
      </Card>
      </View>
    )
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
});
