import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import StoresScreen from '../screens/StoresScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import FinalScreen from '../screens/FinalScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';

import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddressScreen from '../screens/AddressScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { BottomTabParamList, HomeParamList, AccountParamList, StoresParamList, StoreParamList, ProductParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />, title: "Home"
        }}
      />
      <BottomTab.Screen
        name="AccountTab"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />, title: "Account"
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="StoresScreen"
          component={StoresScreen}
          options={{ headerShown: true, title: "Stores" }}
        />
        <HomeStack.Screen
          name="StoreScreen"
          component={StoreScreen}
          options={{ headerShown: true, title: "" }}
        />
        <HomeStack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{ headerShown: true }}
        />
        <HomeStack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ headerShown: true, title: "Cart" }}
        />
        <HomeStack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{ headerShown: true }}
        />
        <HomeStack.Screen
          name="FinalScreen"
          component={FinalScreen}
          options={{ headerShown: true }}
        />
        <HomeStack.Screen
          name="OrderSummaryScreen"
          component={OrderSummaryScreen}
          options={{ headerShown: true }}
        />
      </HomeStack.Navigator>
  );
}

const AccountStack = createStackNavigator<AccountParamList>();

function AccountNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
      <AccountStack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{ headerShown: true }}
      />
      <AccountStack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ headerShown: true }}
      />
    </AccountStack.Navigator>
  );
}
