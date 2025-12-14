# Personal Bookmarks API

A RESTful API built with Node.js, Express, and SQLite for managing personal URL bookmarks. This project is designed to demonstrate backend development fundamentals, including RESTful architecture, CRUD operations, input validation, and data persistence.

## Project Overview

This API allows users to store, retrieve, update, and delete bookmarks. It features:
* **MVC Architecture:** A logical separation of concerns (Models, Views/Controllers, Routes).
* **Data Persistence:** Uses SQLite (`bookmarks.db`) to ensure data remains available after server restarts.
* **Input Validation:** Robust checks for required fields and valid URL formats.
* **Standardized Responses:** consistent JSON structures for success and error states.

## Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher)
* [npm](https://www.npmjs.com/) (included with Node.js)

## Installation & Setup

1.  **Clone the repository** (or download source):
    ```bash
    git clone https://github.com/sunil-polupalli/bookmarks-api.git
    cd bookmarks-api
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Database Initialization**:
    * **No manual setup is required.**
    * The application automatically checks for the `bookmarks.db` file in the root directory.
    * If missing, it creates the file and initializes the `bookmarks` table with the correct schema on the first run.

## Running the Application

To start the server:

```bash
node server.js
```

**Expected Output:**

> Server running on http://localhost:3000
> Connected to the SQLite database.

## Database Schema

The SQLite database contains a single table `bookmarks`:

| Column        | Type    | Description                                      |
| :---          | :---    | :---                                             |
| `id`          | INTEGER | Primary Key, Auto-incremented.                   |
| `url`         | TEXT    | Required. The link to the bookmark.              |
| `title`       | TEXT    | Required. A short name for the bookmark.         |
| `description` | TEXT    | Optional. Additional details.                    |
| `created_at`  | TEXT    | Required. ISO 8601 Timestamp of creation.        |

## API Documentation

**Base URL:** `http://localhost:3000`

### 1\. Create a Bookmark

  * **Method:** `POST`
  * **Endpoint:** `/bookmarks`
  * **Description:** Creates a new bookmark.
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
    { "errors": ["Valid URL is required.", "Title is required."] }
    ```

### 2\. Get All Bookmarks

  * **Method:** `GET`
  * **Endpoint:** `/bookmarks`
  * **Description:** Retrieves all stored bookmarks.
  * **Success Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "url": "[https://www.google.com](https://www.google.com)",
        "title": "Google",
        ...
      }
    ]
    ```

### 3\. Get Bookmark by ID

  * **Method:** `GET`
  * **Endpoint:** `/bookmarks/:id`
  * **Description:** Retrieves a specific bookmark.
  * **Success Response (200 OK):** Returns the bookmark object.
  * **Error Response (404 Not Found):**
    ```json
    { "error": "Bookmark not found" }
    ```

### 4\. Update Bookmark

  * **Method:** `PUT`
  * **Endpoint:** `/bookmarks/:id`
  * **Description:** Updates an existing bookmark.
  * **Request Body:** Same as Create (must include url and title).
  * **Success Response (200 OK):** Returns the updated object.
  * **Error Response (404 Not Found)** or **(400 Bad Request)**.

### 5\. Delete Bookmark

  * **Method:** `DELETE`
  * **Endpoint:** `/bookmarks/:id`
  * **Description:** Permanently removes a bookmark.
  * **Success Response (204 No Content):** Empty body.
  * **Error Response (404 Not Found):**
    ```json
    { "error": "Bookmark not found" }
    ```

## Testing Guide (cURL)

You can verify the API functionality using these commands (Command Prompt):

**Create:**

```bash
curl -X POST http://localhost:3000/bookmarks -H "Content-Type: application/json" -d "{\"url\": \"[https://example.com](https://example.com)\", \"title\": \"Example\"}"
```

**Get All:**

```bash
curl http://localhost:3000/bookmarks
```

**Delete (ID 1):**

```bash
curl -X DELETE http://localhost:3000/bookmarks/1
```

## Project Structure (MVC)

  * `server.js`: Application entry point.
  * `src/config/database.js`: SQLite connection and schema definition.
  * `src/controllers/`: Business logic and input validation.
  * `src/models/`: SQL queries and database interaction.
  * `src/routes/`: API route definitions.

