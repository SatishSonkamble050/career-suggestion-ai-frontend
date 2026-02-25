# Database Quick Reference Guide

## 📋 Overview
This guide provides quick access to critical database information for the AI Student Assessment Platform.

---

## 🗂️ Tables at a Glance

| Table | Purpose | Key Fields | Records Per User |
|-------|---------|-----------|------------------|
| **users** | Authentication | email, password_hash, name | 1 |
| **student_info** | Personal Info | name, phone, DOB, state, board | 1 |
| **academic_data** | Academic Overview | stream, class, gpa, result | 1 |
| **academic_marks** | Subject Marks | subject, marks, percentage | 5-12 |
| **skill_ratings** | Skills (1-10) | 8 skills with ratings | 1 |
| **interest_responses** | Assessment Responses | questionId, selectedOption | ~20-50 |
| **preferences** | Career Preferences | govt job, relocation, salary | 1 |
| **career_matches** | Career Database | name, description, salary range | ~100+ (reference) |
| **career_recommendations** | Personalized Careers | matchPercentage, ranking | 5-10 |
| **college_suggestions** | College Database | ranking, courses, placement | ~500+ (reference) |
| **career_reports** | Generated Reports | JSONB report data | 1-3 |
| **assessment_progress** | Step Tracking | currentStep, completedSteps | 1 |

---

## 🚀 Quick Setup (PostgreSQL)

```bash
# 1. Create database
createdb ai_student_assessment_db

# 2. Connect and run SQL
psql -U postgres -d ai_student_assessment_db

# 3. Paste all SQL commands from DATABASE_SETUP.md
```

---

## 📊 Data Flow

```
1. User Registration (users table)
   ↓
2. Student Info Entry (student_info table)
   ↓
3. Academic Data Entry (academic_data + academic_marks)
   ↓
4. Skills Assessment (skill_ratings table)
   ↓
5. Interest Questions (interest_responses table)
   ↓
6. Career Preferences (preferences table)
   ↓
7. Generate Recommendations (career_recommendations table)
   ↓
8. Generate Report (career_reports table)
   ↓
9. Update Progress (assessment_progress table)
```

---

## 🔑 Key Fields by Module

### Authentication
- `users.email` - Unique login identifier
- `users.password_hash` - Hashed password (never store plain text)

### Student Profile
- `student_info.name`, `phone`, `date_of_birth`
- `student_info.state`, `board` (CBSE/ICSE/State/IB)

### Academic Performance
- `academic_data.stream` (Science/Commerce/Arts)
- `academic_data.current_class` (10-12)
- `academic_data.gpa` (0-10)
- `academic_marks.subject`, `marks`, `percentage`

### Skills Assessment (1-10 scale)
- Logical Reasoning
- Communication
- Analytical Thinking
- Problem Solving
- Teamwork
- Leadership
- Creativity
- Time Management

### Career Preferences
- Prefer Government Job (boolean)
- Willing to Relocate (boolean)
- Income Expectation (1-100 lakhs)
- Work-Life Balance (high/medium/low)
- Study Abroad (boolean)
- Entrepreneurship (boolean)

---

## 💡 Important Constraints

### Numeric Ranges
- **GPA:** 0-10
- **Marks:** 0-100 (percentage)
- **Skill Ratings:** 1-10
- **Income Expectation:** 1-100 lakhs
- **Match Percentage:** 0-100%
- **Class:** 10-12 only

### Enums
- **Board:** CBSE | ICSE | State Board | IB
- **Stream:** Science | Commerce | Arts
- **Result:** Pass | Fail
- **Work-Life Balance:** high | medium | low
- **College Type:** Government | Private | Deemed

## 🔗 Foreign Key Relationships

```
users (PK: id)
  ├─→ student_info (FK: user_id) [1:1]
  ├─→ academic_data (FK: user_id) [1:1]
      ├─→ academic_marks (FK: academic_data_id) [1:n]
  ├─→ skill_ratings (FK: user_id) [1:1]
  ├─→ interest_responses (FK: user_id) [1:n]
  ├─→ preferences (FK: user_id) [1:1]
  ├─→ career_recommendations (FK: user_id) [1:n]
      └─→ career_matches (FK: career_id) [n:1]
  ├─→ career_reports (FK: user_id) [1:n]
  └─→ assessment_progress (FK: user_id) [1:1]

career_matches (PK: id) - Reference table
college_suggestions (PK: id) - Reference table
```

---

## 📈 Indexing Strategy

| Table | Indexed Columns | Why |
|-------|-----------------|-----|
| users | email, created_at | Fast login, filtering |
| student_info | user_id, email | Foreign key, lookups |
| academic_data | user_id, stream, created_at | Fast queries, filtering |
| academic_marks | academic_data_id, subject | Foreign key, analytics |
| interest_responses | user_id, question_id, category | Foreign key, filtering |
| career_recommendations | user_id, career_id, match_percentage | Foreign key, sorting |
| career_matches | name, employment_rate, growth_rate | Search, analytics |
| college_suggestions | name, state, ranking, type | Search, filtering |
| career_reports | user_id, test_date, created_at | Foreign key, sorting |
| assessment_progress | user_id, current_step | Foreign key, filtering |

---

## 🧪 Test Data Insertion Order

1. **users** - Create user accounts first
2. **student_info** - Add personal info
3. **academic_data** - Add academic overview
4. **academic_marks** - Add subject-wise marks
5. **skill_ratings** - Add skill ratings
6. **interest_responses** - Add assessment answers
7. **preferences** - Add career preferences
8. **career_matches** - Populate career database (reference data)
9. **college_suggestions** - Populate college database (reference data)
10. **career_recommendations** - Generate recommendations
11. **career_reports** - Generate final reports
12. **assessment_progress** - Track completion

---

## 🔍 Most Common Queries

### Get Complete Student Profile
```sql
SELECT * FROM users u
LEFT JOIN student_info si ON u.id = si.user_id
LEFT JOIN academic_data ad ON u.id = ad.user_id
LEFT JOIN skill_ratings sr ON u.id = sr.user_id
LEFT JOIN preferences p ON u.id = p.user_id
WHERE u.id = '{user_id}';
```

### Get Top Career Matches
```sql
SELECT cr.*, cm.* FROM career_recommendations cr
JOIN career_matches cm ON cr.career_id = cm.id
WHERE cr.user_id = '{user_id}' AND is_backup = false
ORDER BY cr.match_percentage DESC
LIMIT 5;
```

### Get Student Marks Summary
```sql
SELECT ad.stream, COUNT(am.id) as subject_count, 
       AVG(am.percentage) as avg_percentage
FROM academic_data ad
LEFT JOIN academic_marks am ON ad.id = am.academic_data_id
WHERE ad.user_id = '{user_id}'
GROUP BY ad.stream;
```

### Get Assessment Completion Rate
```sql
SELECT 
  COUNT(*) as total_users,
  SUM(CASE WHEN assessment_complete = true THEN 1 ELSE 0 END) as completed,
  ROUND(SUM(CASE WHEN assessment_complete = true THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as completion_rate
FROM assessment_progress;
```

---

## 🛠️ Required Tools & Setup

### Database Setup
- PostgreSQL 12+ (or compatible)
- pgAdmin (optional GUI)
- psql CLI tool

### Backend Integration
```javascript
// Example with Node.js/pg library
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
});
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_student_assessment_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_student_assessment_db
DB_USER=postgres
DB_PASSWORD=yourpassword
```

---

## 💾 Backup Commands

```bash
# Full backup
pg_dump -U postgres ai_student_assessment_db > backup.sql

# Backup specific table
pg_dump -U postgres -t users ai_student_assessment_db > users_backup.sql

# Restore
psql -U postgres ai_student_assessment_db < backup.sql

# Restore specific table
psql -U postgres ai_student_assessment_db < users_backup.sql
```

---

## ⚙️ Performance Tips

1. **Use Connection Pooling** - Max pool size: 20-50
2. **Enable Full-Text Search** - For career search optimization
3. **Archive Old Reports** - Move reports >1 year to archive table
4. **Vacuum & Analyze** - Schedule weekly maintenance
5. **Monitor Slow Queries** - Use `log_min_duration_statement`

---

## 🔐 Security Best Practices

1. **Never Store Plain Passwords** - Use bcrypt or Argon2
2. **Use Parameterized Queries** - Prevent SQL injection
3. **Restrict Database Access** - Use role-based permissions
4. **Encrypt Sensitive Data** - PII should be encrypted at rest
5. **Audit Logs** - Track data modifications
6. **HTTPS Only** - For all API endpoints

---

## 📱 Database Schema Version
- **Version:** 1.0
- **Last Updated:** 2026-02-20
- **Compatible With:** Node.js, Python, Java backends
- **Database:** PostgreSQL 12+

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check DB running, host, port, credentials |
| Constraint violations | Verify enum values, numeric ranges, foreign keys |
| Slow queries | Check indexes, run ANALYZE, check query plan with EXPLAIN |
| Disk space | Archive old records, increase storage, vacuum database |
| Duplicate entries | Check UNIQUE constraints, add IF NOT EXISTS clauses |

---

## 📞 Support Resources

- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Database Setup Doc](./DATABASE_SETUP.md) - Full documentation
- Connection String Examples: See environment setup section above

