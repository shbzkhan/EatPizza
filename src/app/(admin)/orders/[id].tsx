import orders from "@/assets/data/orders"
import OrderListItem from "@/src/components/OrderLIstItem"
import OrderItemListItem from "@/src/components/OrderItemListItem"
import { Stack, useLocalSearchParams } from "expo-router"
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native"
import Colors from "@/src/constants/Colors"
import { OrderStatusList } from "@/src/types"
import { useOrderDetail, useUpdateOrder } from "@/src/api/orders"
import Loader from "@/src/components/Loader"


const OrderDetailScreen = ()=>{
    const { id:idString } = useLocalSearchParams(); 
    const id = parseFloat(typeof idString === "string"? idString : idString[0] )

    const {data: order, isLoading, error} = useOrderDetail(id)

    const {mutate: updateOrder} = useUpdateOrder()

    const updateStatus = (status: string) =>{
        updateOrder({id: id, updatedFields: {status}})

        console.log("Notify:", order?.user_id);
        
    }

    if(isLoading){
        return <Loader/>
      }
    if(error || !order){
      return <Text>Failed to fetch</Text>
    }
 console.log(order)
    return(
        <View style={{padding: 10, gap: 20, flex: 1}}>
            <Stack.Screen options={{title: `Order #${id}`}} />


            <FlatList 
            data={order.order_item}
            renderItem={({item})=> <OrderItemListItem item = {item}/> }
            contentContainerStyle= {{gap: 10}}
            ListHeaderComponent={()=> <OrderListItem order = {order} /> }

            ListFooterComponent={()=>
            <>
                <Text style={{ fontWeight: 'bold' }}>Status</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                    <Pressable
                        key={status}
                        onPress={() => updateStatus(status)}
                        style={{
                            borderColor: Colors.light.tint,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 10,
                            backgroundColor:
                        order.status === status
                            ? Colors.light.tint
                            : 'transparent',
                        }}
                    >
                        <Text
                        style={{
                            color:
                            order.status === status ? 'white' : Colors.light.tint,
                        }}
                        >
                            {status}
                        </Text>
                    </Pressable>
                    ))}
                    </View>
            </>
            }

            />
        </View>
    )
}
export default OrderDetailScreen