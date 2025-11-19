import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  title: string;
  setTitle: (text: string) => void;
  content: string;
  setContent: (text: string) => void;
  category: string;
  setCategory: (cat: any) => void;
};

export default function NoteForm({ title, setTitle, content, setContent, category, setCategory }: Props) {
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
        textAlignVertical="top"
        style={styles.contentInput}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
        >
          <Picker.Item label="Personal" value="personal" />
          <Picker.Item label="Work" value="work" />
          <Picker.Item label="Study" value="study" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 10,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  pickerContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
});