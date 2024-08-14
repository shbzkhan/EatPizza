import { supabase } from "@/src/lib/supabase";
import { Product } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

export const useProductList = ()=>{
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
          const { data, error } = await supabase.from("products").select("*");
          if (error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
}