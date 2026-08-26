# For Nadia — a private tribute site

Complete: all 7 chapters, full text, and all 30 photos are in place. Ready to publish.

## Folder structure
```
nadia-tribute/
├── index.html          ← the whole site (cover + 7 chapters)
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/              ← all 30 photos, already placed
└── README.md            ← this file
```

## A note on privacy
GitHub Pages sites are **public to anyone who has the link** — there's no built-in password or access list. To keep this just for Nadia:
- Use a repo/site name that isn't guessable, and only share the exact URL with her.
- If you want an extra layer later, ask and a simple passcode screen can be added before the Enter button (client-side only — a deterrent, not real security, but it stops casual stumbling-in).

## Uploading to GitHub Pages

1. **Create a new repository**
   Go to github.com → New repository → give it a name (this becomes part of the URL, so keep it low-key) → Create.

2. **Upload the files**
   Easiest way without the command line: on the repo page, click "Add file" → "Upload files", then drag in everything inside the `nadia-tribute` folder — `index.html`, `README.md`, and the whole `css/`, `js/`, `images/` folders. Commit.

   Or with git, from inside the `nadia-tribute` folder:
   ```
   git init
   git add .
   git commit -m "Tribute site for Nadia"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**
   In the repo: Settings → Pages → under "Build and deployment," set Source to "Deploy from a branch," Branch to `main`, folder to `/ (root)`. Save.

4. **Get the link**
   GitHub will give you a URL like `https://YOUR-USERNAME.github.io/YOUR-REPO/` — usually live within a minute or two. Open it yourself first to confirm everything renders and the Enter gate works, then generate the QR code from that exact URL for the bouquet card.
