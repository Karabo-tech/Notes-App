// src/screens/Notes/EditNoteScreen.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { storage } from '../../utils/storage';

export default function EditNoteScreen() {
  const route = useRoute<any>();
  const { note } = route.params;
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);
  const navigation = useNavigation<any>();

  const handleUpdate = async () => {
    const updatedNote = {
      ...note,
      title: title || undefined,
      content,
      category,
      dateEdited: new Date().toISOString(),
    };

    await storage.updateNote(updatedNote);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Delete Note', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await storage.deleteNote(note.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title (optional)"
        style={{ fontSize: 24, marginBottom: 20 }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        style={{ flex: 1, textAlignVertical: 'top', fontSize: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 15 }}
      />

      {/* Category Picker same as AddNoteScreen */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Button title="Update" onPress={handleUpdate} color="#0066ff" />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
}