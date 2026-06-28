// auth.js – authentication logic

import * as Api from './api.js';
import { showToast, onReady } from './utils.js';

// Hard‑coded users for demo (in real app, this would be a backend)
const DEMO_USERS = [
  { username: 'demo', password: 'demo123', name: 'Demo User' },
  { username: 'admin', password: 'admin', name: 'Administrator' },
];

export const Auth = {
  isLoggedIn() {
    return !!Api.getCurrentUser();
  },

  getCurrentUser() {
    return Api.getCurrentUser();
  },

  login(username, password) {
    const user = DEMO_USERS.find(
      u => u.username === username && u.password === password
    );
    if (!user) {
      throw new Error('Invalid username or password');
    }
    // Store user info (don't store password)
    const { password: _, ...safeUser } = user;
    Api.setCurrentUser(safeUser);
    return safeUser;
  },

  logout() {
    Api.clearCurrentUser();
    window.location.href = '/';
  },

  // Render login form inside a container element
  renderLoginForm(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="auth-container">
        <h1>Welcome</h1>
        <form id="loginForm" class="flex-col">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="demo" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="demo123" required>
          </div>
          <button type="submit" class="btn btn-primary">Log In</button>
        </form>
        <div class="auth-footer">
          Don't have an account? <a href="pages/signup.html">Sign up</a>
        </div>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      try {
        Auth.login(username, password);
        showToast('Login successful!', 'success');
        setTimeout(() => window.location.href = 'pages/dashboard.html', 500);
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  },

  // Render signup form (simple)
  renderSignupForm(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="auth-container">
        <h1>Create Account</h1>
        <form id="signupForm" class="flex-col">
          <div class="form-group">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="johndoe" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Min 6 characters" required>
          </div>
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
        <div class="auth-footer">
          Already have an account? <a href="login.html">Log in</a>
        </div>
      </div>
    `;

    document.getElementById('signupForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fullname = document.getElementById('fullname').value.trim();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }
      // Simulate saving – in reality, you'd send to backend
      // For demo, we just "log in" the new user
      const newUser = { username, name: fullname };
      Api.setCurrentUser(newUser);
      showToast('Account created! You are now logged in.', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 500);
    });
  },

  // Protect a page: if not logged in, redirect to login
  protectPage() {
    if (!Auth.isLoggedIn()) {
      window.location.href = '/pages/login.html';
    }
  },
};

// Auto‑protect pages that have a data‑attribute
onReady(() => {
  if (document.body.dataset.protect === 'true') {
    Auth.protectPage();
  }
});