# **📌 README for Backend - Full Stack To-Do App**
This README provides a complete guide to the **Flask Backend** of the **Full Stack To-Do App**.

---

## **📌 Project Overview**
The **backend** of this app is built with **Flask** and **MySQL**, providing a REST API for managing tasks.

---

## **📌 Features**
✅ **Task Management (CRUD)**
- Create new tasks  
- Retrieve all tasks  
- Update tasks  
- Delete tasks  

✅ **Task Completion & History**
- Mark a task as **completed**  
- Store **Finished Date & Time** when a task is marked as completed  
- Retrieve a list of **completed tasks**  

✅ **Task Categorization & Due Dates**
- Tasks have categories: **Work, Personal, Urgent**  
- Each task has a **due date and due time**  
- Retrieve tasks with **due dates sorted properly**  

✅ **Database Integration**
- Uses **MySQL with Flask-SQLAlchemy**  
- Stores **title, description, category, due date, due time**  
- Stores **Finished Date & Time** for completed tasks  

✅ **API Endpoints**
- **GET /tasks** → Fetch all active tasks  
- **POST /tasks** → Add a new task  
- **PATCH /tasks/:id/done** → Mark a task as completed  
- **GET /tasks/completed** → Get completed tasks  
- **PUT /tasks/:id** → Update a task  
- **DELETE /tasks/:id** → Delete a task  

✅ **CORS & Environment Configuration**
- **CORS enabled** for frontend integration  
- Uses `.env` file for **database credentials**  

---

## **📌 Folder Structure**
```
backend/
│── src/
│   ├── app.py          # Main application entry point
│   ├── models.py       # Database models (Flask-SQLAlchemy)
│   ├── routes.py       # API routes
│   ├── config.py       # Configuration settings
│   ├── db/             # Database migrations
│── .env                # Environment variables (DB credentials)
│── requirements.txt    # Python dependencies
│── README.md           # Documentation (this file)
```

---

## **📌 Installation & Setup**
### **1️⃣ Install Dependencies**
Make sure you have **Python** installed. Then, install dependencies:

```sh
pip install -r requirements.txt
```

### **2️⃣ Set Up Environment Variables**
Create a `.env` file with your MySQL database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=todo_db
```

### **3️⃣ Run Database Migrations**
Initialize the database:

```sh
python -c "from src.app import db, app; app.app_context().push(); db.create_all()"
```

### **4️⃣ Start the Backend Server**
Run the Flask app:

```sh
python src/app.py
```

The backend will start at:  
📍 **http://127.0.0.1:5000**

---

## **📌 API Endpoints**
### **🔹 1. Get All Tasks**
**Endpoint:** `GET /tasks`  
**Response:**
```json
[
  {
    "id": 1,
    "title": "Meeting",
    "description": "Work meeting",
    "category": "Work",
    "dueDate": "2025-02-22",
    "dueTime": "10:30"
  }
]
```

---

### **🔹 2. Add a New Task**
**Endpoint:** `POST /tasks`  
**Request Body:**
```json
{
  "title": "Meeting",
  "description": "Work meeting",
  "category": "Work",
  "dueDate": "2025-02-22",
  "dueTime": "10:30"
}
```
**Response:**
```json
{ "message": "Task added successfully" }
```

---

### **🔹 3. Mark a Task as Completed**
**Endpoint:** `PATCH /tasks/:id/done`  
**Response:**
```json
{ 
  "message": "Task marked as completed",
  "finishedDate": "2025-02-22",
  "finishedTime": "15:45"
}
```

---

### **🔹 4. Get Completed Tasks**
**Endpoint:** `GET /tasks/completed`  
**Response:**
```json
[
  {
    "id": 1,
    "title": "Meeting",
    "category": "Work",
    "completedDate": "2025-02-22",
    "completedTime": "15:45"
  }
]
```

---

### **🔹 5. Update a Task**
**Endpoint:** `PUT /tasks/:id`  
**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated details",
  "category": "Personal",
  "dueDate": "2025-02-25",
  "dueTime": "12:00"
}
```
**Response:**
```json
{ "message": "Task updated successfully" }
```

---

### **🔹 6. Delete a Task**
**Endpoint:** `DELETE /tasks/:id`  
**Response:**
```json
{ "message": "Task deleted successfully" }
```

---

## **📌 Technologies Used**
🔹 **Python & Flask** - Backend Framework  
🔹 **Flask-SQLAlchemy** - ORM for MySQL  
🔹 **Flask-CORS** - Cross-Origin Resource Sharing  
🔹 **MySQL** - Database  
🔹 **dotenv** - Environment variables  

---

## **📌 Future Improvements**
✅ **User Authentication** (JWT-Based)  
✅ **Task Priority Levels** (High, Medium, Low)  
✅ **Recurring Tasks**  

---

## **📌 Contributors**
👨‍💻 Developed by **Nuraj**  

---

## **📌 License**
This project is **MIT licensed**.

---

✅ **Backend is fully documented!** 🚀  
Let me know if you need modifications!