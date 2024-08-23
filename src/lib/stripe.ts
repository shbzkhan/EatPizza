import { Alert } from "react-native"
import { supabase } from "./supabase"

const fetchPaymentSheetParams = async (amount: number) =>{
    const {data, error} =   await supabase.functions.invoke("payment-sheet", {body: {amount}})
    if(data){
        return data
    }
    Alert.alert("Error fetching payment sheet params")
    return {}
}



export const initialisePaymentSheet = async (amount: number) =>{
    console.log("initialisePaymentSheet, for ",amount)

    const data = await fetchPaymentSheetParams(amount)
    console.log(data)
}