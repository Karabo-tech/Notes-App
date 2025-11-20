# Secure Notes App - React Native (Expo)

Secure note-taking application built with **React Native** and **Expo**, featuring user authentication, protected routes, CRUD operations, search, sorting, and categorization.

## Features Implemented

### User Management
- Register with username, email, and password
- Login / Logout
- Update profile (username, email, password)
- Protected routes (unauthenticated users cannot access notes)

### Notes Management
- Add new notes with:
  - Title (optional)
  - Content
  - Category (Work, Study, Personal)
  - Automatic date added
- View all personal notes
- Edit notes (with "edited" timestamp)
- Delete notes
- Search notes by keyword (searches title + content)
- Sort notes by date (ascending/descending)

### Technical Requirements Met
- React Navigation (Stack Navigator)
- Protected routing using Context API
- AsyncStorage as persistent database
- Full CRUD operations
- Search & filter functionality
- Responsive and clean UI
- TypeScript support
- Modern Expo `app/` directory structure

## Tech Stack
- **Framework**: React Native + Expo (Managed Workflow)
- **Navigation**: `@react-navigation/native-stack`
- **State Management**: React Context API
- **Storage**: `@react-native-async-storage/async-storage`
- **Picker**: `@react-native-picker/picker`
- **Language**: TypeScript

## How to Run

1. Clone or unzip the project
2. Open terminal in project folder
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn

## Start the app

npx expo start
# or
npm start