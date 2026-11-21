# CyberMascot Companion

A Windows desktop companion with an always-on-top mascot, AI chat, daily briefing, tasks and reminders, system monitoring, clipboard history, and supervised coding-workspace tools.

## Requirements

- Windows 10 or later, x64
- Node.js and npm for running from source or building
- Ollama installed and running for the default local AI provider, or credentials for a supported hosted provider

## Install

Download and run the Windows installer from a project release, if one is published. Choose an installation directory in the setup wizard. The installer is per-user and does not remove application data when the app is uninstalled.

To build the installer yourself, follow the source setup below and run `npm run dist:win`. The installer is written to `dist/`. Unsigned builds may trigger a Windows SmartScreen warning.

## Run from source

```powershell
npm install
npm start
```

The app starts with Ollama selected. Use Settings to choose a provider, model, and any required credentials.

## AI provider setup

### Ollama (local)

Ollama is the default provider. Install Ollama for Windows, start its local service, and download a model, for example:

```powershell
ollama pull llama3.2
```

The default endpoint is `http://127.0.0.1:11434` and the default model is `llama3.2`. If you use another model or endpoint, update the provider settings. Ollama requests are sent to the configured endpoint; using a remote Ollama endpoint sends the request to that server.

### Gemini or an OpenAI-compatible provider

In Settings, select Gemini or OpenAI, enter a model, and provide the service's API key. Gemini uses the configured Gemini-compatible endpoint by default. For OpenAI-compatible services, set the base URL to that provider's HTTPS API endpoint. The app adds `/chat/completions` to the base URL.

API keys are encrypted with Electron `safeStorage` for the current Windows account. The app does not intentionally print API keys in errors or logs. Keep your Windows account protected; applications running as that account share its access to account data.

## Workspace and coding-agent permissions

Choose a workspace in the Code section before using workspace tools. File browsing and proposed edits are restricted to that selected workspace; sensitive files and unsafe paths are rejected. The agent presents proposed changes for review, requires native confirmation before applying them, checks file hashes before writes, and supports undo with confirmation.

Project checks are limited to supported test/build command forms, use explicit executables and arguments without a shell, require native confirmation, have a 120-second timeout, and bound captured output.

**Important limitation:** project checks run with your normal Windows-account permissions. A project-defined script or test can access or modify files outside the selected workspace. The coding agent does not provide an operating-system sandbox. Run checks only for projects you trust.

## Privacy and security

- The renderer uses context isolation, Electron sandboxing, and disabled Node integration. Privileged IPC is restricted to approved handlers and the trusted local main frame.
- Navigation to untrusted content is blocked; approved web links open in the system browser.
- Chat messages, attached images, and selected coding context are sent to the provider configured in Settings only when you choose to make the relevant request. Review the provider and context-sharing confirmation before sending private material.
- Clipboard history is local to the app configuration, limited to five entries, and can be paused, cleared with confirmation, or set to expire after 1, 7, or 30 days. The default is to keep entries until cleared. **Clipboard entries are not encrypted at rest by this feature.** Clearing history does not change the current Windows clipboard.
- User settings are saved between runs. Uninstalling the app does not remove its application data.

## Implemented features and limitations

Implemented: chat with Ollama, Gemini, and OpenAI-compatible providers; microphone speech recognition where supported by the runtime and Windows permissions; tasks and reminders; weather and daily briefing; focus timer; system monitoring; configurable CPU/RAM warnings; clipboard controls; mascot idle/listening/thinking/speaking/working feedback; and supervised coding-workspace tools.

The mascot can read AI responses aloud using the speech synthesis voices available in the local Windows/Electron runtime. Automatic speech is enabled by default and can be disabled in Settings; each AI response also has manual play, pause, resume, stop, and replay controls. The app prefers a female-named installed voice when no voice is selected, but voice names and quality vary by Windows installation. The app does not configure or call a third-party TTS API; synthesis is delegated to the Windows/Electron speech runtime. Voice availability and whether a particular Windows voice uses online services depend on the installed voice and Windows settings. Automatic OS-level sandboxing of project scripts is not implemented.

## Tests and packaging

Run the automated tests:

```powershell
npm test
```

Build an unpacked Windows test package or the NSIS installer:

```powershell
npm run pack:win
npm run dist:win
```

Both build outputs go to `dist/`. Run the app from source with `npm start`.

## Troubleshooting

- **Ollama is unreachable:** start Ollama, confirm the configured URL (normally `http://127.0.0.1:11434`), and ensure the selected model has been downloaded.
- **Hosted AI requests fail:** verify the selected provider, model, HTTPS base URL, API key, and network access. The API key field clears after submission; check the Settings status message for save failures.
- **Microphone input is unavailable:** speech recognition depends on the Electron runtime and Windows microphone privacy permissions. The app remains usable through typed chat.
- **Automatic startup does not change:** check the Startup setting again after sign-in; Windows may reject registration or apply organization policy.
- **Windows warns about the installer:** locally built installers are unsigned unless a publisher certificate is configured. Only install packages from a source you trust.
- **A coding check fails or times out:** inspect its bounded stdout/stderr and confirm that the selected project is trusted; checks use your normal account permissions.

## Architecture

`main.js` remains the Electron main-process orchestrator for window lifecycle, IPC, providers, and app services. Workspace root validation, canonical file resolution, sensitive-file/type policy, and SHA-256 helpers are isolated in `workspace-utils.js` and covered by focused tests. This is an incremental boundary; IPC handlers and application lifecycle have not been comprehensively split into modules.

## License

MIT. See [LICENSE](./LICENSE).
