// src/screens/Auth/ProfileScreen.tsx
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleUpdate = async () => {
    await updateProfile({ username, email, ...(password && { password }) });
    Alert.alert('Success', 'Profile updated!');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 30 }}>Profile</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 15 }}
      />
      <TextInput
        placeholder="New Password (optional)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 20 }}
      />

      <Button title="Update Profile" onPress={handleUpdate} color="#0066ff" />
      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
}