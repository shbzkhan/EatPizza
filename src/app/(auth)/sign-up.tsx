import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import Button from "../../components/button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";


const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const signupWithEmail = async () => {
    setloading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    setloading(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false}} />
      <Text style={styles.header} >Create a new account</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="user@eatpizza.com"
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signupWithEmail}
        disabled={loading}
        text ={loading ? <ActivityIndicator color={"white"}/>  : "Create account"}
      />
      <Text style={styles.textButton}> Don't have an account?. 
            <Link href="/sign-in" style={{color: Colors.light.tint,}} >
             Log in
            </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  header:{
    fontSize: 30,
     paddingBottom: 40,
      marginHorizontal: "auto",
      color: "gray"

  },
  image:{
    width:20,
    aspectRatio: 1
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "gray",
    marginVertical: 10,
  },
});

export default SignUpScreen;
