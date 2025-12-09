import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/components/firebase';
import { Link } from 'expo-router';

interface RegisterProps {
  goToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ goToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Registered! Please login.');
      goToLogin();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

<Text style={{ marginTop: 12, fontSize: 14 }}>
  Already have an account?{' '}
  <Link href="/" asChild>
    <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>
      Login
    </Text>
  </Link>
</Text>

    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    marginTop: 14,
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
