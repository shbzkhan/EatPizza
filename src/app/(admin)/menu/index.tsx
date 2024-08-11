import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import Colors from '../../../constants/Colors';
import products from '@/assets/data/products';
import ProductListItem from '../../../components/ProductListItem';


export default function MenuScreen() {
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
