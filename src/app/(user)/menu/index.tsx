import {
  StyleSheet,
  Text,
  FlatList,

} from "react-native";
import Colors from "../../../constants/Colors";
import ProductListItem from "../../../components/ProductListItem";
import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/src/types";
import { useProductList } from "@/src/api/products";
import products from "@/assets/data/products";
export default function MenuScreen() {
  
  
  // useEffect(()=>{
  //   const fetchProduct = async ()=>{
  //     const {data, error} = await supabase.from("products").select("*")
  //     console.log(data)
  //     console.log(error)
  //   }
  //   fetchProduct()
  // })

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
