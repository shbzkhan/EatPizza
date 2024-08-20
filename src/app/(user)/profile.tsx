import Button from "@/src/components/button";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View>
      <Text>profile</Text>

      <Text onPress={() => supabase.auth.signOut()} 
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
