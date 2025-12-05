📁 File Management Server

A lightweight Node.js + Express backend for uploading and managing files without a database.
Files are stored on disk, and metadata is saved in data/files.json.

🚀 Features
🔼 File Uploads

Upload single or multiple files

Organize files by category

Auto-renaming using UUIDs

Files stored under /uploads/<category>/

🗂 Metadata Storage

Metadata saved in data/files.json

Acts as a mini JSON “database”

Stores:

id

originalName

storedName

size

mimetype

category

uploadedAt

🔍 File Retrieval

Get all files

Search by filename

Filter by category

Pagination support

🛡 Middleware

Multer (file upload)

express-validator (validation)

Global error handler

🛠 Tech Stack

Node.js

Express.js

Multer

📂 Folder Structure
file-management-server/
│
├── data/
│   └── files.json
│
├── uploads/
│   ├── temp/
│   └── <category>/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── app.js
│
└── package.json

⚙️ Setup
1️⃣ Install
git clone <your-repo-url>
cd file-management-server
npm install

2️⃣ Ensure Required Folders Exist
data/files.json       → should contain: []
uploads/temp/

3️⃣ Start the Server
npm run dev

📤 Uploading Files (Postman)

POST /api/files/upload
Body → form-data

KEY	TYPE	VALUE
files	File	(choose file)
category	Text	images / docs / etc

Add multiple files fields to upload more than one file.

📄 API Endpoints
Upload Files

POST /api/files/upload

Get Files

GET /api/files?query=&category=&page=1&limit=10

Query Params:

query – search by filename

category – filter

page – which page

limit – items per page

🧪 Example Response
{
  "results": [
    {
      "id": "a73d-4b1c-9f",
      "originalName": "photo.png",
      "storedName": "0f44f-b23a.png",
      "size": 188435,
      "mimetype": "image/png",
      "category": "images",
      "uploadedAt": "2025-12-06T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
