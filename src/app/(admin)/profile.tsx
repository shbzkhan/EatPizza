
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";
import {StyleSheet, Text, View } from "react-native";

export default function ProfileAdminScreen() {
  const logout = async()=>{
    const {error} = await supabase.auth.signOut()
    console.log(error?.message)
  }


  return (
    <View>
      <Text>profile</Text>

      <Text onPress={logout} 
      style={styles.textButton}>
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textButton: {
    fontSize: 17,
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
