<div align="center">

[![Banner AutoMaat][banner]][link-repo]


# AutoMaat

[![Build][badge-build]][link-build]
[![Expo][badge-expo]][link-expo]
[![Platform][badge-platform]][link-repo]
[![License][badge-license]][link-license]

</div>

---

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [API Setup](#api-setup)
  - [App Development](#app-development)
  - [Building for Production](#building-for-production)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

</details>

## About
AutoMaat is mobile application for car rental management, developed as part of a university project at Hanze University
of Applied Sciences. This app enables customers to easily browse available cars, make reservations, and manage
their rental history.

### Features
- Quick account creation, easy login, and secure password recovery
- Browse, filter, and sort available cars to find the perfect ride
- Make and manage reservations, with automatic conversion into rentals
- Track or update car locations, even when offline
- Get notified about important events, track vehicle status, and report damages
- Stay organized with rental history, FAQ access, and support ticket options
- Personalize the app with theming and mark favorite cars for faster bookings

## Getting Started
### Prerequisites
- Node.js 20 or higher
- Docker and Docker Compose
- EAS CLI (`npm install -g eas-cli`)

Depending on the platform you want to develop for, you will also need:
- Android Studio (for **Android** development)
- Xcode (for **iOS** development)

### API Setup
The backend API is based on the [MAD Server](https://github.com/hanze-hbo-ict/mad-server-generated) from Hanze
University of Applied Sciences.

1. Navigate to the API directory:
    ```sh
    cd apps/api
    ```
2. Start the development environment:
    ```sh
    docker compose up -d
    ```

The API will be available at `http://localhost:8080/api`. The API documentation can be found at
`http://localhost:8080/admin/docs`.

### App Development
1. Navigate to the app directory:
    ```sh
    cd apps/app
    ```
   
2. Install the dependencies:
    ```sh
    npm install
    ```
   
3. Start the development server:
    ```sh
    npm run dev:android
    ```
   
The app will be available on your emulator or connected device.

### Building for Production
<details>
<summary>Local Preview (APK)</summary>

Generate a local preview of the app (APK) by running the following command:
```sh
npm run build:android:preview
```
</details>

<details>
<summary>Production Build (Play Store)</summary>

Generate a production build of the app that can be uploaded to the Google Play Store by running the following command:
```sh
npm run build:android
```
</details>

<details>
<summary>Production Build (App Store)</summary>

Generate a production build of the app that can be uploaded to the Apple App Store by running the following command:
```sh
npm run build:ios
```
</details>

## Configuration
### Environment Variables
The following environment variables can be configured in the `.env` file located in the `apps/app` directory:
```properties
# The URL of the API server
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

## Contributing
This app was created for a university project and is provided as-is. Contributions and improvements are welcome, but
there are no current plans for further development or maintenance.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- Image References -->
[banner]:https://github.com/user-attachments/assets/00d63ca5-5c67-47cb-b57c-da3a7d1ccae4
[badge-build]:https://img.shields.io/github/actions/workflow/status/HeadTriXz/ITVB23KMO5/build.yml?branch=main&style=for-the-badge
[badge-license]:https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge
[badge-platform]:https://img.shields.io/badge/platform-Android%20%7C%20iOS-green?style=for-the-badge
[badge-expo]:https://img.shields.io/badge/expo-v52-green?style=for-the-badge

<!-- Links -->
[link-repo]:https://github.com/HeadTriXz/ITVB23KMO5
[link-build]:https://github.com/HeadTriXz/ITVB23KMO5/actions/workflows/build.yml
[link-license]:LICENSE
[link-expo]:https://expo.dev/
