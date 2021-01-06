import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { StyleSheet, SectionList, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Divider, SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';

const sections = [
  {
    data: [
      {
        title: 'Airplane Mode',
        icon: 'ios-airplane',
        hideChevron: true,
        checkbox: true,
      },
      {
        title: 'Wi-Fi',
        icon: 'ios-wifi',
      },
      {
        title: 'Bluetooth',
        icon: 'ios-bluetooth',
        rightTitle: 'Off',
      },
      {
        title: 'Cellular',
        icon: 'ios-phone-portrait',
      },
      {
        title: 'Personal Hotspot',
        icon: 'ios-radio',
        rightTitle: 'Off',
      },
    ],
  }
]

export default class AccountScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
    this.getUser();
  }

  login() {
    this.props.navigation.navigate("LoginScreen");
  }
  register() {
    this.props.navigation.navigate("RegisterScreen");
  }
  google() {
    console.log(this.state);
  }
  async getUser() {
    var user = await AsyncStorage.getItem("user");
    if (user != null) {
      user = JSON.parse(user);
      this.setState({user: user});
    } else this.setState({user: false});
  }
  facebook() {
  }
  async removeUser() {
    await AsyncStorage.removeItem("user");
  }
  componentDidMount() {
    this.getUser();
  }
  exit() {
    var url = 'https://delbarrio.ec/wp-admin/admin-ajax.php?action=mstoreapp-logout';
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
          this.removeUser();
          this.state.user = null;
      })
      .catch((error) => console.error(error))
      .finally(() => {
          this.setState({ isLoading: false });
      });
  }
  render () {
    return (
      <View style={styles.container}>
        {this.state.user ?
          (<Container>
            <Header />
            <Content>
              <ListItem icon onPress={()=>this.props.navigation.navigate("AddressScreen")}>
                <Left>
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="airplane" />
                  </Button>
                </Left>
                <Body>
                  <Text>Address</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>this.props.navigation.navigate("OrdersScreen")}>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="wifi" />
                  </Button>
                </Left>
                <Body>
                  <Text>Orders</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "green" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Connect us on Whatsapp</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>this.props.navigation.navigate("SettingsScreen")}>
                <Left>
                  <Button style={{ backgroundColor: "orange" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Settings</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon onPress={()=>this.exit()}>
                <Left>
                  <Button style={{ backgroundColor: "red" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Exit</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
            </Content>
          </Container>)
          :
          (
          <Container>
            <Header />
            <Content>
              <Button onPress={()=>this.login()} info style={{alignSelf: "center", marginBottom: 20, marginTop: 20, padding: 20}}><Text>Login</Text></Button>
              <Button onPress={()=>this.register()} info style={{alignSelf: "center", marginBottom: 20, padding: 20}}><Text>Register</Text></Button>
              <Button onPress={()=>this.google()} danger style={{alignSelf: "center", marginBottom: 20, padding: 20}}><Text>Google</Text></Button>
              <Button onPress={()=>this.facebook()} style={{alignSelf: "center", marginBottom: 20, padding: 20}}><Text>Facebook</Text></Button>
            </Content>
          </Container>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    marginTop: 100,
    padding: 100,
    marginVertical: 100
  },
});

// <View>
//   <Button style={styles.button}
//     onPress={()=>this.login()}
//     title="Login"
//   />
//   <Button style={styles.button}
//     onPress={()=>this.register()}
//     title="Register"
//   />
//   <Button style={styles.button}
//     onPress={()=>this.google()}
//     title="Google"
//   />
//   <Button style={styles.button}
//     onPress={()=>this.facebook()}
//     title="Facebook"
//   />
// </View>
