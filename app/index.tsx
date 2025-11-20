import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import AppNavigator from '../navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />  {/* ← Expo auto-wraps this with NavigationContainer */}
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}