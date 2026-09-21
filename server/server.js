require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
res.send("FeyaPlan API is running!");
});


app.post("/api/auth/register", async (req, res) => {
try {

const { name, email, password } = req.body;

if (!name || !email || !password) {
  return res.status(400).json({
    error: "Name, email and password are required"
  });
}

const existingUser = await pool.query(
  "SELECT id FROM users WHERE email = $1",
  [email]
);

if (existingUser.rows.length > 0) {
  return res.status(409).json({
    error: "Email already registered"
  });
}

const passwordHash = await bcrypt.hash(password, 10);

const result = await pool.query(
  `INSERT INTO users (name, email, password_hash)
   VALUES ($1, $2, $3)
   RETURNING id, name, email`,
  [name, email, passwordHash]
);

res.status(201).json(result.rows[0]);


} catch (error) {

console.error("REGISTRATION ERROR:", error);

res.status(500).json({
  error: "Registration failed"
});


}
});

app.post("/api/auth/login", async (req, res) => {
try {

const { email, password } = req.body;

if (!email || !password) {
  return res.status(400).json({
    error: "Email and password are required"
  });
}

const result = await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

if (result.rows.length === 0) {
  return res.status(401).json({
    error: "Invalid email or password"
  });
}

const user = result.rows[0];

const passwordMatch = await bcrypt.compare(
  password,
  user.password_hash
);

if (!passwordMatch) {
  return res.status(401).json({
    error: "Invalid email or password"
  });
}

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    phone: user.phone,
    job_title: user.job_title,
    bio: user.bio
  }
});


} catch (error) {

console.error("LOGIN ERROR:", error);

res.status(500).json({
  error: "Login failed"
});


}
});


app.put("/api/users/profile", authenticateToken, async (req, res) => {

try {

const {
  name,
  email,
  phone,
  jobTitle,
  bio
} = req.body;

if (!name || !email) {
  return res.status(400).json({
    error: "Name and email are required"
  });
}

const result = await pool.query(
  `UPDATE users
   SET name = $1,
       email = $2,
       phone = $3,
       job_title = $4,
       bio = $5,
       updated_at = NOW()
   WHERE id = $6
   RETURNING id, name, email, avatar, phone, job_title, bio`,
  [
    name,
    email,
    phone || null,
    jobTitle || null,
    bio || null,
    req.user.userId
  ]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "User not found"
  });
}

res.json(result.rows[0]);


} catch (error) {

console.error("PROFILE UPDATE ERROR:", error);

if (error.code === "23505") {
  return res.status(409).json({
    error: "Email already registered"
  });
}

res.status(500).json({
  error: "Profile update failed"
});


}
});


app.put("/api/users/password", authenticateToken, async (req, res) => {

try {

const {
  currentPassword,
  newPassword
} = req.body;

if (!currentPassword || !newPassword) {
  return res.status(400).json({
    error: "Current password and new password are required"
  });
}

if (newPassword.length < 6) {
  return res.status(400).json({
    error: "Password must be at least 6 characters"
  });
}

const result = await pool.query(
  "SELECT password_hash FROM users WHERE id = $1",
  [req.user.userId]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "User not found"
  });
}

const user = result.rows[0];

const passwordMatch = await bcrypt.compare(
  currentPassword,
  user.password_hash
);

if (!passwordMatch) {
  return res.status(401).json({
    error: "Current password is incorrect"
  });
}

const newPasswordHash = await bcrypt.hash(
  newPassword,
  10
);

await pool.query(
  `UPDATE users
   SET password_hash = $1,
       updated_at = NOW()
   WHERE id = $2`,
  [
    newPasswordHash,
    req.user.userId
  ]
);

res.json({
  message: "Password updated successfully"
});


} catch (error) {

console.error("PASSWORD UPDATE ERROR:", error);

res.status(500).json({
  error: "Password update failed"
});


}
});


app.get("/api/projects", authenticateToken, async (req, res) => {

try {

const result = await pool.query(
  "SELECT * FROM projects WHERE user_id = $1",
  [req.user.userId]
);

console.log("DATABASE RESULT:", result.rows);

res.json(result.rows);


} catch (error) {

console.error("DATABASE ERROR:", error);

res.status(500).json({
  error: "Database error"
});


}
});

app.post("/api/projects", authenticateToken, async (req, res) => {

try {

const {
  name,
  description,
  status,
  priority,
  due_date
} = req.body;

const result = await pool.query(
  `INSERT INTO projects
   (name, description, status, priority, due_date, user_id)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING *`,
  [
    name,
    description,
    status,
    priority,
    due_date,
    req.user.userId
  ]
);

res.status(201).json(result.rows[0]);


} catch (error) {

console.error("DATABASE ERROR:", error);

res.status(500).json({
  error: "Database error"
});


}
});

app.delete("/api/projects/:id", authenticateToken, async (req, res) => {

try {

const { id } = req.params;

const result = await pool.query(
  `DELETE FROM projects
   WHERE id = $1
     AND user_id = $2
   RETURNING *`,
  [
    id,
    req.user.userId
  ]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Project not found"
  });
}

res.json(result.rows[0]);


} catch (error) {

console.error("DATABASE ERROR:", error);

res.status(500).json({
  error: "Database error"
});


}
});

app.put("/api/projects/:id", authenticateToken, async (req, res) => {

try {

const { id } = req.params;

const {
  name,
  description,
  status,
  priority,
  due_date
} = req.body;

const result = await pool.query(
  `UPDATE projects
   SET name = $1,
       description = $2,
       status = $3,
       priority = $4,
       due_date = $5
   WHERE id = $6
     AND user_id = $7
   RETURNING *`,
  [
    name,
    description,
    status,
    priority,
    due_date,
    id,
    req.user.userId
  ]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Project not found"
  });
}

res.json(result.rows[0]);


} catch (error) {

console.error("DATABASE ERROR:", error);

res.status(500).json({
  error: "Database error"
});


}
});


app.get("/api/tasks", authenticateToken, async (req, res) => {

try {

const result = await pool.query(
  `SELECT
      id,
      title,
      description,
      status,
      priority,
      progress,
      due_date,
      created_at,
      project_id,
      user_id
   FROM tasks
   WHERE user_id = $1
   ORDER BY created_at DESC`,
  [req.user.userId]
);

res.json(result.rows);


} catch (error) {

console.error("TASK FETCH ERROR:", error);

res.status(500).json({
  error: "Failed to fetch tasks"
});


}
});


app.post("/api/tasks", authenticateToken, async (req, res) => {

try {

const {
  title,
  description,
  status,
  priority,
  progress,
  due_date,
  project_id
} = req.body;

if (!title || !project_id) {
  return res.status(400).json({
    error: "Title and project are required"
  });
}

const projectCheck = await pool.query(
  `SELECT id
   FROM projects
   WHERE id = $1
     AND user_id = $2`,
  [
    project_id,
    req.user.userId
  ]
);

if (projectCheck.rows.length === 0) {
  return res.status(403).json({
    error: "Project does not belong to this user"
  });
}

const result = await pool.query(
  `INSERT INTO tasks
   (
     title,
     description,
     status,
     priority,
     progress,
     due_date,
     user_id,
     project_id
   )
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
   RETURNING *`,
  [
    title,
    description || null,
    status || "To Do",
    priority || "Medium",
    progress ?? 0,
    due_date || null,
    req.user.userId,
    project_id
  ]
);

res.status(201).json(result.rows[0]);


} catch (error) {

console.error("TASK CREATE ERROR:", error);

res.status(500).json({
  error: "Failed to create task"
});


}
});

app.put("/api/tasks/:id", authenticateToken, async (req, res) => {

try {

    const { id } = req.params;

    const {
        title,
        description,
        status,
        priority,
        progress,
        due_date,
        project_id
    } = req.body;


    if (!title || !project_id) {

        return res.status(400).json({
            error: "Title and project are required"
        });

    }


    const taskProgress = progress ?? 0;


    if (
        typeof taskProgress !== "number" ||
        taskProgress < 0 ||
        taskProgress > 100
    ) {

        return res.status(400).json({
            error: "Progress must be between 0 and 100"
        });

    }


    const projectCheck = await pool.query(
        `SELECT id
         FROM projects
         WHERE id = $1
           AND user_id = $2`,
        [
            project_id,
            req.user.userId
        ]
    );


    if (projectCheck.rows.length === 0) {

        return res.status(403).json({
            error: "Project does not belong to this user"
        });

    }


    const result = await pool.query(
        `UPDATE tasks
         SET title = $1,
             description = $2,
             status = $3,
             priority = $4,
             progress = $5,
             due_date = $6,
             project_id = $7
         WHERE id = $8
           AND user_id = $9
         RETURNING *`,
        [
            title,
            description || null,
            status || "To Do",
            priority || "Medium",
            taskProgress,
            due_date || null,
            project_id,
            id,
            req.user.userId
        ]
    );


    if (result.rows.length === 0) {

        return res.status(404).json({
            error: "Task not found"
        });

    }


    res.json(result.rows[0]);


} catch (error) {

    console.error("TASK UPDATE ERROR:", error);

    res.status(500).json({
        error: "Failed to update task"
    });

}


});

app.delete("/api/tasks/:id", authenticateToken, async (req, res) => {

try {

const { id } = req.params;

const result = await pool.query(
  `DELETE FROM tasks
   WHERE id = $1
     AND user_id = $2
   RETURNING *`,
  [
    id,
    req.user.userId
  ]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Task not found"
  });
}

res.json(result.rows[0]);


} catch (error) {

console.error("TASK DELETE ERROR:", error);

res.status(500).json({
  error: "Failed to delete task"
});


}
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
