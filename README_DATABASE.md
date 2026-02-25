# Database Documentation - Getting Started

## 📚 Files Created

I've created comprehensive database documentation for your AI Student Assessment Platform with all fields and tables. Here's what you have:

### 1. **DATABASE_SETUP.md** (Main Documentation)
Complete reference with:
- ✅ Database overview and structure
- ✅ All 12 table definitions with constraints
- ✅ Data relationships and ER diagram
- ✅ Complete SQL scripts for table creation
- ✅ Index strategies and optimization
- ✅ Sample data insertions
- ✅ Common queries
- ✅ Migration steps
- ✅ Backup/recovery procedures

### 2. **DATABASE_QUICK_REFERENCE.md** (Quick Access)
Fast lookup guide containing:
- ✅ Tables at a glance
- ✅ Field reference by module
- ✅ Important constraints
- ✅ Foreign key relationships
- ✅ Most common queries
- ✅ Troubleshooting tips

### 3. **database_setup.sql** (Ready-to-Run Script)
Complete SQL script with:
- ✅ Database creation
- ✅ All table definitions
- ✅ Indexes and performance optimization
- ✅ Triggers for auto-timestamps
- ✅ Sample test data
- ✅ View definitions
- ✅ Verification queries

---

## 🚀 Quick Start (3 Steps)

### Step 1: Create Database
```bash
# Open PostgreSQL and run:
psql -U postgres
```

### Step 2: Run SQL Script
```bash
# In PostgreSQL console:
\i database_setup.sql

# OR from command line:
psql -U postgres -f database_setup.sql
```

### Step 3: Verify Installation
```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check records (should show sample data)
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM career_matches;
```

---

## 📊 Database Structure Overview

```
Database: ai_student_assessment_db

Core Tables:
├── users (1) ──────────── (1) student_info
├── users (1) ──────────── (1) academic_data ──── (n) academic_marks
├── users (1) ──────────── (1) skill_ratings
├── users (1) ──────────── (n) interest_responses
├── users (1) ──────────── (1) preferences
├── users (1) ──────────── (n) career_recommendations ──── career_matches
├── users (1) ──────────── (n) career_reports
└── users (1) ──────────── (1) assessment_progress

Reference Tables:
├── career_matches (500+ records)
└── college_suggestions (500+ records)
```

---

## 🗂️ Tables Summary

| # | Table | Records/User | Purpose |
|---|-------|---|---------|
| 1 | **users** | 1 | Authentication & accounts |
| 2 | **student_info** | 1 | Personal information |
| 3 | **academic_data** | 1 | Academic overview |
| 4 | **academic_marks** | 5-12 | Subject marks |
| 5 | **skill_ratings** | 1 | 8 skills (1-10 scale) |
| 6 | **interest_responses** | 20-50 | Assessment answers |
| 7 | **preferences** | 1 | Career preferences |
| 8 | **career_matches** | ~Ref | Career database |
| 9 | **career_recommendations** | 5-10 | Personalized matches |
| 10 | **college_suggestions** | ~Ref | College database |
| 11 | **career_reports** | 1-3 | Generated reports |
| 12 | **assessment_progress** | 1 | Step tracking |

---

## 🔑 Key Fields by Module

### 📱 Authentication
- `users.email` - Login identifier
- `users.password_hash` - Encrypted password

### 👤 Student Profile  
- Name, Phone, Date of Birth
- State, Board (CBSE/ICSE/IB)

### 🎓 Academic Data
- Stream (Science/Commerce/Arts)
- Class (10-12)
- GPA (0-10)
- Subject marks with percentages

### 🧠 Skills (1-10 Scale)
- Logical Reasoning
- Communication
- Analytical Thinking
- Problem Solving
- Teamwork
- Leadership
- Creativity
- Time Management

### 💼 Career Preferences
- Prefer government job (Yes/No)
- Willing to relocate (Yes/No)
- Income expectation (1-100 lakhs)
- Work-life balance (high/medium/low)
- Study abroad (Yes/No)
- Entrepreneurship (Yes/No)

---

## 📈 Data Flow in Application

```
1. User Sign-up
   └─ Create in users table

2. Enter Student Info
   └─ Create in student_info table

3. Enter Academic Data
   └─ Create records in academic_data + academic_marks

4. Rate Skills
   └─ Create record in skill_ratings

5. Answer Interest Questions
   └─ Create in interest_responses (multiple rows)

6. Set Preferences
   └─ Create in preferences table

7. Generate Recommendations
   └─ Create in career_recommendations table
   └─ Match with career_matches table

8. Generate Report
   └─ Create in career_reports table
   └─ Create in assessment_progress table (mark complete)
```

---

## 💾 Backup & Recovery

```bash
# Full backup
pg_dump -U postgres ai_student_assessment_db > backup.sql

# Backup specific table
pg_dump -U postgres -t users ai_student_assessment_db > users_backup.sql

# Restore
psql -U postgres ai_student_assessment_db < backup.sql
```

---

## 📋 Important Constraints

### Numeric Constraints
- GPA: 0-10
- Marks: 0-100%  
- Skill Ratings: 1-10
- Income: 1-100 lakhs
- Match Percentage: 0-100%

### Enum Constraints
- **Board:** CBSE | ICSE | State Board | IB
- **Stream:** Science | Commerce | Arts
- **Result:** Pass | Fail
- **Work-Life Balance:** high | medium | low
- **College Type:** Government | Private | Deemed

---

## 🔍 Most Used Queries

### Get Complete Student Profile
```sql
SELECT * FROM users u
LEFT JOIN student_info si ON u.id = si.user_id
LEFT JOIN academic_data ad ON u.id = ad.user_id
LEFT JOIN skill_ratings sr ON u.id = sr.user_id
WHERE u.email = 'student@example.com';
```

### Get Top 5 Career Recommendations
```sql
SELECT cr.*, cm.* FROM career_recommendations cr
JOIN career_matches cm ON cr.career_id = cm.id
WHERE cr.user_id = 'user-id'
ORDER BY cr.match_percentage DESC
LIMIT 5;
```

### Get Assessment Completion Rate
```sql
SELECT 
  COUNT(*) as total_students,
  SUM(CASE WHEN assessment_complete = true THEN 1 ELSE 0 END) as completed,
  ROUND(SUM(CASE WHEN assessment_complete = true THEN 1 ELSE 0 END)::numeric / 
        COUNT(*) * 100, 2) as completion_rate
FROM assessment_progress;
```

---

## 🛠️ Environment Variables

```env
# .env.local
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_student_assessment_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_student_assessment_db
DB_USER=postgres
DB_PASSWORD=your_password
NODE_ENV=development
```

---

## 📱 Integration with Your App

### Node.js/Express Example
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Get student profile
app.get('/api/student/:userId', async (req, res) => {
  const query = `
    SELECT * FROM users u
    LEFT JOIN student_info si ON u.id = si.user_id
    WHERE u.id = $1
  `;
  const result = await pool.query(query, [req.params.userId]);
  res.json(result.rows[0]);
});
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Database created successfully
- [ ] All 12 tables exist
- [ ] All indexes created
- [ ] Sample data inserted
- [ ] Can connect from application
- [ ] Can query tables without errors
- [ ] Triggers working (check updated_at changes)

---

## 🆘 Troubleshooting

### Connection Failed
- Check PostgreSQL is running
- Verify credentials in .env
- Check firewall/ports (5432)

### Table Doesn't Exist
- Verify SQL script ran completely
- Check for error messages during execution
- Re-run with: `psql -f database_setup.sql`

### Constraint Violations
- Check enum values are correct
- Verify numeric ranges (GPA 0-10, Marks 0-100)
- Check foreign key references exist

### Performance Issues
- Verify indexes created: `SELECT * FROM pg_indexes;`
- Run `VACUUM ANALYZE;` periodically
- Check slow queries with `EXPLAIN ANALYZE`

---

## 📚 Documentation Files

| File | Purpose | Best For |
|------|---------|----------|
| DATABASE_SETUP.md | Complete reference | Understanding schema design |
| DATABASE_QUICK_REFERENCE.md | Fast lookup | Quick facts and queries |
| database_setup.sql | Executable script | Setting up database |
| README.md (this file) | Getting started | First-time setup |

---

## 🔐 Security Notes

1. **Never commit `.env`** with passwords to Git
2. **Use bcrypt** for password hashing (costs factor: 10+)
3. **Use parameterized queries** to prevent SQL injection
4. **Encrypt PII** if stored in database
5. **Restrict database access** to authorized users only
6. **Use HTTPS** for all API calls
7. **Implement rate limiting** on API endpoints

---

## 📞 Need Help?

Refer to:
1. **DATABASE_SETUP.md** - For detailed schema documentation
2. **DATABASE_QUICK_REFERENCE.md** - For quick facts
3. **database_setup.sql** - For table definitions and structure
4. **PostgreSQL Official Docs** - https://www.postgresql.org/docs/

---

## Version Info

- **Schema Version:** 1.0
- **Created:** February 20, 2026
- **Database:** PostgreSQL 12+
- **Tables:** 12
- **Indexes:** 28+
- **Sample Data:** Included

---

**Happy Database Setup! 🚀**
