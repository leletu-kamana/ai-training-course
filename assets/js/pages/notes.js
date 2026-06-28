// pages/notes.js

import * as Api from '../api.js';
import { Auth } from '../auth.js';
import { showToast, formatDate } from '../utils.js';

Auth.protectPage();

const notesList = document.getElementById('notesList');
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
let editingId = null;

function renderNotes() {
  const notes = Api.getNotes();
  if (notes.length === 0) {
    notesList.innerHTML = `<p class="text-center" style="padding:2rem;color:var(--text-secondary);">No notes yet. Create one!</p>`;
    return;
  }
  notesList.innerHTML = notes.map(n => `
    <div class="note-item" data-id="${n.id}">
      <div class="flex justify-between">
        <div>
          <div class="note-title">${n.title}</div>
          <div class="note-date">${formatDate(n.createdAt)}</div>
        </div>
        <div class="flex">
          <button class="btn btn-sm edit-note" data-id="${n.id}">✏️ Edit</button>
          <button class="btn btn-sm btn-danger delete-note" data-id="${n.id}">🗑️ Delete</button>
        </div>
      </div>
      <p style="margin-top:0.5rem;">${n.content}</p>
    </div>
  `).join('');

  // Attach event listeners
  document.querySelectorAll('.delete-note').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      if (confirm('Delete this note?')) {
        Api.deleteNote(id);
        renderNotes();
        showToast('Note deleted', 'success');
      }
    });
  });

  document.querySelectorAll('.edit-note').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const note = Api.getNotes().find(n => n.id === id);
      if (note) {
        editingId = id;
        noteTitle.value = note.title;
        noteContent.value = note.content;
        document.getElementById('formSubmitBtn').textContent = 'Update Note';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

// Handle form submit
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) {
    showToast('Please fill in both fields.', 'error');
    return;
  }

  if (editingId) {
    Api.updateNote(editingId, { title, content });
    showToast('Note updated!', 'success');
    editingId = null;
    document.getElementById('formSubmitBtn').textContent = 'Add Note';
  } else {
    Api.addNote(title, content);
    showToast('Note added!', 'success');
  }
  noteTitle.value = '';
  noteContent.value = '';
  renderNotes();
});

// Initial render
renderNotes();

// Seed with mock data if empty
Api.seedMockNotes();
renderNotes();