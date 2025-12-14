# Personal Bookmarks API

A RESTful API built with Node.js, Express, and SQLite for managing personal URL bookmarks. This project demonstrates backend fundamentals including RESTful design, CRUD operations, input validation, and data persistence without external database servers.

## Features
- **Create** new bookmarks with title, URL, and optional description.
- **Read** all bookmarks or retrieve specific ones by unique ID.
- **Update** existing bookmark details.
- **Delete** bookmarks.
- **Validation**: Enforces valid URL formats and required titles using the `validator` library.
- **Persistence**: Uses a file-based SQLite database (`bookmarks.db`) to ensure data survives server restarts.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (typically included with Node.js)

## Installation and Setup

1. **Clone the repository** (or download the source code):
   ```bash
   git clone https://github.com/sunil-polupalli/bookmarks-api.git
   cd bookmarks-api
   ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Initialize the Database**:
    The application uses a file-based SQLite database. The database file (`bookmarks.db`) and the required table schema will be **automatically created** in the root directory the first time you run the server. No manual SQL scripts are required.

## Running the Server

To start the application, run:

```bash
node server.js
```

You should see the following output indicating success:

> Server running on http://localhost:3000
> Connected to the SQLite database.

## API Documentation

**Base URL:** `http://localhost:3000`

### 1\. Create a Bookmark

Creates a new bookmark.

  * **Endpoint:** `POST /bookmarks`
  * **Content-Type:** `application/json`
  * **Request Body:**
    ```json
    {
      "url": "[https://www.google.com](https://www.google.com)",
      "title": "Google",
      "description": "Search engine"
    }
    ```
  * **Success Response (201 Created):**
    ```json
    {
      "id": 1,
      "url": "[https://www.google.com](https://www.google.com)",
      "title": "Google",
      "description": "Search engine",
      "created_at": "2025-12-14T10:00:00.000Z"
    }
    ```
  * **Error Response (400 Bad Request):**
    ```json
    { "errors": ["Valid URL is required."] }
    ```

### 2\. Get All Bookmarks

Retrieves a list of all saved bookmarks.

  * **Endpoint:** `GET /bookmarks`
  * **Success Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "url": "[https://www.google.com](https://www.google.com)",
        "title": "Google",
        "description": "Search engine",
        "created_at": "2025-12-14T10:00:00.000Z"
      }
    ]
    ```

### 3\. Get Bookmark by ID

Retrieves a single bookmark by its unique ID.

  * **Endpoint:** `GET /bookmarks/:id`
  * **Example:** `GET /bookmarks/1`
  * **Success Response (200 OK):**
    ```json
    {
      "id": 1,
      "url": "[https://www.google.com](https://www.google.com)",
      "title": "Google",
      "description": "Search engine",
      "created_at": "2025-12-14T10:00:00.000Z"
    }
    ```
  * **Error Response (404 Not Found):**
    ```json
    { "error": "Bookmark not found" }
    ```

### 4\. Update Bookmark

Updates an existing bookmark's details.

  * **Endpoint:** `PUT /bookmarks/:id`
  * **Content-Type:** `application/json`
  * **Request Body:**
    ```json
    {
      "url": "[https://www.google.co.in](https://www.google.co.in)",
      "title": "Google India",
      "description": "Updated description"
    }
    ```
  * **Success Response (200 OK):**
    ```json
    {
      "id": 1,
      "url": "[https://www.google.co.in](https://www.google.co.in)",
      "title": "Google India",
      "description": "Updated description",
      "created_at": "2025-12-14T10:00:00.000Z"
    }
    ```
  * **Error Response (404 Not Found):**
    ```json
    { "error": "Bookmark not found" }
    ```

### 5\. Delete Bookmark

Deletes a bookmark by its unique ID.

  * **Endpoint:** `DELETE /bookmarks/:id`
  * **Success Response (204 No Content):** (Empty response body)
  * **Error Response (404 Not Found):**
    ```json
    { "error": "Bookmark not found" }
    ```

## Project Structure

The project follows a modular MVC (Model-View-Controller) architecture to separate concerns:

  - `server.js`: The application entry point.
  - `src/config/database.js`: Manages the SQLite connection and automatic table creation.
  - `src/controllers/`: Contains the logic for handling requests, validation, and responses.
  - `src/models/`: Handles direct database interactions (SQL queries).
  - `src/routes/`: Defines the API endpoints and maps them to the appropriate controller functions.

