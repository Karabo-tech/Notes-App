import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, User } from '../types';

const KEYS = {
  USER: '@user',
  NOTES: '@notes',
  CURRENT_USER: '@current_user',
};

export const storage = {
  async saveUser(user: User) {
    const users = await this.getUsers();
    users.push(user);
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(users));
  },

  async getUsers(): Promise<User[]> {
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : [];
  },

  async login(email: string, password: string): Promise<User | null> {
    const users = await this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      await AsyncStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    }
    return user || null;
  },

  async getCurrentUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  async logout() {
    await AsyncStorage.removeItem(KEYS.CURRENT_USER);
  },

  async updateUser(updatedUser: User) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(users));
      await AsyncStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    }
  },

  // Notes
  async saveNote(note: Note) {
    const notes = await this.getAllNotes();
    notes.push(note);
    await AsyncStorage.setItem(KEYS.NOTES, JSON.stringify(notes));
  },

  async getAllNotes(): Promise<Note[]> {
    const data = await AsyncStorage.getItem(KEYS.NOTES);
    const allNotes: Note[] = data ? JSON.parse(data) : [];
    const user = await this.getCurrentUser();
    return allNotes.filter(n => n.userId === user?.id);
  },

  async updateNote(updatedNote: Note) {
    const notes = await this.getAllNotes();
    const index = notes.findIndex(n => n.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = { ...updatedNote, dateEdited: new Date().toISOString() };
      const allNotes = JSON.parse((await AsyncStorage.getItem(KEYS.NOTES)) || '[]');
      const globalIndex = allNotes.findIndex((n: Note) => n.id === updatedNote.id);
      if (globalIndex !== -1) allNotes[globalIndex] = notes[index];
      await AsyncStorage.setItem(KEYS.NOTES, JSON.stringify(allNotes));
    }
  },

  async deleteNote(id: string) {
    const allNotes: Note[] = JSON.parse((await AsyncStorage.getItem(KEYS.NOTES)) || '[]');
    const filtered = allNotes.filter((n: Note) => n.id !== id);
    await AsyncStorage.setItem(KEYS.NOTES, JSON.stringify(filtered));
  },
};