import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class StoreScreen extends Component {

  constructor (props) {
    super(props);
    this.props.navigation.setOptions({title: this.props.route.params.store_name});
    this.props.navigation.setOptions({headerRight: () => (
      <Button
        onPress={() => {this.getCart()}}
        icon={
        <Icon
          name="shopping-cart"
          size={15}
          color="white"
        />}
        title=""

        buttonStyle={{marginRight: 10, backgroundColor: "blue", borderRadius: 10, width: 50}}
        color="red"
      />
    )});
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
        ToastAndroid.show("Item was added to cart", ToastAndroid.SHORT);
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
      <>
      <View style={{flexDirection: "row", width: "100%"}}>
        <Button title="<" buttonStyle={{alignSelf: 'flex-start'}} onPress = {() => this.switchProductsChunk("back")}/>
        <Button title=">" buttonStyle={{alignSelf: 'flex-end' }} onPress = {() => this.switchProductsChunk("forward")}/>
      </View>
      <View style={styles.container} >
      {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
        <FlatList
          style={{width: "100%"}}
          data={this.state.products[this.state.chunk]}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity onPress = {() => this.getProduct(item)}>
                <CardItem>
                  <Image source={{uri: item.images[0].src}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>
                       {item.name}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Text>
                    {item.price}
                  </Text>
                </CardItem>

              </TouchableOpacity>
              <CardItem style={{width: "100%"}}>
                <Button
                  onPress = {() => this.addToCart(item)}
                  title="Add to Cart"
                />
              </CardItem>
            </Card>
          )}
          />
    )}
      </View>
      </>
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
  card: {
    backgroundColor: "red"
  },
  touch: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    width: 100,
    height: 100
  },
  logo: {
    width: 140,
    height: 210,
    margin: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignContent: "flex-start",
    justifyContent: "flex-start"
  }
});


// {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
//   <View>
//     <Button
//       title="Cart"
//       onPress = {() => this.getCart()}
//     />
//     <View style={{ paddingLeft: 20, width: 100, height: 20 }}>
//       <Button
//         icon={{
//           name: "arrow-back",
//           size: 15,
//           color: "white"
//         }}
//         style="alignContent: flex-start"
//         onPress = {() => this.switchProductsChunk("back")}
//         title=""
//       />
//     </View>
//     <View style={{ paddingLeft: 50, width: 100, height: 20 }}>
//       <Button
//         icon={{
//           name: "arrow-forward",
//           size: 15,
//           color: "white"
//         }}
//         onPress = {() => this.switchProductsChunk("forward")}
//         title=""
//       />
//     </View>
//     <FlatList
//       data={this.state.products[this.state.chunk]}
//       keyExtractor={({ id }, index) => id}
//       renderItem={({ item }) => (
//           <Card>
//             <TouchableOpacity onPress = {() => this.getProduct(item)} style={styles.touch} >
//               <Card.Title>
//                 {item.name}
//               </Card.Title>
//               <Card.Divider/>
//               <Card.Image
//                 style={styles.logo}
//                 source={{
//                 uri: item.images[0].src
//               }} />
//               <Text>
//                 {item.price}
//               </Text>
//             </TouchableOpacity>
//             <Button
//               onPress = {() => this.addToCart(item)}
//               title="Add to Cart"
//               />
//           </Card>
//       )}
//     />
//   </View>
// )}
