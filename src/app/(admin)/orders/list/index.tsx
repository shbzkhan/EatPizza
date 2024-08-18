import { StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect } from 'react'
import OrderListItem from '@/src/components/OrderLIstItem'
import { useAdminOrderList } from '@/src/api/orders'
import Loader from '@/src/components/Loader'
import { useInsertOrderSubscription } from '@/src/api/orders/subscription'

const OrderScreen = () => {
  const {data: orders, 
    isLoading, 
    error
  } = useAdminOrderList({archived: false})

 useInsertOrderSubscription()


  if(isLoading){
    return <Loader/>
  }
if(error){
  return <Text>Failed to fetch</Text>
}
  return (
    <FlatList data={orders} 
    renderItem={({item})=> <OrderListItem order={item}/>}
    contentContainerStyle = {{gap: 10, padding: 10}}

     />
  )
}

export default OrderScreen

const styles = StyleSheet.create({})