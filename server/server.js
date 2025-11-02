const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { statements } = require("./database");

const app = express();
const PORT = process.env.PORT || 3001;

// Secret passkey for admin access
const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || "admin123"; // Change this to your desired passkey

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Middleware to check admin access
const checkAdminAccess = (req, res, next) => {
  const passkey =
    req.query.passkey || req.body.passkey || req.headers["x-admin-passkey"];

  console.log("Admin access attempt:", {
    provided: passkey ? "***" + passkey.slice(-4) : "none",
    expected: "***" + ADMIN_PASSKEY.slice(-4),
    match: passkey === ADMIN_PASSKEY
  });

  if (passkey !== ADMIN_PASSKEY) {
    return res.status(401).json({ 
      error: "Unauthorized access",
      hint: "Check your passkey parameter"
    });
  }

  next();
};

// Routes

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Get all projects (public)
app.get("/api/projects", (req, res) => {
  try {
    const projects = statements.getAllProjects.all();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Admin routes (protected)
app.post(
  "/api/admin/projects",
  checkAdminAccess,
  upload.single("image"),
  (req, res) => {
    try {
      const { title, description, link, category = 'Full-Stack', tech = '[]' } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const result = statements.insertProject.run(
        title,
        description,
        imagePath,
        link,
        category,
        tech
      );

      res.json({
        id: result.lastInsertRowid,
        message: "Project created successfully",
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: "Failed to create project" });
    }
  }
);

app.put(
  "/api/admin/projects/:id",
  checkAdminAccess,
  upload.single("image"),
  (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, link, category = 'Full-Stack', tech = '[]' } = req.body;

      // Get existing project to preserve image if no new one uploaded
      const existingProject = statements.getProjectById.get(id);
      if (!existingProject) {
        return res.status(404).json({ error: "Project not found" });
      }

      const imagePath = req.file
        ? `/uploads/${req.file.filename}`
        : existingProject.image;

      statements.updateProject.run(title, description, imagePath, link, category, tech, id);

      res.json({ message: "Project updated successfully" });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: "Failed to update project" });
    }
  }
);

app.delete("/api/admin/projects/:id", checkAdminAccess, (req, res) => {
  try {
    const { id } = req.params;

    // Get project to delete associated image file
    const project = statements.getProjectById.get(id);
    if (project && project.image) {
      const imagePath = path.join(__dirname, project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    statements.deleteProject.run(id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Verify admin access
app.post("/api/admin/verify", checkAdminAccess, (req, res) => {
  res.json({ message: "Admin access verified" });
});

// Announcements routes
app.get("/api/announcements", (req, res) => {
  try {
    const announcements = statements.getActiveAnnouncements.all();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

app.get("/api/admin/announcements", checkAdminAccess, (req, res) => {
  try {
    const announcements = statements.getAllAnnouncements.all();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

app.post("/api/admin/announcements", checkAdminAccess, (req, res) => {
  try {
    const { title, content, is_active = true } = req.body;
    const result = statements.insertAnnouncement.run(title, content, is_active);

    res.json({
      id: result.lastInsertRowid,
      message: "Announcement created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

app.put("/api/admin/announcements/:id", checkAdminAccess, (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, is_active } = req.body;

    statements.updateAnnouncement.run(title, content, is_active, id);

    res.json({ message: "Announcement updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update announcement" });
  }
});

app.delete("/api/admin/announcements/:id", checkAdminAccess, (req, res) => {
  try {
    const { id } = req.params;
    statements.deleteAnnouncement.run(id);

    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete announcement" });
  }
});

// Clean up expired sessions periodically
setInterval(() => {
  statements.cleanExpiredSessions.run();
}, 60 * 60 * 1000); // Every hour

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
