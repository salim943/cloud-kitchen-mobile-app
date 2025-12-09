import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/components/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // ← Add this

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');

      // Navigate to UserDashboard after login
      router.push('/UserDashboard'); // ← Path to your dashboard
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 18,
    borderRadius: 10,
    backgroundColor: '#ffffff20',
    gap: 12,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#aaa',
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
