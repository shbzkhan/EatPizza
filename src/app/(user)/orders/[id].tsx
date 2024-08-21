import OrderListItem from "@/src/components/OrderLIstItem"
import OrderItemListItem from "@/src/components/OrderItemListItem"
import { Stack, useLocalSearchParams } from "expo-router"
import { View, Text, FlatList } from "react-native"
import { useOrderDetail } from "@/src/api/orders"
import Loader from "@/src/components/Loader"
import { useUpdateOrderSubscription } from "@/src/api/orders/subscription"


const OrderDetailScreen = ()=>{
    const { id:idString } = useLocalSearchParams(); 
    const id = parseFloat(typeof idString === "string"? idString : idString[0] )

    const {data: order, isLoading, error} = useOrderDetail(id)

    useUpdateOrderSubscription(id)

    if(isLoading){
        return <Loader/>
      }
    if(error || !order){
      return <Text>Failed to fetch</Text>
    }

    return(
        <View style={{padding: 10, gap: 20, flex: 1}}>
            <Stack.Screen options={{title: `Order #${id}`}} />


            <FlatList 
            data={order.order_item}
        renderItem={({item})=> <OrderItemListItem item = {item}/> }
            contentContainerStyle= {{gap: 10}}
            ListHeaderComponent={()=> <OrderListItem order = {order} /> }
            />
        </View>
    )
}
export default OrderDetailScreen