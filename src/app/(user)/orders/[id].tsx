import OrderListItem from "@/src/components/OrderLIstItem"
import OrderItemListItem from "@/src/components/OrderItemListItem"
import { Stack, useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import { useOrderDetail } from "@/src/api/orders"
import Loader from "@/src/components/Loader"


const OrderDetailScreen = ()=>{
    const { id:idString } = useLocalSearchParams(); 
    const id = parseFloat(typeof idString === "string"? idString : idString[0] )

    const {data: order, isLoading, error} = useOrderDetail(id)

    if(isLoading){
        return <Loader/>
      }
    if(error){
      return <Text>Failed to fetch</Text>
    }

    return(
        <View style={{padding: 10, gap: 20, flex: 1}}>
            <Stack.Screen options={{title: `Order #${id}`}} />


            <FlatList 
            data={order.order_items}
            renderItem={({item})=> <OrderItemListItem item = {item}/> }
            contentContainerStyle= {{gap: 10}}
            ListHeaderComponent={()=> <OrderListItem order = {order} /> }
            />
        </View>
    )
}
export default OrderDetailScreen