import * as React from 'react';
import { useEffect, useState }  from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, SafeAreaView, ToastAndroid, Image, ListItem, Avatar, TouchableOpacity, AsyncStorage } from 'react-native';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";
import Data from '../data/data';

async function getUser() {
  let user = await AsyncStorage.getItem("user");
  console.log(user);
}

export default function HomeScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-get_store_categories')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const storeClicked = (item) => {
    ToastAndroid.show(item.name + " clicked", ToastAndroid.SHORT);
    props.navigation.navigate("StoresScreen", {store: item});
  }

  return (
    <View style={styles.container} >
      <Text h1 style={styles.heading1}>DELBARRIO</Text>
      <Text h3 style={styles.heading2}>¿Que necesitas?</Text>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : (

        <FlatList
          data={data}
          keyExtractor={({ term_id }, index) => term_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => storeClicked(item)} style={styles.text}>
              <Image
                style={styles.logo}
                source={{
                  uri: item.icon.url,
                }}
              />
            </TouchableOpacity>
          )}
        />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 70,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  heading1: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#687e95",
  },
  heading2: {
    fontSize: 15,
    fontWeight: "normal",
    fontFamily: "Roboto",
    color: "#687e95",
    marginBottom: 30
  },
  text: {
    justifyContent: "center",
    alignItems: 'center',
    width: 300,
    height: 120
  },
  logo: {
    width: 200,
    height: 58,
  },
});
