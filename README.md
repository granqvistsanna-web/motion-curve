# Framer Plugin Starter Kit

A starter kit for building Framer plugins with React, TypeScript, Vite, and Tailwind CSS.

## Features

- ⚡ **Vite 6** - Fast build tool and dev server
- ⚛️ **React 18** - Modern React with TypeScript
- 🎨 **Tailwind CSS v3** - Utility-first CSS framework
- 🎯 **Framer Plugin SDK v3** - Official Framer plugin API
- 🌓 **Design System** - Built-in support for Framer's dark/light themes
- 🔒 **HTTPS Dev Server** - Required for Framer plugin development

## Development

### Setup

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

The dev server runs on `https://localhost:5173`. Add the plugin in Framer by pointing to the project directory.

### Build

```bash
npm run build
```

### Package Plugin

```bash
npm run pack
```

This creates a `.framer-plugin` file that can be distributed.

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v3
- Framer Plugin SDK v3

## Design System

This starter includes a design system built on Framer's CSS variables that automatically adapt to dark and light modes. See `src/App.css` for available components and utilities.

## License

MIT
