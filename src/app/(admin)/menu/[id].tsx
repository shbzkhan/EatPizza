import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, Stack, useRouter, Link } from "expo-router";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";
import { defaultPizaaImage } from "@/src/components/ProductListItem";


const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailScreen = () => {
  const { id:idString } = useLocalSearchParams(); 
  const id = parseFloat(typeof idString === "string"? idString : idString[0] )

const {data:product, error, isLoading} = useProduct(id)


  const {addItem} = useCart();
  const router = useRouter()

  const [selectSize, setSelectSize] = useState<PizzaSize>("M");


  const addToCart = () => {
    if(!product){
      return;
    }

    addItem(product, selectSize);
    router.push('/cart')
  };
  
  if (error) {
    return <ActivityIndicator />;
  }

  if (isLoading) {
    return <Text>failed to fetch Products</Text>;
  }

  return (
    <View style={styles.container}>

<Stack.Screen 
    
    options={{title: "Menu",
      headerRight: () => (
        <Link href= {`/(admin)/menu/create?id=${id}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    }}
    />

      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultPizaaImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>{"\u20B9" + product?.price}</Text>
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
    borderRadius: 500
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",

  },
title:{
    fontWeight: "bold",
    fontSize:20,
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
