# 🗂️ Kanban Task Board

A modern **Kanban-style task management app** built with **Next.js, React Query, Zustand, and Material UI**.  
It lets users create, search, move, and delete tasks across workflow stages — similar to Jira or Trello.

---

## 🚀 Features

✅ **4-Column Kanban Board**
- Backlog, In Progress, Review, Done

✅ **Task Management**
- Create, edit, delete, drag & drop tasks  
- Auto-update column on drop  
- React Query handles caching and optimistic updates

✅ **Search**
- Real-time filtering across all columns

✅ **Mock API**
- Powered by `json-server`

✅ **Responsive Design**
- Works on mobile, tablet, and desktop

✅ **Clean Modern UI**
- Styled with Material UI

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | [Next.js 14](https://nextjs.org/) + React |
| State Management | [Zustand](https://github.com/pmndrs/zustand) |
| Data Fetching | [React Query](https://tanstack.com/query/latest) |
| UI Library | [Material UI](https://mui.com/) |
| Mock API | [json-server](https://github.com/typicode/json-server) |
| Drag & Drop | [@dnd-kit/core](https://docs.dndkit.com/) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/kanban-board.git
cd kanban-board

### 2️⃣ Install dependencies

npm install


### 3️⃣ Run mock backend (json-server)

npm run mock:server

✅ Server runs at: http://localhost:4000/tasks


### 4️⃣ Run the frontend

npm run dev

✅ App runs at: http://localhost:3000
