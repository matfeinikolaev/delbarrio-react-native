import React, { Component } from 'react';
import { useEffect, useState }  from 'react';
import { StyleSheet, SectionList, AsyncStorage, TouchableOpacity } from 'react-native';
import { Divider, SearchBar } from 'react-native-elements';
import { Text, View } from '../components/Themed';

export default class SettingsScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>
          Settings
        </Text>
      </View>
    )
  }
}
