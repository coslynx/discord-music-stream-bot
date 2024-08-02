<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-music-stream-bot
</h1>
<h4 align="center">A Discord bot for seamless music playback and community engagement.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-Discord.js-red" alt="">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="">
  <img src="https://img.shields.io/badge/APIs-YouTube,_SoundCloud-lightgrey" alt="">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-music-stream-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-music-stream-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-music-stream-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The `discord-music-stream-bot` project provides a comprehensive solution for playing music in Discord voice channels, enhancing social interaction among users by integrating music playback from various platforms like YouTube and SoundCloud.

## 📦 Features
|    | Feature              | Description                                                                                                         |
|----|----------------------|---------------------------------------------------------------------------------------------------------------------|
| 🎶 | Music Playback    | Support playing music from various sources with commands to play, pause, skip, and stop, ensuring smooth playback. |
| 📃 | Playlist Management | Allows users to create and manage their playlists and queue songs for continuous playback without interruptions.   |
| 🔍 | Search Functionality | Users can search for songs directly from the chat with autocomplete suggestions for quick results.                  |
| 🔊 | Volume Control    | Provides users the ability to adjust playback volume easily for personalized listening experiences.                   |
| ⚖️ | Admin Controls    | Exclusive commands for server moderators to manage music playback and ensure a positive listening environment.      |
| 📜 | Play History      | Lets users access recently played tracks, fostering memorable shared experiences within the server.                 |
| 🌍 | Multi-language Support | The bot supports multiple languages for a broader user base and accessibility.                                   |
| 🛠️ | Custom Commands    | Users can create personalized commands for unique interactions and enhance community engagement.                     |
| 👤 | Bot Presence Management | Customizable presence messages to indicate when the bot is playing music or idle, enhancing visibility in the voice channel. |

## 📂 Structure
```plaintext
discord-music-stream-bot/
├── commands/
│   ├── play.js
│   ├── pause.js
│   ├── skip.js
│   ├── stop.js
│   ├── queue.js
│   ├── search.js
│   ├── volume.js
│   ├── playlists.js
│   └── help.js
├── events/
│   ├── message.js
│   ├── guildMemberAdd.js
│   ├── guildMemberRemove.js
│   └── ready.js
├── services/
│   ├── musicService.js
│   ├── queueService.js
│   ├── playlistService.js
│   └── userService.js
├── models/
│   ├── userModel.js
│   ├── playlistModel.js
│   └── songModel.js
├── utils/
│   ├── commandHandler.js
│   ├── logger.js
│   └── errorHandler.js
├── config/
│   ├── env.config.js
│   └── database.config.js
├── routes/
│   ├── api.js
│   └── musicRoutes.js
├── middleware/
│   ├── authentication.js
│   ├── permissions.js
│   └── logging.js
├── .env
└── package.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- MongoDB

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/discord-music-stream-bot.git`
2. Navigate to the project directory:
   - `cd discord-music-stream-bot`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the Project
1. Start the development server:
   - `node index.js`
2. Invite the bot to your server and enjoy music in your voice channel!

### ⚙️ Configuration
Adjust configuration settings in the `.env` file for API keys and other settings needed for the bot to function properly.

## 🌐 Hosting
### 🚀 Deployment Instructions
You can host this bot on platforms like Heroku, DigitalOcean, or any cloud service that supports Node.js applications.

1. Create a new Heroku app:
   - `heroku create`
2. Deploy your code:
   - `git push heroku main`
   
### 🔑 Environment Variables
- `DISCORD_TOKEN`: Your Discord bot token
- `MONGODB_URI`: Your MongoDB connection URI

## 📜 License
This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- Drix10 - [GitHub Profile](https://github.com/Drix10)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
    <img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
    <img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
    <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</p>