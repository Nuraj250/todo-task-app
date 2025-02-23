### **🚀 How to Run the Full Stack To-Do App**

Follow these steps to run the **Flask backend** and **React frontend** for your **Full Stack To-Do App**.

---

## **🖥️ 1. Clone the Repository**
If you haven’t already, clone your project from GitHub:

```sh
git clone https://github.com/Nuraj250/todo-app-fullstack.git
cd todo-app-fullstack
```

---

## **🐍 2. Set Up the Backend (Flask API)**
### **🔹 Step 1: Navigate to the Backend**
```sh
cd backend
```

### **🔹 Step 2: Create a Virtual Environment**
```sh
python -m venv venv
```

### **🔹 Step 3: Activate Virtual Environment**
- **Windows (CMD or PowerShell)**
  ```sh
  venv\Scripts\activate
  ```
- **Mac/Linux**
  ```sh
  source venv/bin/activate
  ```

### **🔹 Step 4: Install Dependencies**
```sh
pip install -r requirements.txt
```

### **🔹 Step 5: Set Up Environment Variables**
Create a **.env** file inside the `backend/` directory and add:

```ini
DATABASE_URL=mysql://your_user:your_password@localhost/todo_db
SECRET_KEY=your_secret_key
```

Make sure MySQL is running and the `todo_db` database exists.

### **🔹 Step 6: Initialize the Database**
```sh
python -c "from src.app import db, app; with app.app_context(): db.create_all()"
```

### **🔹 Step 7: Run the Flask Server**
```sh
python src/app.py
```

The backend will start on **`http://127.0.0.1:5000`**.

---

## **⚛️ 3. Set Up the Frontend (React App)**
### **🔹 Step 1: Navigate to the Frontend**
```sh
cd ../frontend
```

### **🔹 Step 2: Install Dependencies**
```sh
npm install
```

### **🔹 Step 3: Start the React App**
```sh
npm start
```

The frontend will start on **`http://localhost:3000`**.

---

## **📌 4. Test the App**
- Open **`http://localhost:3000`** in your browser.
- Add tasks, edit, complete, and delete them.
- Check **Task History** to see completed tasks.
- Use **Dark Mode Toggle** for a better experience.

---

## **🐞 5. Troubleshooting**
| Issue | Solution |
|--------|----------|
| Backend not starting? | Check `.env` file and MySQL connection |
| Frontend blank? | Run `npm install` again |
| Tasks not saving? | Ensure backend is running on **`5000`** |
| "ModuleNotFoundError" in Python? | Run `pip install -r requirements.txt` |

---

Everything should now be working! 🚀🎉  
Let me know if you face any issues.