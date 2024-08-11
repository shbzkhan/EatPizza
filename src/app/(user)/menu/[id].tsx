import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import products from "@/assets/data/products";
import Button from "@/src/components/button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";


const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams(); 
  const {addItem} = useCart();
  const router = useRouter()

  const [selectSize, setSelectSize] = useState<PizzaSize>("M");
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if(!product){return;}
    addItem(product, selectSize)
    router.push('/cart')
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectSize(size)}
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectSize === size ? "gainsboro" : "white" },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>{"\u20B9" + product?.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
});
