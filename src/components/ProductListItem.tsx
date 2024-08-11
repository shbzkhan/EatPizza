import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import products from '@/assets/data/products';
import { Product } from '@/src/types';
import { Link, useSegments } from 'expo-router';


export const defaultPizaaImage =
"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
type ProductListItemProps = {
    product: Product
}


export default function ProductListItem({product}: ProductListItemProps) {
  const segments = useSegments()
  
  return (
    <Link href = {`/${segments[0]}/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image source={{uri: product.image || defaultPizaaImage}} style={styles.image}
      resizeMode='contain'
      />
      

    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>{"\u20B9"+ product.price}</Text>
    </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    borderRadius: 20,
    padding:10,
    flex: 1
  },
  image:{
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color: Colors.light.tint

  }

});
