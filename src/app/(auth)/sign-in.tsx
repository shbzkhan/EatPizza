import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Button from "../../components/button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";
const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const signinWithEmail = async () => {
    setloading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setloading(false);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false}} />
      <Text style={styles.header} >Eatpizza</Text>

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
        onPress={signinWithEmail}
        disabled={loading}
        text={loading ? <ActivityIndicator color={"white"}/> : "Sign in"}
      />
      <Text style={styles.textButton}> Don't have an account?. 
            <Link href="/sign-up" style={{color: Colors.light.tint,}} >
             Sign up
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
    marginVertical: 10,
    color: "gray"
  },
  header:{
    fontSize: 40,
    fontStyle: "italic",
     paddingBottom: 45,
      textAlign:"center",
      color: Colors.light.tint,
      fontWeight: "bold"
  },
});

export default SignInScreen;
