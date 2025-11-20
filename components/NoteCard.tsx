import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Note } from '../types';
import { capitalize, formatDateOnly, getCategoryColor, truncate } from '../utils/helpers';

type Props = {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
};

export default function NoteCard({ note, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(note.category) }]} />
        <Text style={styles.category}>{capitalize(note.category)}</Text>
        <Text style={styles.date}>{formatDateOnly(note.dateAdded)}</Text>
      </View>

      <Text style={styles.title}>{note.title || 'Untitled Note'}</Text>
      <Text style={styles.content}>{truncate(note.content, 120)}</Text>

      {note.dateEdited && (
        <Text style={styles.edited}>Edited {formatDateOnly(note.dateEdited)}</Text>
      )}

      <TouchableOpacity onPress={(e) => { e.stopPropagation(); onDelete(); }} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  content: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  edited: {
    fontSize: 11,
    color: '#888',
    marginTop: 8,
    fontStyle: 'italic',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  deleteText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
});