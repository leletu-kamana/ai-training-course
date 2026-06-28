// api.js – data layer (localStorage for now)

const STORAGE_KEY = 'myapp_notes';
const USER_KEY = 'myapp_user';

// ---------- Notes ----------
export function getNotes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function addNote(title, content) {
  const notes = getNotes();
  const newNote = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
}

export function updateNote(id, updates) {
  const notes = getNotes();
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) throw new Error('Note not found');
  notes[index] = { ...notes[index], ...updates, updatedAt: new Date().toISOString() };
  saveNotes(notes);
  return notes[index];
}

export function deleteNote(id) {
  let notes = getNotes();
  notes = notes.filter(n => n.id !== id);
  saveNotes(notes);
}

// ---------- User (auth) ----------
export function getCurrentUser() {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

// ---------- Seed mock data (if empty) ----------
export function seedMockNotes() {
  const notes = getNotes();
  if (notes.length === 0) {
    // You can load from /data/mock-notes.json via fetch if needed
    const mock = [
      {
        id: '1',
        title: 'Welcome note',
        content: 'This is your first note. Edit or delete it!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    saveNotes(mock);
  }
}