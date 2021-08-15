import React, { useEffect, Dispatch } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { CartState,ProductAdded } from '../models/productAddedModel';

import { Product } from '../models/productModel'
import { useSelector, connect, useDispatch } from 'react-redux';
import * as interactions from '../services/interactionsInterface'
import { RootState } from '../redux/combineReducers';
import  Products from '../../products'; 

export interface Props {
	cartProducts: ProductAdded[],
	total: number,
	incrementProduct?: (product: Product) => void,
	removeProduct?: (product: Product) => void
}

const Cart: React.FC<Props> = ({ cartProducts , total, incrementProduct: addProduct = () => { }, removeProduct = () => { } }: Props) => {

	//retrieve store state
	const data = useSelector((state: RootState) => state as any)

	//declare dispatch
	const dispatch = useDispatch();

	//for mapping data
	let tableData: ProductAdded[] = [];

	if (data.cart.products.length != 0) {
		tableData = data.cart.products.map((object: any) =>
			<View key={object.name} style={styles.productView}>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ width: "20%", alignItems: 'center', justifyContent: 'center' }}>
						<Image
							source={{uri: object.image}}
							style={styles.productImage}
						/>
					</View>
					<View style={{ width: "40%", alignItems: 'baseline', justifyContent: "center" }}>
						<View><Text style={styles.productName}>{object.name}</Text></View>
						<View><Text style={styles.productPrice}>${object.price.toFixed(2)}</Text></View>
					</View>
					<View style={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
						<View style={styles.quantityButtonContainer}>
							<TouchableOpacity onPress={() => { dispatch(interactions.incrementProduct(object)) }}><Text style={{fontSize: 25}}>+</Text></TouchableOpacity>
						</View>
						<View style={styles.quantityButtonContainer}>
							<TouchableOpacity onPress={() => { dispatch(interactions.decrementProduct(object)) }}><Text style={{fontSize: 25}}>-</Text></TouchableOpacity>
						</View>
					</View>
					<View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
						<View><Text style={styles.productQuantity}>x {object.quantity}</Text></View>
						<View><Text style={styles.productQuantity}>${(Math.round(object.quantity * object.price * 100) / 100).toFixed(2)}</Text></View>
					</View>
					<View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
						<TouchableOpacity onPress={() => { dispatch(interactions.removeProduct(object)) }}><Text style={{fontSize: 25}}>X</Text></TouchableOpacity>
					</View>
				</View>
			</View>
		)

	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{tableData.length > 0 ?
				<View style={{ flex: 1 }}>
					<View style={styles.listContainer}>
						<ScrollView>
							{tableData}
						</ScrollView>
					</View>
					<View style={tableData.length > 0 ? styles.totalContainer : { display: "none" }}>
						<View style={{flex: 1}}>
							<View style={{ alignItems: 'center'}}>
								<Text style={{ fontSize: 25 }}>Checkout Summary</Text>
							</View>
							<View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>Total Items: </Text>
									</View>
									<View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>{data.cart.products.reduce((a: number, b: ProductAdded) => a + b.quantity, 0)}</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>Total: </Text>
									</View>
									<View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>${data.cart.total.toFixed(2)}</Text>
									</View>
								</View>
							</View>
							<View style={{ paddingHorizontal: 10, backgroundColor: '#D0312D', borderRadius: 20, marginTop: 50 }}>
								<TouchableOpacity style={{backgroundColor: '#D0312D', alignItems: 'center', justifyContent: 'center', height: 30}} onPress={() => { }}><Text style={{fontSize:20, color: "#FFFFFF", fontWeight: 'bold'}}>Proceed to Payment</Text></TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				:
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image
						source={{ uri: "https://www.wizardslearning.com/assets/images/emptycart.png"}}
						style={styles.emptyCart}
					/>
				</View>
			}
		</SafeAreaView>
	);
}

export const mapStateToProps = (state: CartState) => {
	return {
		state: state
	}
}

export const mapDispatchToProps = (dispatch: Dispatch<interactions.UserInteraction>) => {
	return {
		actions: {
			addProduct: (product: Product) => {
				dispatch(interactions.incrementProduct(product))
			},
			removeProduct: (product: Product) => {
				dispatch(interactions.removeProduct(product))
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// export default Cart;

const styles = StyleSheet.create({
	
	productView: {
		backgroundColor: '#67B7D1',
		borderRadius: 25,
        padding: 10,
        margin: 11
	},
	totalContainer: {
		flex: 1,
		backgroundColor: '#D3D3D3',
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	productQuantity: {
		fontSize: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	
	productName: {
		fontSize: 19,
		alignItems: 'center',
		justifyContent: 'center',
	},
	productPrice: {
		fontSize: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	quantityButtonContainer: {
		borderRadius: 40,
		borderWidth: 1,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: 30,
		minWidth: 30,
		marginVertical: 10
	},
	emptyCart: {
		width: 350,
		height: 350,
	},
	productImage: {
		width: 50,
		height: 50
	},
	listContainer: {
		flex: 2,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	}
});
