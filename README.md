# My GitHub Pages Project

## Overview
This is a single‑page application (SPA‑like) built with vanilla HTML, CSS, and JavaScript.  
It demonstrates:
- User authentication (mock) using `localStorage`
- A clean, responsive UI with dark mode support
- Modular JavaScript (separate files for API, auth, utilities)
- GitHub Pages deployment

## Setup
1. Clone this repository.
2. Open `index.html` in your browser.
3. No build tools needed – it runs straight from the file system.

## Features
- Login / Signup (data stored in `localStorage`)
- Dashboard with a welcome message
- Notes page (CRUD operations using mock data)
- Profile page (view / edit user info)
- Dark/light mode toggle (auto‑detects system preference)

## File Structure
See the project tree in the root folder.

## Lecturer Notes
- All mock data is in `/data/mock-notes.json` (temporary).
- The `api.js` file abstracts all data operations – switching to a real backend only requires changing that file.
- CSS variables are used for theming; dark mode is fully supported.

## Deployment
This project is deployed on GitHub Pages.  
Simply push to the `main` branch and enable Pages in the repository settings.