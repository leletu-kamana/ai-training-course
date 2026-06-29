# AI Ethics & Literacy Course

A free, open-source course teaching high school and tertiary students how to use AI tools
ethically — covering plagiarism, academic integrity, AI disclosure policies, and proper
citation of AI assistance.

## Structure

```
.
├── assets/
│   ├── css/style.css       Site-wide styles (plain CSS, no framework)
│   ├── img/                 Images
│   └── js/
│       ├── nav.js           Shared navbar + footer, builds correct links for current depth
│       ├── progress.js      localStorage-based progress tracker
│       ├── quiz.js          Self-check quiz logic
│       ├── citation-tool.js Interactive citation style switcher
│       └── checker.js       Self-Check writing tool logic
├── pages/
│   ├── about.html
│   ├── checker.html         Interactive self-check tool
│   ├── citation-guide.html
│   ├── examples.html
│   ├── modules.html         5 course modules
│   ├── quiz.html
│   └── resources.html
├── seo/
│   ├── robots.txt
│   └── sitemap.xml
├── .nojekyll
└── index.html
```

## Running locally

No build step needed. Open `index.html` in a browser, or serve the folder with any
static file server (e.g. `python3 -m http.server`) from the project root.

## Deployment

Hosted via GitHub Pages from the `main` branch root.