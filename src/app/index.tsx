import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/button';
import { Link, Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';
import Loader from '../components/Loader';
import Colors from '../constants/Colors';

const index = () => {
  const {session, loading, isAdmin} = useAuth()
  if(loading) {
    return <Loader/>
  }

  if(!session) {
    return <Redirect href={'/sign-in'} />;
  }
  
if(!isAdmin){
  return <Redirect href={"/(user)"} />
}



  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
    <Stack.Screen options={{ headerShown: false }} />
    <Text style={styles.header} >Eatpizza</Text>

      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button text='Log Out' onPress = {() => supabase.auth.signOut()}/>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  header:{
    fontSize: 40,
    fontStyle: "italic",
     paddingBottom: 45,
      textAlign:"center",
      color: Colors.light.tint,
      fontWeight: "bold"
  },
})