# Project Overview

## Project Structure

This section outlines the main directories and key files within the project, explaining their roles and purposes.

### Directories

*   **`app`**: This directory contains the core application code. It houses the source files, components, and modules that make up the functionality of the project.
*   **`docs`**: This directory is designated for documentation related to the project. It may include API documentation, user guides, or architectural diagrams.
*   **`public`**: This directory holds static assets that are served directly to the client. Examples include images, fonts, and other files that don't require preprocessing.
*   **`third`**: This directory is likely used for third-party libraries or dependencies that are not managed through a package manager.
*   **`tools`**: This directory contains utility scripts or tools used for development, building, or deployment processes.

### Key Files

*   **`app/index.ts`**: This is typically the main entry point for the application. It's where the application initializes and starts running.
*   **`package.json`**: This file is crucial for Node.js projects. It lists project dependencies, scripts for building and running the application, and other metadata.
*   **`tsconfig.json`**: This file configures the TypeScript compiler (tsc). It specifies compiler options, such as the target JavaScript version, module system, and include/exclude patterns for compilation.
*   **`bun.lock`**: This file is specific to the Bun runtime. It's a lockfile that ensures deterministic dependency installation by recording the exact versions of dependencies used in the project.

## Server Setup and Routing

This section details the initialization and configuration of the Hono server and how API routes are managed within the application.

### Hono Server Initialization (`app/index.ts`)

The main entry point of the application, `app/index.ts`, is responsible for setting up and starting the Hono server. This typically involves:

1.  **Importing Hono**: The Hono library is imported.
2.  **Creating a Hono App Instance**: A new Hono application instance is created.
3.  **Middleware Configuration**: Common middleware such as CORS, logging, and error handling are configured and applied to the Hono instance.
4.  **Static Assets**: The server might be configured to serve static files from the `public` directory.
5.  **Route Registration**: API routes, defined in other modules, are imported and registered with the Hono app.
6.  **Starting the Server**: The Hono application is configured to listen on a specific port, and the server is started. The Bun runtime is used to execute the server.

### Route Definition and Organization (`app/routes`)

The application's API routes are organized within the `app/routes` directory. This directory contains several TypeScript modules, each responsible for a specific domain or functionality of the API. This modular approach helps in keeping the codebase organized and maintainable.

The primary route modules include:

*   **`app/routes/index.ts`**: This file typically acts as the main router for the application. It imports and aggregates all the sub-routers from other modules within the `app/routes` directory (e.g., `account`, `auth`, etc.) and mounts them under specific base paths. For example, all routes defined in `account.ts` might be prefixed with `/account`.

*   **`app/routes/account.ts`**: Handles routes related to user account management, such as creating accounts, retrieving user profiles, and updating user information.
*   **`app/routes/auth.ts`**: Manages authentication and authorization. This includes routes for user login, logout, session management, and potentially token generation/validation.
*   **`app/routes/e2ee.ts`**: Deals with End-to-End Encryption specific routes. This could involve key exchange mechanisms or other cryptographic operations.
*   **`app/routes/room.ts`**: Contains routes for managing rooms or sessions, such as creating, joining, or leaving rooms, and handling room-specific data.
*   **`app/routes/server.ts`**: This module might handle server-specific information or administrative routes, such as health checks, server status, or configuration endpoints.

Each of these modules defines Hono route handlers (e.g., `app.get()`, `app.post()`) for specific API endpoints. These handlers process incoming requests, interact with services or data layers, and return responses. The routes are then exported and aggregated in `app/routes/index.ts` to be registered with the main Hono app instance in `app/index.ts`.

## Matrix API Implementation

This section outlines the implemented portions of the Matrix Client-Server API, as indicated by the routes defined in `app/index.ts`. For detailed specifications, refer to the [Matrix Specification](https://spec.matrix.org/latest/) and the [Client-Server API documentation](https://spec.matrix.org/v1.14/client-server-api/).

### Implemented Endpoints:

Based on `app/index.ts`, the following Matrix API functionalities have at least partial implementations:

*   **Server Information:**
    *   `/.well-known/matrix/client`: Provides client configuration details.
    *   `/.well-known/matrix/server`: Provides server discovery information.
    *   `/_matrix/client/versions`: Lists supported Matrix API versions.
    *   `/_matrix/client/v3/capabilities`: Describes the server's capabilities.

*   **Authentication & Authorization (OAuth focus):**
    *   `/_matrix/client/v1/auth_metadata` & `/_matrix/client/unstable/org.matrix.msc2965/auth_metadata`: OAuth metadata endpoints.
    *   `/_matrix/gim/oauth2/registration`: A custom OAuth registration endpoint.

*   **Account Management:**
    *   `/_matrix/client/v3/account/whoami`: Returns information about the current user.
    *   `/_matrix/client/v3/user/:id/filter`: Manages user-defined event filters.
    *   `/_matrix/client/v3/pushrules/`: Manages push notification rules.

*   **Room Synchronization:**
    *   `/_matrix/client/v3/sync`: Allows clients to synchronize room state and receive new messages/events.

*   **End-to-End Encryption (E2EE):**
    *   `/_matrix/client/v3/room_keys/version`: Manages versions of room keys.
    *   `/_matrix/client/v3/keys/query`: Allows querying for users' E2EE keys.
    *   `/_matrix/client/v3/keys/upload`: Allows uploading E2EE keys.

### Notable Features and Missing Functionalities:

*   **Core Authentication TODOs**:
    *   `/_matrix/client/v3/login`: **TODO: Implement login** - Standard username/password login is not yet implemented.
    *   `/_matrix/client/v3/logout`: **TODO: Implement logout** - User logout functionality is missing.
    *   `/_matrix/client/v3/refresh`: **TODO: Implement register** - User registration is not implemented (Note: the route is named 'refresh' but the comment indicates 'register').

*   **Partially Implemented Account Data**:
    *   `/_matrix/client/v3/user/:id/account_data`: Marked as `emptyRoute`, indicating global or per-room account data storage is not fully implemented.
    *   `/_matrix/client/v3/user/:id/filter/*`: Specific filter operations beyond creation/retrieval are `emptyRoute`.
    *   `/_matrix/client/v3/profile/:id`: User profile retrieval/setting is an `emptyRoute`.

*   **Other Empty Routes**: Several other standard Matrix API endpoints are defined but point to `emptyRoute`, indicating they are placeholders and not yet functional:
    *   `/_matrix/client/v3/thirdparty/protocols`
    *   `/_matrix/client/v3/voip/turnServer`

The current implementation focuses on server discovery, some E2EE key management, basic account information (`whoami`, push rules, filters), room synchronization, and an OAuth flow for authentication. Essential features like standard login, registration, and full account data management are marked as TODO or are currently placeholders.

## Development Environment and Workflow

This section describes how to set up the development environment for this project, including installing dependencies and running the server. The project utilizes **Bun** as its JavaScript runtime and package manager.

### Prerequisites

*   **Bun**: Ensure you have Bun installed on your system. Bun is used for its speed and integrated tools (runtime, package manager, bundler). You can find installation instructions on the [official Bun website](https://bun.sh/).

### Installation

1.  **Clone the Repository**: If you haven't already, clone the project repository to your local machine.
2.  **Install Dependencies**: Navigate to the project's root directory in your terminal and run the following command:
    ```bash
    bun install
    ```
    This command reads the `package.json` file and installs all the necessary dependencies listed there, using `bun.lock` to ensure consistent versions.

### Running the Server

Once the dependencies are installed, you can start the development server using:

```bash
bun dev
```
This command will typically start the Hono server, making it accessible at `https://localhost:3000` (or the configured port). The `bun dev` script is likely configured in `package.json` and uses Bun to execute the application, often with features like hot reloading for a smoother development experience.

The server provides:
*   An API endpoint at `https://localhost:3000/api`
*   A web client accessible at `https://localhost:3000/app`

Refer to the server logs for the exact address and port if it differs from the default.
