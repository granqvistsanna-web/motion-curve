# Testing Your Framer Plugin - Complete Guide

## Prerequisites

Before testing, make sure you have:
- ✅ Node.js installed (v18 or higher)
- ✅ Dependencies installed: `npm install`
- ✅ Framer desktop app installed
- ✅ A Framer project open (or create a new one)

## Step-by-Step Testing Guide

### 1. Start the Development Server

Open your terminal in the project directory and run:

```bash
npm run dev
```

**What to expect:**
- The server will start on `https://localhost:5173`
- You'll see output like:
  ```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: use --host to expose
  ```
- The server runs with HTTPS (required for Framer)
- Keep this terminal window open - the server needs to stay running

**Important:** The server MUST run on port 5173. If you see a port conflict:
```bash
# Kill any process using port 5173
lsof -ti:5173 | xargs kill -9

# Then start the server again
npm run dev
```

### 2. Open Framer

1. Launch the **Framer Desktop App** (not the web version)
2. Open an existing project or create a new one
3. Make sure you're in **Canvas mode** (not Preview mode)

### 3. Add Your Plugin

There are two ways to add a local plugin:

#### Method A: Import from Directory (Recommended)

1. In Framer, press `Cmd + /` (Mac) or `Ctrl + /` (Windows) to open the plugins menu
2. Click the **"+"** button or **"Add Plugin"**
3. Select **"Import Plugin"** or **"Import from Directory"**
4. Navigate to your project folder:
   ```
   /Users/sannagranqvist/Documents/App/Motion Curve
   ```
5. Click **"Open"** or **"Select"**

#### Method B: Import from URL

1. Open the plugins menu (`Cmd/Ctrl + /`)
2. Click **"Add Plugin"**
3. Select **"Import from URL"** (if available)
4. Enter: `https://localhost:5173`

### 4. Activate the Plugin

1. After importing, your plugin **"Motion Curves"** should appear in the plugins list
2. Click on it to activate/open it
3. The plugin UI should appear in the position specified in `src/App.tsx` (top right by default)

### 5. What You Should See

When the plugin opens, you should see:
- **Title**: "Design System Demo"
- **Buttons**: Primary, Secondary, and Icon button
- **Input field**: Text input with placeholder
- **Card component**: Example card with text
- **Theme colors**: Visual examples of theme colors

The UI should automatically adapt to Framer's dark/light theme.

## Development Workflow

### Hot Reload

The plugin automatically reloads when you make changes:
1. Edit any file in `src/`
2. Save the file
3. The plugin UI in Framer will automatically refresh
4. No need to restart the dev server or reload Framer

### Testing Changes

1. **Edit `src/App.tsx`** - Make any change and save
2. **Watch Framer** - The plugin UI should update automatically
3. **Check Console** - Open browser DevTools (if needed) to see any errors

### Restarting the Dev Server

If you need to restart:
1. Press `Ctrl + C` in the terminal to stop the server
2. Run `npm run dev` again
3. In Framer, the plugin should reconnect automatically

## Testing Different Features

### Test Plugin UI Positioning

Edit `src/App.tsx` and change the `framer.showUI()` position:

```typescript
framer.showUI({
    position: "bottom left",  // Try: "top left", "bottom right", "center"
    width: 300,
    height: 400,
})
```

Save and see the plugin move to the new position.

### Test Design System Components

The demo includes:
- **Buttons**: Click them to see hover states
- **Input**: Type in the input field
- **Cards**: See the card styling
- **Theme Colors**: Visual reference for available colors

### Test Dark/Light Mode

1. In Framer, switch between dark and light themes
2. The plugin UI should automatically adapt
3. All colors use Framer's CSS variables, so they change automatically

### Test Resizable UI

You can make the plugin resizable by updating `framer.showUI()`:

```typescript
framer.showUI({
    position: "top right",
    width: 300,
    height: 400,
    resizable: true,  // Add this
    minWidth: 200,
    minHeight: 200,
})
```

## Common Issues & Solutions

### Issue: Plugin doesn't appear in Framer

**Solutions:**
- ✅ Make sure the dev server is running (`npm run dev`)
- ✅ Check that you're using the Framer Desktop app (not web)
- ✅ Verify the server is on `https://localhost:5173` (HTTPS, not HTTP)
- ✅ Try restarting Framer
- ✅ Check the Framer console for errors (View → Developer → Show Console)

### Issue: "Connection refused" or "Cannot connect"

**Solutions:**
- ✅ Verify the dev server is running
- ✅ Check the terminal for any error messages
- ✅ Make sure port 5173 is not blocked by firewall
- ✅ Try restarting the dev server

### Issue: HTTPS certificate warning

**Solutions:**
- ✅ First time setup: mkcert may need to install certificates
- ✅ On macOS: You may need to add the certificate to Keychain
- ✅ The certificate is self-signed but safe for local development
- ✅ Accept the certificate warning in your browser if prompted

### Issue: Plugin UI is blank or shows errors

**Solutions:**
- ✅ Check the browser console in Framer (View → Developer → Show Console)
- ✅ Look for TypeScript/JavaScript errors
- ✅ Verify all imports are correct
- ✅ Make sure `src/main.tsx` imports `App.css`
- ✅ Check that Tailwind is configured correctly

### Issue: Styles not working

**Solutions:**
- ✅ Verify `src/main.tsx` imports `./App.css`
- ✅ Check that `App.css` has `@tailwind` directives
- ✅ Restart the dev server: `npm run dev`
- ✅ Clear Vite cache: `rm -rf node_modules/.vite`

### Issue: Port 5173 already in use

**Solutions:**
```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port (not recommended, may cause issues)
# Edit vite.config.ts to specify a different port
```

## Debugging Tips

### 1. Check Framer Console

In Framer:
- **Mac**: `View → Developer → Show Console`
- **Windows**: `View → Developer → Show Console`

This shows JavaScript errors and console logs from your plugin.

### 2. Check Terminal Output

The dev server terminal shows:
- Build errors
- TypeScript errors
- Vite compilation issues

### 3. Add Console Logs

Add `console.log()` statements in your code:

```typescript
export function App() {
    console.log("Plugin loaded!")
    return (
        // ...
    )
}
```

Check the Framer console to see the output.

### 4. Test in Browser (Optional)

You can test the UI in a browser:
1. Open `https://localhost:5173` in your browser
2. You'll see the HTML, but Framer API won't work
3. Useful for testing CSS/styling without Framer

## Testing Plugin API Features

### Test Selection

Add this to `src/App.tsx` to test selection:

```typescript
import { useEffect } from "react"
import { framer } from "framer-plugin"

export function App() {
    useEffect(() => {
        const unsubscribe = framer.subscribeToSelection((selection) => {
            console.log("Selection:", selection)
        })
        return unsubscribe
    }, [])
    
    // ... rest of component
}
```

Select elements in Framer and check the console.

### Test Adding Elements

Try adding an SVG to the canvas:

```typescript
const handleAddSVG = async () => {
    await framer.addSVG({
        svg: '<svg><circle cx="50" cy="50" r="40"/></svg>',
        name: "Test Circle",
        x: 100,
        y: 100,
    })
}
```

## Production Build Testing

Before packaging, test the production build:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

This creates optimized files in the `dist/` folder.

## Packaging for Distribution

When ready to share your plugin:

```bash
npm run pack
```

This creates a `.framer-plugin` file that can be:
- Shared with others
- Submitted to the Framer plugin store
- Installed by double-clicking

## Next Steps

Once testing works:
1. ✅ Start building your plugin features
2. ✅ Use the design system components from `App.css`
3. ✅ Explore the Framer Plugin API in the docs
4. ✅ Test with real Framer projects

## Resources

- **Framer Plugin Docs**: https://www.framer.com/developers/plugins/
- **Framer Plugin API**: https://www.framer.com/developers/plugins/api
- **Plugin Examples**: https://github.com/framer/plugins

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (required for testing) |
| `npm run build` | Build for production |
| `npm run pack` | Create distributable plugin file |
| `npm run lint` | Check code for errors |

**Remember:** The dev server must be running for the plugin to work in Framer!

