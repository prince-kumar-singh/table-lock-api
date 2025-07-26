# Table Lock API

A simple RESTful API for managing table locks, built with Node.js and Express. This API allows clients to lock and unlock tables for a specified duration, and to check the lock status of a table. Useful for collaborative applications where resource contention must be managed.

## Features

- Lock a table for a specific user and duration
- Unlock a table by the locking user
- Check if a table is currently locked
- Automatic expiration of locks after the specified duration

## File Structure

```
.
├── table-lock-api.postman_collection.json
├── package.json
├── Readme.md
├── server.js
├── .gitignore
├── routes/
│   └── tables.js
└── utils/
    └── lockStore.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository or download the source code.
2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Server

Start the server with:

```sh
npm start
```

The API will be available at `http://localhost:3000/`.

## API Endpoints

### 1. Lock a Table

**POST** `/api/tables/lock`

**Request Body:**
```json
{
  "tableId": "table-123",
  "userId": "user-abc",
  "duration": 600
}
```
- `tableId`: ID of the table to lock (string, required)
- `userId`: ID of the user requesting the lock (string, required)
- `duration`: Lock duration in seconds (number, required)

**Responses:**
- `200 OK`: Table locked successfully
- `400 Bad Request`: Missing parameters
- `409 Conflict`: Table is already locked

---

### 2. Unlock a Table

**POST** `/api/tables/unlock`

**Request Body:**
```json
{
  "tableId": "table-123",
  "userId": "user-abc"
}
```
- `tableId`: ID of the table to unlock (string, required)
- `userId`: ID of the user unlocking (string, required)

**Responses:**
- `200 OK`: Table unlocked successfully
- `400 Bad Request`: Missing parameters
- `403 Forbidden`: Unlock failed (unauthorized or not locked)

---

### 3. Get Table Lock Status

**GET** `/api/tables/:tableId/status`

**Response:**
```json
{
  "isLocked": true
}
```
- `isLocked`: Boolean indicating if the table is currently locked

---

## Testing

A [Postman collection](table-lock-api.postman_collection.json) is included for easy testing of the API endpoints.

---