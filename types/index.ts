export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type Note = {
  id: string;
  title?: string;
  content: string;
  category: 'work' | 'study' | 'personal';
  dateAdded: string;
  dateEdited?: string;
  userId: string;
};