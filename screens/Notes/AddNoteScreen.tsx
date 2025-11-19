import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../utils/storage';

// Explicitly type the component as a Function Component
const AddNoteScreen: FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'work' | 'study' | 'personal'>('personal');
  
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const handleSave = async () => {
    if (!content.trim() || !user) return;

    const newNote = {
      id: Date.now().toString(),
      title: title || undefined,
      content: content.trim(),
      category,
      dateAdded: new Date().toISOString(),
      userId: user.id,
    };

    await storage.saveNote(newNote);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title (optional)"
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
      />

      <TextInput
        placeholder="Start typing your note..."
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.contentInput}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Personal" value="personal" />
            <Picker.Item label="Work" value="work" />
            <Picker.Item label="Study" value="study" />
          </Picker>
        </View>
      </View>

      <Button title="Save Note" onPress={handleSave} color="#0066ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleInput: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingVertical: 10,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default AddNoteScreen;