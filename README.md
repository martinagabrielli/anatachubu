# Anatachubu

Anatachubu is a simplified YouTube clone built using **Next.js** and **React**. The project utilises a headless WordPress backend and integrates with various services to provide video streaming capabilities.

## Features
- **Video Streaming**: Users can watch videos hosted on the platform.
- **Authentication**: User authentication system with login and registration.
- **Search Functionality**: Users can search for videos via a search bar.
- **Responsive UI**: Mobile-friendly and optimised for different screen sizes.
- **Apollo Client**: GraphQL integration for efficient data fetching.
- **Mux Integration**: Handling video playback and streaming.

## Tech Stack
- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Headless WordPress
- **Video Streaming**: Mux
- **State Management**: Apollo Client (GraphQL)

## Folder Structure
```
.anatachubu
│── .next
│── app
│   ├── base
│   ├── components
│   │   ├── Auth
│   │   ├── BurgerMenu
│   │   ├── Footer
│   │   ├── Header
│   │   ├── Logo
│   │   ├── SearchBanner
│   │   ├── SearchBar
│   │   ├── Videos
│   ├── fonts
│   ├── layouts
│   ├── lib
│   │   ├── apollo-client.ts
│   │   ├── mux.js
│   ├── scss
│   ├── favicon.ico
│   ├── globals.css
│   ├── head.tsx
│   ├── layout.tsx
│   ├── page.tsx
│── pages/api
│   ├── auth
│   ├── videos.js
│── public
│── .env.local
```

## Setup & Installation
### Prerequisites
- Node.js >= 16.x
- npm or yarn
- WordPress backend with ACF enabled
- Mux API keys

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/martinagabrielli/anatachubu.git
   cd anatachubu
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the necessary variables (e.g., API keys for Mux, GraphQL endpoint).
4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

## API Endpoints
### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Videos
- `GET /api/videos` - Fetch all videos
- `GET /api/videos/:id` - Fetch video details

## Contributing
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
MIT License
