import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import ProductDetails from './src/pages/ProductDetails';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" />
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
