// src/screens/Notes/CategoryScreen.tsx
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Note } from '../../types';
import { formatDateOnly, truncate } from '../../utils/helpers';
import { storage } from '../../utils/storage';

export default function CategoryScreen() {
  const route = useRoute<any>();
  const { category } = route.params || { category: 'personal' };
  const [notes, setNotes] = useState<Note[]>([]);

  const loadCategoryNotes = async () => {
    const allNotes = await storage.getAllNotes();
    setNotes(allNotes.filter(n => n.category === category));
  };

  useEffect(() => {
    loadCategoryNotes();
  }, [category]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        {category.charAt(0).toUpperCase() + category.slice(1)} Notes
      </Text>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title || 'Untitled'}</Text>
            <Text>{truncate(item.content, 120)}</Text>
            <Text style={{ color: '#888', marginTop: 5 }}>
              {formatDateOnly(item.dateAdded)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No notes in this category yet.</Text>}
      />
    </View>
  );
}