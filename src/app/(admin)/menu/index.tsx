import { StyleSheet, View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../../constants/Colors';
import ProductListItem from '../../../components/ProductListItem';
import { useProductList } from '@/src/api/products';


export default function MenuScreen() {
  const {
    data: products,
    error,
    isLoading,
  } = useProductList()

  if (error) {
    return <ActivityIndicator />;
  }

  if (isLoading) {
    return <Text>failed to fetch Products</Text>;
  }

  return (
    <FlatList
    data={products}
    renderItem={({item})=><ProductListItem product={item}/>}
    numColumns={2}
    contentContainerStyle = {{gap: 10, padding: 10}}
    columnWrapperStyle = {{gap: 10}}
    />
   
  );
}

const styles = StyleSheet.create({
  container: {
   backgroundColor:"white",
   borderRadius: 20,
   padding:10
  },
  image:{
    width: "100%",
    aspectRatio: 1,
    borderRadius: 500
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

});
