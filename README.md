# Richard Godwin — Architectural Design & Spatial Systems

This is a modern, responsive React + TypeScript + Tailwind CSS web application built with Vite.

## How to Run in VS Code

You can run this project locally on your machine with VS Code in just 3 quick steps:

### Prerequisites
Make sure you have **Node.js** installed on your computer (v18, v20, or newer recommended).
- Check if you have it installed:
  ```bash
  node -v
  npm -v
  ```
- If you don't have Node.js, download and install it from [nodejs.org](https://nodejs.org/).

---

### Step 1: Open the Project in VS Code
1. Download or extract this project folder.
2. Open **Visual Studio Code**.
3. Go to **File** > **Open Folder...** (or press `Cmd + O` on macOS / `Ctrl + O` on Windows) and select the project directory.

---

### Step 2: Open the Integrated Terminal & Install Dependencies
1. Open the terminal inside VS Code by pressing ``Ctrl + ` `` (or ``Cmd + ` `` on macOS), or go to **Terminal** > **New Terminal**.
2. Run the following command to install the required packages:
   ```bash
   npm install
   ```

---

### Step 3: Start the Development Server
Run:
```bash
npm run dev
```

Once the terminal outputs:
```text
  VITE v8.3.0  ready in 200 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)** (or `Ctrl+Click` / `Cmd+Click` the link in the VS Code terminal).

---

### Available Scripts

- **`npm run dev`**: Starts the local development server with hot reload at `http://localhost:3000`.
- **`npm run build`**: Compiles TypeScript and creates an optimized production bundle in `/dist`.
- **`npm run preview`**: Previews the built production app locally.
- **`npm run lint`**: Checks for TypeScript type errors (`tsc --noEmit`).

---

### Project Structure

- `src/App.tsx`: Main page layout, state management, modal controllers, and view toggling.
- `src/components/`: Modular components (Hero, Featured Work, Mentorship, Digital Store, Reviews, FAQ, Lightbox, Modals, Header, Bottom Bar).
- `src/data/architecturalData.ts`: Architectural projects, digital blueprint assets, reviews, and FAQ content.
- `src/types/architecture.ts`: TypeScript data interfaces and types.
- `src/index.css`: Tailwind CSS configuration and typography.
- `vite.config.ts`: Vite build configuration.
- `vercel.json`: Pre-configured build command, output directory (`dist`), and SPA routing for Vercel.
- `.npmrc`: Configures `legacy-peer-deps=true` to guarantee zero dependency resolution conflicts in Vercel CI.

---

## Deploying to Vercel

### Option 1: Git Repository (Recommended)
1. Push this project to GitHub, GitLab, or Bitbucket.
2. In your [Vercel Dashboard](https://vercel.com/new), click **"Add New..."** > **"Project"**.
3. Import your repository.
4. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option 2: Deploy with Vercel CLI
Run the following in your terminal:
```bash
npx vercel
```
Follow the interactive prompts to deploy. For production:
```bash
npx vercel --prod
```

