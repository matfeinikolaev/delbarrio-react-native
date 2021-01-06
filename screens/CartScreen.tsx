import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Card, CardItem, Body, Left, Right, Thumbnail  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        this.setState({whole_cart: json});
        this.setState({totals: json.cart_totals});
        this.setState({cart: Object.values(json.cart_contents)});
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }

  getUser() {

  }

  addToCart(item) {
    var url = 'https://delbarrio.ec/' + this.props.route.params.store.path + 'wp-admin/admin-ajax.php?action=mstoreapp-update-cart-item-qty';
    var quantity = item.quantity + 1;
    var body = "key=" + item.key + "&quantity=" + quantity + "&update_cart='Update Cart'&_wpnonce=" + this.state.whole_cart.cart_nonce;
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
        this.setState({whole_cart: json});
        this.setState({totals: json.cart_totals});
        this.setState({cart: Object.values(json.cart_contents)});
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }

  removeFromCart(item) {
    var url = 'https://delbarrio.ec/' + this.props.route.params.store.path + 'wp-admin/admin-ajax.php?action=mstoreapp-update-cart-item-qty';
    var quantity = item.quantity - 1;
    var body = "key=" + item.key + "&quantity=" + quantity + "&update_cart='Update Cart'&_wpnonce=" + this.state.whole_cart.cart_nonce;
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
        this.setState({whole_cart: json});
        this.setState({totals: json.cart_totals});
        this.setState({cart: Object.values(json.cart_contents)});
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }

  deleteFromCart(item) {
    var url = 'https://delbarrio.ec/' + this.props.route.params.store.path + 'wp-admin/admin-ajax.php?action=mstoreapp-update-cart-item-qty';
    var quantity = 0;
    var body = "key=" + item.key + "&quantity=" + quantity + "&update_cart='Update Cart'&_wpnonce=" + this.state.whole_cart.cart_nonce;
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
        this.setState({whole_cart: json});
        this.setState({totals: json.cart_totals});
        this.setState({cart: Object.values(json.cart_contents)});
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }

  checkout() {
    if (!AsyncStorage.getItem("user")) {
      this.props.navigation.navigate("Account", { origin: "CartScreen" });
    }
    else this.props.navigation.navigate("CheckoutScreen", {cart: this.state.cart, path: this.props.route.params.store.path});
  }

  render() {
    const { store, products, isLoading, chunk, cart, totals } = this.state;
    return (
      <View style={styles.container} >
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
          <>
          {cart.length ? (
            <>
            <FlatList
              data={cart}
              keyExtractor={({ key }, index) => key}
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: item.thumb}} />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note style={{color: "grey"}}>${item.line_total} x {item.quantity}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button
                        onPress={()=>this.removeFromCart(item)}
                        icon={
                        <Icon
                          name="minus-circle"
                          size={15}
                          color="white"
                        />}
                      />
                      <Text>{item.quantity}</Text>
                      <Button
                        onPress={()=>this.addToCart(item)}
                        icon={
                        <Icon
                          name="plus-circle"
                          size={15}
                          color="white"
                        />}
                      />
                    </Left>

                    <Right>
                      <Button
                        onPress={()=>this.deleteFromCart(item)}
                        icon={
                        <Icon
                          name="trash"
                          size={15}
                          color="white"
                        />}
                      />
                    </Right>
                  </CardItem>
                </Card>
              )}
            />
            <FlatList
              data={[
                {key: "Subtotal", value: totals.total},
              ]}
              renderItem={({item}) =>
                <View style={{flexDirection:"row"}}>
                  <Text style={styles.item}>{item.key}</Text>
                  <Text style={{alignSelf: "flex-end"}}>${item.value}</Text>
                </View>
              }
            />
            <Button
              title="Checkout"
              onPress={() => this.checkout()}
            />
            </>
          ) : (
            <View>
              <Text>
                Sorry, there are no items in your cart
              </Text>
            </View>
          )}

          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


/*          <View>
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
          */
