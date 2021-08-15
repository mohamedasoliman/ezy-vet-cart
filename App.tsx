import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, Store, combineReducers, Reducer } from 'redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
//For store state persistence
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

import { CartState } from './src/models/productAddedModel';
import rootReducer from './src/redux/combineReducers';
import ProductList from './src/components/Home';
import Cart from './src/components/Cart';

//Configure app's store
const persisConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persisConfig, rootReducer);

function configureStore() {
  const store = createStore<CartState>(
    persistedReducer,
  );
  return store;
}

const store = configureStore();

const persistedStore = persistStore(store)

//Navigation
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={ProductList}
        options={{
          title: 'Product List',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}

function CheckOutScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checkoutscreen"
        component={Cart}
        options={{
          title: 'Checkout',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}

//App
export default function App() {
  return (
    <Provider store={store as any}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              style: {
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                justifyContent: 'center'
              },
              
              tabStyle: {
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          >
            <Tab.Screen name="Product List" component={HomeScreen} />
            <Tab.Screen name="Checkout" component={CheckOutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#336699',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
