### **📜 Full Stack To-Do App - README**  

# **Full Stack To-Do App**  
A full-stack task management application built using **Flask (Python) for the backend, React (JavaScript) for the frontend, and MySQL for the database**.  

---

## **📌 Features**  

### **🖥️ Backend (Flask API)**
✅ REST API with Flask & Flask-SQLAlchemy  
✅ CRUD operations for managing tasks  
✅ MySQL database for persistent storage  
✅ Task categorization (**Work, Personal, Urgent**)  
✅ Task **due date & time** stored properly  
✅ Task completion updates the **finished date & time**  
✅ CORS enabled for frontend integration  

### **⚛️ Frontend (React)**
✅ React-based UI with **Material UI** components  
✅ Task list with color-coded categories:  
   - 🔴 **Urgent (Red)**  
   - 🟡 **Work (Yellow)**  
   - 🟣 **Personal (Pink)**  
✅ View, Edit, and Delete task options  
✅ **Task Details Modal** for easy viewing  
✅ **Drag & Drop Task Reordering** using React DnD  
✅ Dark Mode Toggle 🌙  
✅ Toast notifications for task actions  

### **🗄️ Database (MySQL)**
✅ Uses **Flask-SQLAlchemy** for ORM  
✅ Stores task **title, description, category, due date, due time**  
✅ **Tracks finished date & time** when task is marked complete  
✅ Retrieves **completed tasks with timestamp**  

---

## **📂 Project Structure**  

```
todo-app-fullstack/
├── backend/                 # Flask API
│   ├── src/
│   │   ├── models.py        # Database models
│   │   ├── routes.py        # API routes
│   │   ├── app.py           # Flask server
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables
│   ├── README.md            # Backend documentation
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # React pages
│   │   ├── App.js           # Main App Component
│   │   ├── api.js           # API integration
│   ├── package.json         # Frontend dependencies
│   ├── README.md            # Frontend documentation
├── docker-compose.yml       # Docker configuration
├── .gitignore
└── README.md                # Full project documentation
```

---

## **🚀 How to Run the Project**  

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Nuraj250/todo-app-fullstack.git
cd todo-app-fullstack
```

### **2️⃣ Set Up the Backend (Flask API)**
```sh
cd backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```

#### **Set Up Database & Environment Variables**
Create a `.env` file inside `backend/` and add:
```ini
DATABASE_URL=mysql://your_user:your_password@localhost/todo_db
SECRET_KEY=your_secret_key
```

#### **Initialize the Database**
```sh
python -c "from src.app import db, app; with app.app_context(): db.create_all()"
```

#### **Run Flask Server**
```sh
python src/app.py
```
Backend will start at: **`http://127.0.0.1:5000`**

---

### **3️⃣ Set Up the Frontend (React)**
```sh
cd ../frontend
npm install
npm start
```
Frontend will start at: **`http://localhost:3000`**

---

## **🔗 API Endpoints**
| HTTP Method | Endpoint | Description |
|------------|----------|-------------|
| **GET** | `/tasks` | Fetch all tasks |
| **POST** | `/tasks` | Add a new task |
| **PUT** | `/tasks/:id/done` | Mark task as completed |
| **PUT** | `/tasks/:id` | Update task |
| **DELETE** | `/tasks/:id` | Delete a task |

---

## **📸 Screenshots**
📷 **Task List with Color-Coded Categories**  
📷 **Task Details Modal**  
📷 **Edit & Update Tasks**  
📷 **Task History with Completed Date**  
📷 **Dark Mode Enabled**  

---

## **🐞 Troubleshooting**
| Issue | Solution |
|-------|----------|
| Backend not starting? | Check `.env` file & MySQL connection |
| React not loading? | Run `npm install` |
| Tasks not saving? | Ensure backend is running on **`5000`** |
| Python module error? | Run `pip install -r requirements.txt` |

---

## **🛠️ Future Enhancements**
- ✅ **User Authentication** (Login/Register)  
- ✅ **Recurring Tasks** (Set repeat intervals)  
- ✅ **Task Sharing via Email**  
- ✅ **Mobile-friendly PWA version**  

---

## **👨‍💻 Contributors**
🚀 Developed by Nuraj  

🙌 Feel free to contribute via **Pull Requests**!

---

## **📜 License**
This project is open-source under the **MIT License**.

---

🚀 **Happy Coding!** 🎉
