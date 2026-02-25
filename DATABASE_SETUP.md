# Database Setup Documentation
## AI Student Career Assessment Platform

This document provides comprehensive database schema and setup instructions for the AI Student Career Assessment Platform.

---

## Table of Contents
1. [Database Overview](#database-overview)
2. [Table Definitions](#table-definitions)
3. [Data Relationships](#data-relationships)
4. [SQL Scripts](#sql-scripts)
5. [Indexes](#indexes)
6. [Sample Data](#sample-data)

---

## Database Overview

**Database Name:** `ai_student_assessment_db`  
**Database Type:** Relational (PostgreSQL recommended)  
**Encoding:** UTF-8  
**Total Tables:** 11  
**Primary Purpose:** Store student assessment data, career recommendations, and educational resources

---

## Table Definitions

### 1. **users** (Authentication & User Management)
Stores user account information and authentication details.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| name | VARCHAR(255) | NOT NULL | User full name |
| created_at | TIMESTAMP | NOT NULL, DEFAULT=NOW() | Account creation date |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT=NOW() | Last updated date |
| is_active | BOOLEAN | DEFAULT=true | Account active status |

**Primary Key:** `id`  
**Indexes:** `email`, `created_at`

---

### 2. **student_info** (Student Basic Information)
Stores personal information of students entering the assessment.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL | Reference to user |
| name | VARCHAR(255) | NOT NULL | Student full name |
| email | VARCHAR(255) | NOT NULL | Student email |
| phone | VARCHAR(20) | NOT NULL | 10-digit phone number |
| date_of_birth | DATE | NOT NULL | Student's date of birth |
| state | VARCHAR(100) | NOT NULL | State of residence |
| board | ENUM('CBSE', 'ICSE', 'State Board', 'IB') | NOT NULL | Educational board |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |
| updated_at | TIMESTAMP | DEFAULT=NOW() | Record update date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Unique Constraint:** `(user_id, email)`  
**Indexes:** `user_id`, `email`

---

### 3. **academic_data** (Academic Performance Overview)
Stores aggregate academic information for students.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL, UNIQUE | Reference to user |
| stream | ENUM('Science', 'Commerce', 'Arts') | NOT NULL | Educational stream |
| current_class | INTEGER | NOT NULL, CHECK (current_class BETWEEN 10 AND 12) | Current class (10-12) |
| gpa | DECIMAL(3,2) | NOT NULL, CHECK (gpa BETWEEN 0 AND 10) | GPA score (0-10) |
| result | ENUM('Pass', 'Fail') | NOT NULL | Academic result |
| strong_subject | VARCHAR(100) | NOT NULL | Strongest subject |
| weak_subject | VARCHAR(100) | NOT NULL | Weakest subject |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |
| updated_at | TIMESTAMP | DEFAULT=NOW() | Record update date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Indexes:** `user_id`, `stream`, `created_at`

---

### 4. **academic_marks** (Detailed Subject Marks)
Stores marks for each subject studied by a student.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| academic_data_id | UUID | FOREIGN KEY (academic_data.id), NOT NULL | Reference to academic data |
| subject | VARCHAR(100) | NOT NULL | Subject name |
| marks | INTEGER | NOT NULL, CHECK (marks BETWEEN 0 AND 100) | Marks obtained |
| max_marks | INTEGER | NOT NULL, CHECK (max_marks > 0) | Maximum possible marks |
| percentage | DECIMAL(5,2) | NOT NULL, CHECK (percentage BETWEEN 0 AND 100) | Percentage score |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |

**Primary Key:** `id`  
**Foreign Key:** `academic_data_id` → `academic_data.id`  
**Unique Constraint:** `(academic_data_id, subject)`  
**Indexes:** `academic_data_id`, `subject`

---

### 5. **skill_ratings** (Student Skills Assessment)
Stores self-rated skills for each student on a scale of 1-10.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL, UNIQUE | Reference to user |
| logical_reasoning | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Logical reasoning rating (1-10) |
| communication | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Communication rating (1-10) |
| analytical_thinking | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Analytical thinking rating (1-10) |
| problem_solving | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Problem-solving rating (1-10) |
| teamwork | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Teamwork rating (1-10) |
| leadership | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Leadership rating (1-10) |
| creativity | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Creativity rating (1-10) |
| time_management | INTEGER | NOT NULL, CHECK (value BETWEEN 1 AND 10) | Time management rating (1-10) |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |
| updated_at | TIMESTAMP | DEFAULT=NOW() | Record update date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Indexes:** `user_id`

---

### 6. **interest_responses** (Interest Assessment Responses)
Stores responses to interest assessment questions.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL | Reference to user |
| question_id | VARCHAR(100) | NOT NULL | Question identifier |
| selected_option | VARCHAR(500) | NOT NULL | Selected answer |
| category | VARCHAR(100) | NOT NULL | Question category |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Unique Constraint:** `(user_id, question_id)`  
**Indexes:** `user_id`, `question_id`, `category`, `created_at`

---

### 7. **preferences** (Career Preferences)
Stores career and work preferences for each student.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL, UNIQUE | Reference to user |
| prefer_government_job | BOOLEAN | NOT NULL | Preference for government jobs |
| willing_to_relocate | BOOLEAN | NOT NULL | Willingness to relocate |
| income_expectation | INTEGER | NOT NULL, CHECK (income_expectation BETWEEN 1 AND 100) | Expected salary in lakhs |
| work_life_balance | ENUM('high', 'medium', 'low') | NOT NULL | Work-life balance preference |
| study_abroad | BOOLEAN | NOT NULL | Interest in studying abroad |
| entrepreneurship | BOOLEAN | NOT NULL | Interest in entrepreneurship |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |
| updated_at | TIMESTAMP | DEFAULT=NOW() | Record update date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Indexes:** `user_id`, `income_expectation`

---

### 8. **career_matches** (Career Match Database)
Stores information about different career options available to recommend.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | VARCHAR(100) | PRIMARY KEY | Unique career identifier |
| name | VARCHAR(255) | NOT NULL, UNIQUE | Career name |
| description | TEXT | NOT NULL | Career description |
| education_path | VARCHAR(500) | NOT NULL | Required education path |
| employment_rate | DECIMAL(5,2) | NOT NULL, CHECK (employment_rate BETWEEN 0 AND 100) | Employment rate percentage |
| growth_rate | DECIMAL(5,2) | NOT NULL | Annual growth rate |
| jobs_available | BIGINT | NOT NULL | Approximate jobs available |
| min_salary | DECIMAL(10,2) | NOT NULL | Minimum salary in lakhs |
| max_salary | DECIMAL(10,2) | NOT NULL | Maximum salary in lakhs |
| salary_experience_years | INTEGER | NOT NULL | Experience required for max_salary |
| related_fields | TEXT | NOT NULL | Related fields (comma-separated) |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |

**Primary Key:** `id`  
**Indexes:** `name`, `employment_rate`, `growth_rate`

---

### 9. **career_recommendations** (User Career Recommendations)
Stores personalized career recommendations for each assessment.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL | Reference to user |
| career_id | VARCHAR(100) | FOREIGN KEY (career_matches.id), NOT NULL | Reference to career |
| match_percentage | INTEGER | NOT NULL, CHECK (match_percentage BETWEEN 0 AND 100) | Match score percentage |
| reason | TEXT | NOT NULL | Why this career matches |
| ranking | INTEGER | NOT NULL | Ranking in recommendations |
| is_backup | BOOLEAN | DEFAULT=false | Whether this is a backup option |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |

**Primary Key:** `id`  
**Foreign Keys:** `user_id` → `users.id`, `career_id` → `career_matches.id`  
**Unique Constraint:** `(user_id, career_id)`  
**Indexes:** `user_id`, `career_id`, `match_percentage`, `ranking`

---

### 10. **college_suggestions** (Recommended Colleges)
Stores college recommendations for students.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | VARCHAR(100) | PRIMARY KEY | Unique college identifier |
| name | VARCHAR(255) | NOT NULL, UNIQUE | College name |
| state | VARCHAR(100) | NOT NULL | State where college is located |
| type | ENUM('Government', 'Private', 'Deemed') | NOT NULL | College type |
| ranking | INTEGER | NOT NULL | Overall ranking |
| neet_cutoff | INTEGER | Allow NULL | NEET entrance cutoff |
| jee_advanced_cutoff | INTEGER | Allow NULL | JEE Advanced entrance cutoff |
| placement_rate | DECIMAL(5,2) | NOT NULL, CHECK (placement_rate BETWEEN 0 AND 100) | Placement percentage |
| avg_package | DECIMAL(10,2) | NOT NULL | Average package in lakhs |
| relevant_courses | TEXT | NOT NULL | Relevant courses (comma-separated) |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |

**Primary Key:** `id`  
**Indexes:** `name`, `state`, `ranking`, `type`

---

### 11. **career_reports** (Generated Career Reports)
Stores generated career assessment reports for each student.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique report identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL | Reference to user |
| student_name | VARCHAR(255) | NOT NULL | Student name |
| test_date | TIMESTAMP | NOT NULL | When assessment was completed |
| top_careers_ids | TEXT | NOT NULL | Top career IDs (comma-separated or JSON) |
| college_suggestions_ids | TEXT | Not NULL | College IDs (comma-separated or JSON) |
| roadmap | JSONB | NOT NULL | Complete roadmap as JSON |
| salary_prediction | JSONB | NOT NULL | Salary projection data as JSON |
| report_data | JSONB | NOT NULL | Complete report data as JSON |
| created_at | TIMESTAMP | DEFAULT=NOW() | Report creation date |
| updated_at | TIMESTAMP | DEFAULT=NOW() | Last updated date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Unique Constraint:** `(user_id, test_date)` or keep multiple reports per user  
**Indexes:** `user_id`, `test_date`, `created_at`

---

### 12. **assessment_progress** (Track Assessment Steps)
Stores completion status of assessment steps.

| Column | Type | Constraints | Description |
|--------|------|-----------|-------------|
| id | UUID | PRIMARY KEY | Unique record identifier |
| user_id | UUID | FOREIGN KEY (users.id), NOT NULL, UNIQUE | Reference to user |
| current_step | INTEGER | NOT NULL, CHECK (current_step BETWEEN 0 AND 5) | Current step number (0-5) |
| completed_steps | TEXT | NOT NULL | Completed step numbers (as JSON array or comma-separated) |
| assessment_complete | BOOLEAN | DEFAULT=false | Whether assessment is complete |
| created_at | TIMESTAMP | DEFAULT=NOW() | Record creation date |
| updated_at | TIMESTAMP | DEFAULT=NOW() | Last updated date |

**Primary Key:** `id`  
**Foreign Key:** `user_id` → `users.id`  
**Indexes:** `user_id`, `current_step`, `assessment_complete`

---

## Data Relationships

```
users (1) ──────┬──────── (n) student_info
               ├──────── (1) academic_data ──── (n) academic_marks
               ├──────── (1) skill_ratings
               ├──────── (n) interest_responses
               ├──────── (1) preferences
               ├──────── (n) career_recommendations ──── career_matches
               ├──────── (1) career_reports
               └──────── (1) assessment_progress

career_matches (1) ──────── (n) career_recommendations (n) ────── users
college_suggestions (standalone reference table)
```

---

## SQL Scripts

### Create Database

```sql
CREATE DATABASE ai_student_assessment_db
  ENCODING 'UTF8'
  LC_COLLATE 'en_US.UTF-8'
  LC_CTYPE 'en_US.UTF-8'
  TEMPLATE template0;

-- Connect to database
\c ai_student_assessment_db;
```

### Create All Tables

```sql
-- 1. Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- 2. Create student_info table
CREATE TABLE student_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  state VARCHAR(100) NOT NULL,
  board VARCHAR(50) NOT NULL CHECK (board IN ('CBSE', 'ICSE', 'State Board', 'IB')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, email)
);

-- 3. Create academic_data table
CREATE TABLE academic_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  stream VARCHAR(50) NOT NULL CHECK (stream IN ('Science', 'Commerce', 'Arts')),
  current_class INTEGER NOT NULL CHECK (current_class BETWEEN 10 AND 12),
  gpa DECIMAL(3,2) NOT NULL CHECK (gpa BETWEEN 0 AND 10),
  result VARCHAR(20) NOT NULL CHECK (result IN ('Pass', 'Fail')),
  strong_subject VARCHAR(100) NOT NULL,
  weak_subject VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Create academic_marks table
CREATE TABLE academic_marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  academic_data_id UUID NOT NULL,
  subject VARCHAR(100) NOT NULL,
  marks INTEGER NOT NULL CHECK (marks BETWEEN 0 AND 100),
  max_marks INTEGER NOT NULL CHECK (max_marks > 0),
  percentage DECIMAL(5,2) NOT NULL CHECK (percentage BETWEEN 0 AND 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (academic_data_id) REFERENCES academic_data(id) ON DELETE CASCADE,
  UNIQUE (academic_data_id, subject)
);

-- 5. Create skill_ratings table
CREATE TABLE skill_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  logical_reasoning INTEGER NOT NULL CHECK (logical_reasoning BETWEEN 1 AND 10),
  communication INTEGER NOT NULL CHECK (communication BETWEEN 1 AND 10),
  analytical_thinking INTEGER NOT NULL CHECK (analytical_thinking BETWEEN 1 AND 10),
  problem_solving INTEGER NOT NULL CHECK (problem_solving BETWEEN 1 AND 10),
  teamwork INTEGER NOT NULL CHECK (teamwork BETWEEN 1 AND 10),
  leadership INTEGER NOT NULL CHECK (leadership BETWEEN 1 AND 10),
  creativity INTEGER NOT NULL CHECK (creativity BETWEEN 1 AND 10),
  time_management INTEGER NOT NULL CHECK (time_management BETWEEN 1 AND 10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Create interest_responses table
CREATE TABLE interest_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  question_id VARCHAR(100) NOT NULL,
  selected_option VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, question_id)
);

-- 7. Create preferences table
CREATE TABLE preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  prefer_government_job BOOLEAN NOT NULL,
  willing_to_relocate BOOLEAN NOT NULL,
  income_expectation INTEGER NOT NULL CHECK (income_expectation BETWEEN 1 AND 100),
  work_life_balance VARCHAR(20) NOT NULL CHECK (work_life_balance IN ('high', 'medium', 'low')),
  study_abroad BOOLEAN NOT NULL,
  entrepreneurship BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Create career_matches table
CREATE TABLE career_matches (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  education_path VARCHAR(500) NOT NULL,
  employment_rate DECIMAL(5,2) NOT NULL CHECK (employment_rate BETWEEN 0 AND 100),
  growth_rate DECIMAL(5,2) NOT NULL,
  jobs_available BIGINT NOT NULL,
  min_salary DECIMAL(10,2) NOT NULL,
  max_salary DECIMAL(10,2) NOT NULL,
  salary_experience_years INTEGER NOT NULL,
  related_fields TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Create career_recommendations table
CREATE TABLE career_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  career_id VARCHAR(100) NOT NULL,
  match_percentage INTEGER NOT NULL CHECK (match_percentage BETWEEN 0 AND 100),
  reason TEXT NOT NULL,
  ranking INTEGER NOT NULL,
  is_backup BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (career_id) REFERENCES career_matches(id),
  UNIQUE (user_id, career_id)
);

-- 10. Create college_suggestions table
CREATE TABLE college_suggestions (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  state VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Government', 'Private', 'Deemed')),
  ranking INTEGER NOT NULL,
  neet_cutoff INTEGER,
  jee_advanced_cutoff INTEGER,
  placement_rate DECIMAL(5,2) NOT NULL CHECK (placement_rate BETWEEN 0 AND 100),
  avg_package DECIMAL(10,2) NOT NULL,
  relevant_courses TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Create career_reports table
CREATE TABLE career_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  test_date TIMESTAMP NOT NULL,
  top_careers_ids TEXT NOT NULL,
  college_suggestions_ids TEXT NOT NULL,
  roadmap JSONB NOT NULL,
  salary_prediction JSONB NOT NULL,
  report_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 12. Create assessment_progress table
CREATE TABLE assessment_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  current_step INTEGER NOT NULL CHECK (current_step BETWEEN 0 AND 5),
  completed_steps TEXT NOT NULL,
  assessment_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Indexes

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Student info indexes
CREATE INDEX idx_student_info_user_id ON student_info(user_id);
CREATE INDEX idx_student_info_email ON student_info(email);

-- Academic data indexes
CREATE INDEX idx_academic_data_user_id ON academic_data(user_id);
CREATE INDEX idx_academic_data_stream ON academic_data(stream);
CREATE INDEX idx_academic_data_created_at ON academic_data(created_at);

-- Academic marks indexes
CREATE INDEX idx_academic_marks_academic_data_id ON academic_marks(academic_data_id);
CREATE INDEX idx_academic_marks_subject ON academic_marks(subject);

-- Skill ratings indexes
CREATE INDEX idx_skill_ratings_user_id ON skill_ratings(user_id);

-- Interest responses indexes
CREATE INDEX idx_interest_responses_user_id ON interest_responses(user_id);
CREATE INDEX idx_interest_responses_question_id ON interest_responses(question_id);
CREATE INDEX idx_interest_responses_category ON interest_responses(category);
CREATE INDEX idx_interest_responses_created_at ON interest_responses(created_at);

-- Preferences indexes
CREATE INDEX idx_preferences_user_id ON preferences(user_id);
CREATE INDEX idx_preferences_income_expectation ON preferences(income_expectation);

-- Career matches indexes
CREATE INDEX idx_career_matches_name ON career_matches(name);
CREATE INDEX idx_career_matches_employment_rate ON career_matches(employment_rate);
CREATE INDEX idx_career_matches_growth_rate ON career_matches(growth_rate);

-- Career recommendations indexes
CREATE INDEX idx_career_recommendations_user_id ON career_recommendations(user_id);
CREATE INDEX idx_career_recommendations_career_id ON career_recommendations(career_id);
CREATE INDEX idx_career_recommendations_match_percentage ON career_recommendations(match_percentage);
CREATE INDEX idx_career_recommendations_ranking ON career_recommendations(ranking);

-- College suggestions indexes
CREATE INDEX idx_college_suggestions_name ON college_suggestions(name);
CREATE INDEX idx_college_suggestions_state ON college_suggestions(state);
CREATE INDEX idx_college_suggestions_ranking ON college_suggestions(ranking);
CREATE INDEX idx_college_suggestions_type ON college_suggestions(type);

-- Career reports indexes
CREATE INDEX idx_career_reports_user_id ON career_reports(user_id);
CREATE INDEX idx_career_reports_test_date ON career_reports(test_date);
CREATE INDEX idx_career_reports_created_at ON career_reports(created_at);

-- Assessment progress indexes
CREATE INDEX idx_assessment_progress_user_id ON assessment_progress(user_id);
CREATE INDEX idx_assessment_progress_current_step ON assessment_progress(current_step);
CREATE INDEX idx_assessment_progress_assessment_complete ON assessment_progress(assessment_complete);
```

---

## Sample Data

### Insert Sample Users

```sql
INSERT INTO users (email, password_hash, name) VALUES
('student1@example.com', '$2a$10$hashedpassword1', 'John Doe'),
('student2@example.com', '$2a$10$hashedpassword2', 'Jane Smith'),
('student3@example.com', '$2a$10$hashedpassword3', 'Alex Johnson');
```

### Insert Sample Student Info

```sql
INSERT INTO student_info (user_id, name, email, phone, date_of_birth, state, board)
SELECT id, name, email, '9876543210', '2006-05-15', 'Maharashtra', 'CBSE' FROM users LIMIT 1;

INSERT INTO student_info (user_id, name, email, phone, date_of_birth, state, board)
SELECT id, name, email, '9876543211', '2006-07-20', 'Tamil Nadu', 'ICSE' FROM users WHERE email = 'student2@example.com';
```

### Insert Sample Academic Data

```sql
INSERT INTO academic_data (user_id, stream, current_class, gpa, result, strong_subject, weak_subject)
SELECT id, 'Science', 12, 8.5, 'Pass', 'Physics', 'Biology' FROM users WHERE email = 'student1@example.com';
```

### Insert Sample Academic Marks

```sql
INSERT INTO academic_marks (academic_data_id, subject, marks, max_marks, percentage)
SELECT id, 'Physics', 85, 100, 85.0 FROM academic_data LIMIT 1;

INSERT INTO academic_marks (academic_data_id, subject, marks, max_marks, percentage)
SELECT id, 'Chemistry', 78, 100, 78.0 FROM academic_data LIMIT 1;

INSERT INTO academic_marks (academic_data_id, subject, marks, max_marks, percentage)
SELECT id, 'Mathematics', 92, 100, 92.0 FROM academic_data LIMIT 1;
```

### Insert Sample Skill Ratings

```sql
INSERT INTO skill_ratings (
  user_id, logical_reasoning, communication, analytical_thinking, 
  problem_solving, teamwork, leadership, creativity, time_management
)
SELECT id, 9, 8, 9, 8, 7, 7, 8, 8 FROM users WHERE email = 'student1@example.com';
```

### Insert Sample Preferences

```sql
INSERT INTO preferences (
  user_id, prefer_government_job, willing_to_relocate, 
  income_expectation, work_life_balance, study_abroad, entrepreneurship
)
SELECT id, false, true, 15, 'high', false, true FROM users WHERE email = 'student1@example.com';
```

### Insert Sample Career Matches

```sql
INSERT INTO career_matches (
  id, name, description, education_path, employment_rate, 
  growth_rate, jobs_available, min_salary, max_salary, 
  salary_experience_years, related_fields
) VALUES
('software-engineer', 'Software Engineer', 
 'Develop and maintain software applications',
 'B.Tech Computer Science/IT',
 92.00, 22.00, 450000, 6.00, 35.00, 5,
 'Data Science,DevOps Engineer,Full Stack Developer'),

('data-scientist', 'Data Scientist',
 'Analyze complex data and create data-driven solutions',
 'B.Tech CS or B.Sc Mathematics',
 87.00, 36.00, 150000, 8.00, 40.00, 5,
 'Machine Learning Engineer,Business Analyst,AI Engineer'),

('civil-engineer', 'Civil Engineer',
 'Design and oversee construction projects',
 'B.Tech Civil Engineering',
 78.00, 15.00, 200000, 5.00, 20.00, 5,
 'Structural Engineer,Project Manager,Urban Planner');
```

### Insert Sample College Suggestions

```sql
INSERT INTO college_suggestions (
  id, name, state, type, ranking, neet_cutoff, 
  jee_advanced_cutoff, placement_rate, avg_package, relevant_courses
) VALUES
('iit-bombay', 'IIT Bombay', 'Maharashtra', 'Government', 3, 
 NULL, 50, 98.50, 25.00, 'Computer Science,Electrical,Mechanical'),

('delhi-university', 'Delhi University', 'Delhi', 'Government', 5, 
 450, NULL, 85.00, 12.00, 'Science,Commerce,Arts');
```

### Insert Sample Assessment Progress

```sql
INSERT INTO assessment_progress (
  user_id, current_step, completed_steps, assessment_complete
)
SELECT id, 5, '[0,1,2,3,4,5]', true FROM users WHERE email = 'student1@example.com';
```

---

## Migration Steps

### Step 1: Database Setup
```bash
# Create database using PostgreSQL
psql -U postgres -c "CREATE DATABASE ai_student_assessment_db;"
```

### Step 2: Create Extension (if needed)
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Step 3: Run All Table Creation Scripts
Execute the SQL scripts provided in the "Create All Tables" section above.

### Step 4: Create Indexes
Execute all index creation statements for optimal query performance.

### Step 5: Insert Sample Data
Execute the sample data insertion queries to verify database structure.

### Step 6: Set Up Triggers (Optional)
```sql
-- Update 'updated_at' timestamp automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at column
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_student_info_timestamp
BEFORE UPDATE ON student_info FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_academic_data_timestamp
BEFORE UPDATE ON academic_data FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_skill_ratings_timestamp
BEFORE UPDATE ON skill_ratings FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_preferences_timestamp
BEFORE UPDATE ON preferences FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_career_reports_timestamp
BEFORE UPDATE ON career_reports FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_assessment_progress_timestamp
BEFORE UPDATE ON assessment_progress FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

---

## Common Queries

### Get Student Complete Profile
```sql
SELECT 
  u.name, u.email, 
  si.phone, si.date_of_birth, si.state, si.board,
  ad.stream, ad.current_class, ad.gpa, ad.result,
  sr.logical_reasoning, sr.communication, sr.analytical_thinking,
  p.prefer_government_job, p.income_expectation, p.work_life_balance
FROM users u
LEFT JOIN student_info si ON u.id = si.user_id
LEFT JOIN academic_data ad ON u.id = ad.user_id
LEFT JOIN skill_ratings sr ON u.id = sr.user_id
LEFT JOIN preferences p ON u.id = p.user_id
WHERE u.id = $1;
```

### Get Top 3 Career Recommendations for a Student
```sql
SELECT 
  cr.ranking, cm.name, cm.description, cr.match_percentage, cr.reason,
  cm.min_salary, cm.max_salary, cm.employment_rate, cm.growth_rate
FROM career_recommendations cr
JOIN career_matches cm ON cr.career_id = cm.id
WHERE cr.user_id = $1 AND cr.is_backup = false
ORDER BY cr.ranking ASC
LIMIT 3;
```

### Get Student's Academic Marks Details
```sql
SELECT 
  ad.stream, am.subject, am.marks, am.max_marks, am.percentage
FROM academic_data ad
LEFT JOIN academic_marks am ON ad.id = am.academic_data_id
WHERE ad.user_id = $1
ORDER BY am.percentage DESC;
```

### Get Total Completed Assessments
```sql
SELECT COUNT(*) as total_assessments
FROM assessment_progress
WHERE assessment_complete = true;
```

---

## Performance Optimization Tips

1. **Indexes:** All primary foreign keys and frequently queried columns are indexed
2. **Partitioning:** Consider partitioning `interest_responses` and `career_reports` by year for large datasets
3. **Caching:** Cache frequently accessed career match data
4. **Connection Pooling:** Use connection pooling for better database performance
5. **Query Optimization:** Use EXPLAIN ANALYZE to optimize slow queries

---

## Backup & Recovery

```bash
# Full backup
pg_dump -U postgres ai_student_assessment_db > backup.sql

# Restore from backup
psql -U postgres ai_student_assessment_db < backup.sql

# Incremental backup (using pg_basebackup)
pg_basebackup -h localhost -U postgres -D ./backup_dir
```

---

## Environment Setup

### For Node.js/Express Backend

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_student_assessment_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_POOL_SIZE=20
```

### Connection String
```
postgresql://postgres:password@localhost:5432/ai_student_assessment_db
```

---

## Notes

- All UUID fields are auto-generated using PostgreSQL's `gen_random_uuid()`
- Timestamps are automatically managed (created_at, updated_at)
- Foreign key constraints are set to CASCADE DELETE for data integrity
- All data types are optimized for the application requirements
- The schema supports up to millions of records efficiently

