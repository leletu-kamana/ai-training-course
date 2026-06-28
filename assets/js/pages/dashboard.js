// pages/dashboard.js

import * as Api from '../api.js';
import { Auth } from '../auth.js';
import { showToast, formatDate } from '../utils.js';

// Protect page (if not logged in, redirect)
Auth.protectPage();

// Display user info
const user = Auth.getCurrentUser();
if (user) {
  document.getElementById('userName').textContent = user.name || user.username;
}

// Example: show recent notes count
const notes = Api.getNotes();
document.getElementById('noteCount').textContent = notes.length;

// Logout button
document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  Auth.logout();
});

// Quick add note (demo)
document.getElementById('quickAddBtn')?.addEventListener('click', () => {
  const title = prompt('Note title:');
  if (title) {
    const content = prompt('Note content:');
    if (content !== null) {
      Api.addNote(title, content);
      showToast('Note added!', 'success');
      // Update count
      document.getElementById('noteCount').textContent = Api.getNotes().length;
    }
  }
});