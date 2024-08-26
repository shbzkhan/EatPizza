import {Text, FlatList} from 'react-native'
import React from 'react'
import OrderListItem from '@/src/components/OrderLIstItem'
import { useMyOrderList } from '@/src/api/orders'
import Loader from '@/src/components/Loader'


const OrderScreen = () => {
  const {data: orders, isLoading, error} = useMyOrderList()

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
