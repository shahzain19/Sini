const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const db = new Database(path.join(__dirname, 'portfolio.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    link TEXT,
    category TEXT DEFAULT 'Full-Stack',
    tech TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_token TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Add new columns if they don't exist (migration)
try {
  db.exec(`
    ALTER TABLE projects ADD COLUMN category TEXT DEFAULT 'Full-Stack';
  `);
} catch (error) {
  // Column already exists, ignore error
}

try {
  db.exec(`
    ALTER TABLE projects ADD COLUMN tech TEXT DEFAULT '[]';
  `);
} catch (error) {
  // Column already exists, ignore error
}

// Prepared statements
const statements = {
  // Projects
  getAllProjects: db.prepare('SELECT * FROM projects ORDER BY created_at DESC'),
  getProjectById: db.prepare('SELECT * FROM projects WHERE id = ?'),
  insertProject: db.prepare(`
    INSERT INTO projects (title, description, image, link, category, tech)
    VALUES (?, ?, ?, ?, ?, ?)
  `),
  updateProject: db.prepare(`
    UPDATE projects 
    SET title = ?, description = ?, image = ?, link = ?, category = ?, tech = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  deleteProject: db.prepare('DELETE FROM projects WHERE id = ?'),
  
  // Admin sessions
  createSession: db.prepare(`
    INSERT INTO admin_sessions (session_token, expires_at)
    VALUES (?, ?)
  `),
  getSession: db.prepare('SELECT * FROM admin_sessions WHERE session_token = ? AND expires_at > CURRENT_TIMESTAMP'),
  deleteSession: db.prepare('DELETE FROM admin_sessions WHERE session_token = ?'),
  cleanExpiredSessions: db.prepare('DELETE FROM admin_sessions WHERE expires_at <= CURRENT_TIMESTAMP'),
  
  // Announcements
  getAllAnnouncements: db.prepare('SELECT * FROM announcements ORDER BY created_at DESC'),
  getActiveAnnouncements: db.prepare('SELECT * FROM announcements WHERE is_active = 1 ORDER BY created_at DESC'),
  getAnnouncementById: db.prepare('SELECT * FROM announcements WHERE id = ?'),
  insertAnnouncement: db.prepare(`
    INSERT INTO announcements (title, content, is_active)
    VALUES (?, ?, ?)
  `),
  updateAnnouncement: db.prepare(`
    UPDATE announcements 
    SET title = ?, content = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  deleteAnnouncement: db.prepare('DELETE FROM announcements WHERE id = ?')
};

module.exports = { db, statements };