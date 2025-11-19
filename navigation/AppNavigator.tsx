// src/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import ProfileScreen from '../screens/Auth/ProfileScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import AddNoteScreen from '../screens/Notes/AddNoteScreen';
import EditNoteScreen from '../screens/Notes/EditNoteScreen';
import HomeScreen from '../screens/Notes/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Notes' }} />
          <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'New Note' }} />
          <Stack.Screen name="EditNote" component={EditNoteScreen} options={{ title: 'Edit Note' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}