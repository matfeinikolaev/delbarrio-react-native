import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class StoreScreen extends Component {

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
    var body = "store_id=" + this.props.route.params.store_id;
    fetch('https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-store', {
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
        var storeFormatted = [];
        storeFormatted.push(json);
        this.setState({store: storeFormatted});
        console.log(this.state.store);
        // this.props.navigation.setOptions({title: this.state.store[0].post_title});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.getProducts();
          // this.setState({ isLoading: false });
      });
  }

  getProducts() {
    var path = this.state.store[0].path;
    var body = "";
    var url = 'https://delbarrio.ec/' + path + 'wp-admin/admin-ajax.php?action=mstoreapp-products';
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
        this.setState({products: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  switchProductsChunk (dir) {
    this.setState({ isLoading: true });
    switch (dir) {
      case "back":
        if (this.state.chunk > 0 ) this.state.chunk--;
        break;

      case "forward":
        this.state.chunk++;
        break;

      default:
        break;
    }
    this.setState({ isLoading: false });
  }

  getProduct (product) {
    ToastAndroid.show(product.name + " clicked", ToastAndroid.SHORT);
    this.props.navigation.navigate("ProductScreen", {store: this.state.store[0], product: product});
  }

  addToCart (product) {
    var path = this.state.store[0].path;
    var body = "product_id=" + product.id + "&quantity=1";
    var url = 'https://delbarrio.ec/' + path + 'wp-admin/admin-ajax.php?action=mstoreapp-add_to_cart';
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
        this.setState({cart: Object.values(json.cart)});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getCart() {
    this.props.navigation.navigate("CartScreen", {store: this.state.store[0]});
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      <View style={styles.container} >
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
          <View>
            <Button
              title="Cart"
              onPress = {() => this.getCart()}
            />
            <View style={{ paddingLeft: 20, width: 100, height: 20 }}>
              <Button
                icon={{
                  name: "arrow-back",
                  size: 15,
                  color: "white"
                }}
                style="alignContent: flex-start"
                onPress = {() => this.switchProductsChunk("back")}
                title=""
              />
            </View>
            <View style={{ paddingLeft: 50, width: 100, height: 20 }}>
              <Button
                icon={{
                  name: "arrow-forward",
                  size: 15,
                  color: "white"
                }}
                onPress = {() => this.switchProductsChunk("forward")}
                title=""
              />
            </View>
            <FlatList
              data={this.state.products[this.state.chunk]}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                  <Card>
                    <TouchableOpacity onPress = {() => this.getProduct(item)} >
                      <Card.Title>
                        {item.name}
                      </Card.Title>
                      <Card.Divider/>
                      <Card.Image
                        style={styles.logo}
                        source={{
                        uri: item.images[0].src
                      }} />
                      <Text>
                        {item.price}
                      </Text>
                    </TouchableOpacity>
                    <Button
                      onPress = {() => this.addToCart(item)}
                      title="Add to Cart"
                      />
                  </Card>
              )}
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
