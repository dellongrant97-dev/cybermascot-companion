# CyberMascot Companion

A customizable Windows desktop companion with task reminders, daily briefings, AI chat, and reviewable coding-workspace tools.

## Requirements

- Windows 10 or later
- Node.js and npm

## Run from source

```powershell
npm install
npm start
```

CyberMascot uses Ollama by default. Configure a provider, model, and any required API key in Settings.

## Tests and Windows installer

```powershell
npm test
npm run dist:win
```

The Windows installer is created in `dist/`. Installers built without a code-signing certificate may trigger a Windows security warning.

## Privacy

Conversation context and selected workspace files are sent only to the AI provider configured in Settings when you choose to make a request. Review the provider and context-sharing confirmation before sending private material.

## License

MIT. See [LICENSE](./LICENSE).
