import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Button } from 'react-native';
import { signIn } from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/Config';
import styles from '../style/style';

export default Login = ( { navigation } ) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email is required.');
    }
    else if (!password) {
      Alert.alert('Password is required.');
    }
    else {
      signIn(email, password);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          navigation.navigate('Todo', {userUid: user.uid});
        }
      });
    }
  };

  return (
    <View 
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <Text style={styles.header}>Todos</Text>
      <Text style={styles.infoText}>Login to your account</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your email*"
        value={email}
        onChangeText={(email) => setEmail(email)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password*"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Pressable style={styles.buttonStyle}>
        <Button 
          title="Login"
          onPress={handlePress} />
      </Pressable>
      <Text style={styles.infoText}>Not having account yet?</Text>
      <Pressable style={styles.buttonStyle}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')} />
      </Pressable>
    </View>
  );
}