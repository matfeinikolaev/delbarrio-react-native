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
      <Text h1>DELBARRIO</Text>
      <Text h3>¿Que necesitas?</Text>
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
