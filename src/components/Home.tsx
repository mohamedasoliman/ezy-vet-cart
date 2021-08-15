// import { StatusBar } from 'expo-status-bar';
import React, { useState, Dispatch } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import { Product } from '../../src/models/productModel'
import { CartState } from '../../src/models/productAddedModel'
import { UserInteraction } from '../services/interactionsInterface';

import * as interactions from '../services/interactionsInterface';
import { connect, useDispatch } from 'react-redux';
import  Products from '../../products'; 

interface Props {
    incrementProduct?: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({ incrementProduct = () => { } }: Props) => {

     const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.safeArea }>
            <ScrollView style={{ flex: 1 }}>
                {Products.map(object =>
                    <View key={object.name} style={styles.productView}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={{uri: object.image}}
                                    style={styles.productImage}
                                />
                            </View>
                            <View style={{ flex: 3 }}>
                                <View><Text style={styles.productName}>{object.name}</Text></View>
                                <View><Text style={styles.productPrice}>${object.price.toFixed(2)}</Text></View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ borderRadius: 40, width: 60, borderColor: '#d0312d', backgroundColor: '#d0312d', borderWidth: 1, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { dispatch(interactions.incrementProduct(object)) }}><Text style={{fontWeight: 'bold', color: "#FFFFFF"}}>ADD</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export const mapDispatchToProps = (dispatch: Dispatch<UserInteraction>) => {
    return {
        actions: {
            addProduct: (product: Product) => {
                dispatch(interactions.incrementProduct(product))
            }
        }
    }
}

export default connect(null, mapDispatchToProps)(ProductList);


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productPrice: {
        fontSize: 20,
        color: 	'#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productName: {
        fontSize: 20,
        color: 	'#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 50,
        height: 50
    },
    productView: {
        backgroundColor: '#67B7D1',
        borderRadius: 25,
        padding: 10,
        margin: 24
    }
});
