# UC Logistics Mobile App

A cross-platform mobile application for UC Logistics built with React Native, Expo, and TypeScript. This app provides logistics management functionality with authentication, order management, and real-time data synchronization.

## Overview

UC Logistics is a mobile application designed for logistics operations, featuring:

- User authentication with OAuth 2.0
- Secure token storage with biometric support
- Order management and checkout functionality
- GraphQL API integration with Apollo Client
- Redux state management with persistence
- Cross-platform support (iOS, Android, Web)

## Tech Stack

### Core Technologies

- **Language**: TypeScript 5.9.2
- **Framework**: React Native 0.81.4
- **Platform**: Expo SDK 54.0.13
- **React**: 19.1.0

### Key Dependencies

- **Routing**: Expo Router 6.0.11 (file-based routing)
- **State Management**: Redux Toolkit 2.9.0 + Redux Persist
- **API Client**:
  - Apollo Client 4.0.7 (GraphQL)
  - Axios 1.12.2 (REST API)
- **Navigation**: React Navigation 7.x
- **Forms**: Formik 2.4.6 + Yup 1.7.1
- **UI/Styling**:
  - Shopify Restyle 2.4.5
  - React Native Reanimated 4.1.1
  - Expo Linear Gradient
- **Storage**:
  - Async Storage 2.2.0
  - Expo Secure Store 15.0.7
- **Fonts**: Roboto (Google Fonts)

### Development Tools

- **Package Manager**: pnpm 10.18.2
- **Linter**: ESLint 9.25.0
- **Formatter**: Prettier 3.6.2
- **GraphQL Codegen**: @graphql-codegen/cli 6.0.0

## Requirements

- **Node.js**: v18 or higher (recommended)
- **pnpm**: 10.18.2 or compatible
- **Expo CLI**: Installed globally or via npx
- **iOS**: Xcode (for iOS development)
- **Android**: Android Studio + Android SDK (for Android development)
- **Mobile Device**: Physical device or emulator/simulator

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# GraphQL Introspection Token
INTROSPECTION_TOKEN=<your-graphql-introspection-token>

# OAuth 2.0 Configuration
EXPO_PUBLIC_OAUTH_CLIENT_ID=<your-oauth-client-id>
EXPO_PUBLIC_OAUTH_CLIENT_SECRET=<your-oauth-client-secret>

# API Configuration
EXPO_PUBLIC_API_URL=<your-api-base-url>
```

**Note**: The `EXPO_PUBLIC_` prefix makes variables available in the client-side code.

### 3. Generate GraphQL Types (Optional)

If you need to regenerate GraphQL types from your schema:

```bash
pnpm run codegen
```

## Running the App

### Development Server

Start the Expo development server:

```bash
pnpm start
```

This will open the Expo Developer Tools in your browser with options to:

- Scan QR code with Expo Go app (iOS/Android)
- Open in iOS Simulator
- Open in Android Emulator
- Open in web browser

### Platform-Specific Commands

#### iOS

```bash
pnpm run ios
```

#### Android

```bash
pnpm run android
```

#### Web

```bash
pnpm run web
```

## Available Scripts

| Script          | Command                                           | Description                                   |
| --------------- | ------------------------------------------------- | --------------------------------------------- |
| `start`         | `expo start`                                      | Start the Expo development server             |
| `android`       | `expo start --android`                            | Start and open on Android emulator            |
| `ios`           | `expo start --ios`                                | Start and open on iOS simulator               |
| `web`           | `expo start --web`                                | Start and open in web browser                 |
| `lint`          | `expo lint`                                       | Run ESLint to check code quality              |
| `codegen`       | `graphql-codegen --config codegen.ts`             | Generate TypeScript types from GraphQL schema |
| `format`        | `prettier --write "**/*.{js,jsx,ts,tsx,json,md}"` | Format code with Prettier                     |
| `format:check`  | `prettier --check "**/*.{js,jsx,ts,tsx,json,md}"` | Check code formatting without modifying       |
| `reset-project` | `node ./scripts/reset-project.js`                 | Reset project to initial state                |

## Project Structure

```
uc-mobile/
├── src/
│   ├── app/                    # Expo Router file-based routing
│   │   ├── (protected)/        # Protected routes (require auth)
│   │   │   ├── checkout/
│   │   │   ├── orders.tsx
│   │   │   └── _layout.tsx
│   │   ├── auth/               # Authentication routes
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── index.tsx
│   │   │   └── _layout.tsx
│   │   ├── _layout.tsx         # Root layout
│   │   ├── index.tsx           # Home screen
│   │   └── welcome.tsx         # Welcome screen
│   ├── components/             # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Header.tsx
│   │   ├── Theme.ts
│   │   └── ...
│   ├── services/               # API and service layer
│   │   ├── api/
│   │   │   └── client.ts       # Axios API client with interceptors
│   │   ├── auth/
│   │   │   └── auth.service.ts # Authentication service
│   │   └── index.ts
│   ├── redux/                  # State management
│   │   ├── slices/
│   │   │   ├── auth.ts         # Auth state slice
│   │   │   └── general.ts      # General app state
│   │   ├── store.ts
│   │   ├── store.instance.ts
│   │   ├── hooks.ts            # Typed Redux hooks
│   │   └── reducers/
│   ├── apollo/                 # GraphQL Apollo Client setup
│   │   └── apollo.client.tsx
│   ├── providers/              # React Context providers
│   │   ├── AuthProvider.tsx
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useAuthGuard.ts
│   ├── config/                 # App configuration
│   │   ├── app-config.ts
│   │   └── constants.ts
│   ├── utils/                  # Utility functions
│   │   └── validation.ts
│   └── gql/                    # Generated GraphQL types
│       └── graphql.ts
├── assets/                     # Static assets (images, fonts)
├── scripts/                    # Build and utility scripts
├── android/                    # Android native code
├── ios/                        # iOS native code
├── app.json                    # Expo app configuration
├── codegen.ts                  # GraphQL codegen configuration
├── graphql.config.ts           # GraphQL config
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Dependencies and scripts
└── pnpm-lock.yaml              # pnpm lockfile
```

## Environment Variables

The app uses the following environment variables:

| Variable                          | Description                                | Required  |
| --------------------------------- | ------------------------------------------ | --------- |
| `INTROSPECTION_TOKEN`             | JWT token for GraphQL schema introspection | Yes (dev) |
| `EXPO_PUBLIC_OAUTH_CLIENT_ID`     | OAuth 2.0 client identifier                | Yes       |
| `EXPO_PUBLIC_OAUTH_CLIENT_SECRET` | OAuth 2.0 client secret                    | Yes       |
| `EXPO_PUBLIC_API_URL`             | Base URL for the backend API               | Yes       |

**Security Note**: Never commit `.env` file to version control. The `.env` file should be added to `.gitignore`.

## Authentication

The app implements OAuth 2.0 authentication flow with:

- Secure token storage using Expo Secure Store
- Automatic token refresh on 401 responses
- Biometric authentication support (Face ID/Touch ID on iOS)
- Protected routes that require authentication

Authentication flow is managed through:

- `src/services/auth/auth.service.ts` - Authentication service
- `src/redux/slices/auth.ts` - Auth state management
- `src/hooks/useAuth.ts` - Auth hook for components
- `src/providers/AuthProvider.tsx` - Auth context provider

## Testing

<!-- TODO: Add test configuration and testing framework -->

No test suite is currently configured. Consider adding:

- Jest for unit testing
- React Native Testing Library for component testing
- E2E testing with Detox or Maestro

## Building for Production

### EAS Build (Recommended)

<!-- TODO: Add EAS Build configuration -->

Set up Expo Application Services (EAS) for cloud builds:

```bash
npm install -g eas-cli
eas build:configure
```

### Local Builds

#### iOS

```bash
expo prebuild
cd ios && pod install
# Open in Xcode for building
```

#### Android

```bash
expo prebuild
cd android && ./gradlew assembleRelease
```

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**

   ```bash
   pnpm start --clear
   ```

2. **iOS Pods installation issues**

   ```bash
   cd ios && pod install --repo-update
   ```

3. **Android build errors**

   ```bash
   cd android && ./gradlew clean
   ```

4. **Environment variables not loading**
   - Ensure `.env` file exists in project root
   - Restart the development server
   - Check that variables start with `EXPO_PUBLIC_` for client-side access

## Learn More

### Expo Resources

- [Expo Documentation](https://docs.expo.dev/) - Learn about Expo features and APIs
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing documentation
- [Expo SDK Reference](https://docs.expo.dev/versions/latest/) - API reference for Expo SDK

### Development Resources

- [React Native Documentation](https://reactjs.org/) - React and React Native guides
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client documentation
- [Redux Toolkit](https://redux-toolkit.js.org/) - Modern Redux development

## License

<!-- TODO: Add license information -->

This project is private. License information not yet specified.

---

**Last Updated**: 2025-10-13
