import { supabase } from "@/src/lib/supabase"
import { InsertTables } from "@/src/types"
import { useMutation } from "@tanstack/react-query"

export const useInsertOrderItems = () =>{

   return useMutation({
    async mutationFn(items: InsertTables<"order_item">[]) {
      const {data: newOrder, error} = await supabase.from("order_item")
      .insert(items)
      .select()
      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
  
    },
 
   })
  }