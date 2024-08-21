import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/button";
import { Stack } from "expo-router";

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  return (
    <View style={{padding: 10}}>
       <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
      data={items}
      renderItem={({item})=> <CartListItem cartItem={item}/>}
        contentContainerStyle={{ gap: 10}}
      />
      <Text style={{marginTop: 20, fontSize: 20, fontWeight: "500"}}>Total: {"\u20B9" + total}</Text>
      <Button onPress={checkout} text="Checkout"/>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
