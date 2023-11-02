import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from '../firebase/Config'
import Constants from 'expo-constants'

export default function Login({setLogin}) {
    const [user, setUserName] = useState('testi@testi.com')
    const [password, setPassword] = useState('testi1')

  return (
    <View style={styles.container}>
        <Text>Login</Text>
        <Text>Username</Text>
        <TextInput value={user} onChangeText={text => setUserName(text)}/>
        <Text>Password</Text>
        <TextInput value={password} onChangeText={text => setPassword(text)}/>
        <Button title="Login" onPress={login}/>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    }
})