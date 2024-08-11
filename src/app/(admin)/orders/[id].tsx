import orders from "@/assets/data/orders"
import OrderListItem from "@/src/components/OrderLIstItem"
import OrderItemListItem from "@/src/components/OrderItemListItem"
import { Stack, useLocalSearchParams } from "expo-router"
import { View, Text, FlatList } from "react-native"


const OrderDetailScreen = ()=>{
    const {id} = useLocalSearchParams()

    const order = orders.find(o => o.id.toString() === id)

    if(!order){
        return <Text>Order not found</Text>
    }
        console.log(order)

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