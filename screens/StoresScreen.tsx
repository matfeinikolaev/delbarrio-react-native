import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";

export default class StoresScreen extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    var body = "categories=" + this.props.route.params.store.term_id + "&lat=0&lng=0&radius=1000000000000000";
    fetch('https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-get_stores', {
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
        var storesFormatted = [];
        for (let i in json.stores) {
          storesFormatted.push(json.stores[i]);
        }
        this.setState({data: storesFormatted});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  storeClicked(item) {
    ToastAndroid.show(item.title + " clicked", ToastAndroid.SHORT);
    this.props.navigation.navigate("StoreScreen", { store_id: item.id });
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      <View style={styles.container} >
        {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.storeClicked(item)}>
                <Card pointerEvents="none">
                  <Text>
                  {item.title}
                  </Text>
                </Card>
              </TouchableOpacity>
            )}
          />
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
});
