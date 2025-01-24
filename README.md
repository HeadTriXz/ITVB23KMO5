<p align="center">
    <a href="https://github.com/HeadTriXz/ITVB23KMO5">
        <img src="https://github.com/user-attachments/assets/39db3bc2-39a6-4d9b-a481-3624f29f3be5" alt="Logo AutoMaat">
    </a>
</p>
<h1 align="center">AutoMaat</h1>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

</details>

---

## About
A mobile application for car rental management, developed as part of a university project at Hanze University
of Applied Sciences. This app enables customers to easily browse available cars, make reservations, and manage
their rental history.

## Getting Started
### Prerequisites


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

The API will be available at `http://localhost:8080`. The API documentation can be found at
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

### Production Builds
#### Local Preview
Generate a local preview of the app (APK) by running the following command:
```sh
npm run build:android:preview
```

#### Production Build
Generate a production build of the app that can be uploaded to the Google Play Store by running the following command:
```sh
npm run build:android
```

## Configuration
### Environment Variables
The following environment variables can be configured in the `.env` file located in the `apps/app` directory:
- `EXPO_PUBLIC_API_URL`: The URL of the API server.

## Contributing
This app was created for a university project and is provided as-is. Contributions and improvements are welcome, but
there are no current plans for further development or maintenance.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
