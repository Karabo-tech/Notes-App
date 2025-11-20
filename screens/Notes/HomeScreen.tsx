import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Note } from '../../types';
import { storage } from '../../utils/storage';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  const loadNotes = async () => {
    const allNotes = await storage.getAllNotes();
    let filtered = allNotes;

    if (search) {
      filtered = filtered.filter(note =>
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

    setNotes(filtered);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    loadNotes();
    return unsubscribe;
  }, [navigation, search, sortAsc]);

  const deleteNote = async (id: string) => {
    await storage.deleteNote(id);
    loadNotes();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search notes..."
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setSortAsc(!sortAsc)}>
          <Text style={{ color: 'blue' }}>
            Sort by Date {sortAsc ? '↑' : '↓'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={{ color: 'blue' }}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: 'red' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditNote', { note: item })}
            style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title || 'Untitled'}</Text>
            <Text numberOfLines={2}>{item.content}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>
              {item.category} • {new Date(item.dateAdded).toLocaleDateString()}
              {item.dateEdited && ` (edited)`}
            </Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text style={{ color: 'red', marginTop: 5 }}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddNote')}
        style={{ backgroundColor: '#0066ff', padding: 15, borderRadius: 50, position: 'absolute', bottom: 30, right: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}