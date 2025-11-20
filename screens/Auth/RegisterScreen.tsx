// src/screens/Auth/RegisterScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register } = useAuth();
  const navigation = useNavigation<any>();

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      await register({ email, password, username });
      Alert.alert('Success', 'Account created!');
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Error', 'Registration failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 15 }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 15 }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 20 }}
      />

      <Button title="Register" onPress={handleRegister} color="#0066ff" />

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', color: '#0066ff' }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}