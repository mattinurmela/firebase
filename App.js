import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Button, Text, TextInput, View, ScrollView } from 'react-native';
import { MESSAGES, collection, firestore, addDoc, query, onSnapshot, orderBy, serverTimestamp, signInWithEmailAndPassword, getAuth } from './firebase/Config';
import { useState, useEffect } from 'react';
import { convertFirebaseTimeStamptoJS } from './helpers/Functions';
import Login from './components/Login';

export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [logged, setLogged] = useState(false)

  const login = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      console.log(userCredential.user)
      setLogged(true)
    }).catch((error) => {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        console.log('Wrong username or password!')
      } else if ((error.code === 'auth/too-many-requests')) {
        console.log('Too many requests!')
      } else {
          console.log(error.code + ' ' + error.message)
      }
  })
}

    
  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp(),
    }).catch(error => console.log(error))

    setNewMessage('')
    console.log('Message saved!')
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStamptoJS(doc.data().created)
      }
      tempMessages.push(messageObject)
    })
    setMessages(tempMessages)
  })
  
    return () => {
      unsubscribe()
    }
  }, [])
  

  if (logged) {
      return (
    <View style={styles.container}>
      <TextInput placeholder='Enter message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
      <Button title="Save" onPress={save}/>
      <ScrollView>
        {
        messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))
        }
      </ScrollView>
      </View>
  );
      } else {
        return <Login setLogin={setLogged} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12,
  }
});
