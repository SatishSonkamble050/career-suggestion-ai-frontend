-- ============================================================================
-- AI Student Career Assessment Platform - Complete Database Schema
-- ============================================================================
-- Database Name: ai_student_assessment_db
-- Database Type: PostgreSQL 12+
-- Purpose: Store student assessment data, career recommendations, and reports
-- ============================================================================

-- ============================================================================
-- STEP 1: Create Database (Run as superuser)
-- ============================================================================
-- Uncomment and run if database doesn't exist:
-- CREATE DATABASE ai_student_assessment_db
--   ENCODING 'UTF8'
--   LC_COLLATE 'en_US.UTF-8'
--   LC_CTYPE 'en_US.UTF-8'
--   TEMPLATE template0;

-- Connect to the database:
-- \c ai_student_assessment_db;

-- ============================================================================
-- STEP 2: Enable Extensions
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- ============================================================================
-- STEP 3: Create Tables
-- ============================================================================

-- Table 1: Users (Authentication & User Management)
-- Purpose: Store user account information and authentication details
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

COMMENT ON TABLE users IS 'Stores user account information and authentication details';
COMMENT ON COLUMN users.id IS 'Unique user identifier (UUID)';
COMMENT ON COLUMN users.email IS 'User email address - unique identifier for login';
COMMENT ON COLUMN users.password_hash IS 'Hashed password using bcrypt or Argon2';
COMMENT ON COLUMN users.name IS 'User full name';

-- ============================================================================

-- Table 2: Student Info (Student Basic Information)
-- Purpose: Personal information of students
CREATE TABLE IF NOT EXISTS student_info (
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

COMMENT ON TABLE student_info IS 'Stores personal information of students';
COMMENT ON COLUMN student_info.phone IS 'Phone number - 10 digits for India';
COMMENT ON COLUMN student_info.board IS 'Educational board (CBSE, ICSE, State Board, IB)';
COMMENT ON COLUMN student_info.state IS 'State of residence';

-- ============================================================================

-- Table 3: Academic Data (Academic Performance Overview)
-- Purpose: Store aggregate academic information
CREATE TABLE IF NOT EXISTS academic_data (
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

COMMENT ON TABLE academic_data IS 'Aggregate academic information for each student';
COMMENT ON COLUMN academic_data.stream IS 'Educational stream: Science, Commerce, or Arts';
COMMENT ON COLUMN academic_data.current_class IS 'Current class (10, 11, or 12)';
COMMENT ON COLUMN academic_data.gpa IS 'Cumulative Grade Point Average (0-10)';

-- ============================================================================

-- Table 4: Academic Marks (Detailed Subject-wise Marks)
-- Purpose: Store marks for each subject
CREATE TABLE IF NOT EXISTS academic_marks (
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

COMMENT ON TABLE academic_marks IS 'Subject-wise marks obtained by students';
COMMENT ON COLUMN academic_marks.subject IS 'Subject name (Physics, Chemistry, Math, etc.)';
COMMENT ON COLUMN academic_marks.marks IS 'Marks obtained (0-100)';
COMMENT ON COLUMN academic_marks.percentage IS 'Percentage score (0-100%)';

-- ============================================================================

-- Table 5: Skill Ratings (Student Skills Assessment)
-- Purpose: Store self-rated skills on 1-10 scale
CREATE TABLE IF NOT EXISTS skill_ratings (
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

COMMENT ON TABLE skill_ratings IS 'Self-rated skills on a scale of 1-10';
COMMENT ON COLUMN skill_ratings.logical_reasoning IS 'Rating for logical reasoning ability (1-10)';
COMMENT ON COLUMN skill_ratings.communication IS 'Rating for communication skills (1-10)';
COMMENT ON COLUMN skill_ratings.analytical_thinking IS 'Rating for analytical thinking (1-10)';
COMMENT ON COLUMN skill_ratings.problem_solving IS 'Rating for problem-solving ability (1-10)';
COMMENT ON COLUMN skill_ratings.teamwork IS 'Rating for teamwork capability (1-10)';
COMMENT ON COLUMN skill_ratings.leadership IS 'Rating for leadership qualities (1-10)';
COMMENT ON COLUMN skill_ratings.creativity IS 'Rating for creative thinking (1-10)';
COMMENT ON COLUMN skill_ratings.time_management IS 'Rating for time management (1-10)';

-- ============================================================================

-- Table 6: Interest Responses (Interest Assessment Responses)
-- Purpose: Store responses to interest questionnaire
CREATE TABLE IF NOT EXISTS interest_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  question_id VARCHAR(100) NOT NULL,
  selected_option VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, question_id)
);

COMMENT ON TABLE interest_responses IS 'Responses to interest assessment questions';
COMMENT ON COLUMN interest_responses.category IS 'Category of the interest question (e.g., STEM, Arts, Social)';

-- ============================================================================

-- Table 7: Preferences (Career Preferences)
-- Purpose: Store career and work preferences
CREATE TABLE IF NOT EXISTS preferences (
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

COMMENT ON TABLE preferences IS 'Career and work preferences for students';
COMMENT ON COLUMN preferences.income_expectation IS 'Expected annual income in lakhs (1-100)';
COMMENT ON COLUMN preferences.work_life_balance IS 'Preference for work-life balance (high, medium, low)';

-- ============================================================================

-- Table 8: Career Matches (Career Database)
-- Purpose: Store information about different career options
CREATE TABLE IF NOT EXISTS career_matches (
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

COMMENT ON TABLE career_matches IS 'Master data for different career options';
COMMENT ON COLUMN career_matches.id IS 'Unique identifier (slug format, e.g., software-engineer)';
COMMENT ON COLUMN career_matches.name IS 'Career name';
COMMENT ON COLUMN career_matches.employment_rate IS 'Employment rate percentage';
COMMENT ON COLUMN career_matches.min_salary IS 'Minimum salary in lakhs';
COMMENT ON COLUMN career_matches.max_salary IS 'Maximum salary in lakhs (after experience_years)';
COMMENT ON COLUMN career_matches.related_fields IS 'Related fields (comma-separated)';

-- ============================================================================

-- Table 9: Career Recommendations (User Career Recommendations)
-- Purpose: Store personalized career recommendations
CREATE TABLE IF NOT EXISTS career_recommendations (
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

COMMENT ON TABLE career_recommendations IS 'Personalized career recommendations for each student';
COMMENT ON COLUMN career_recommendations.match_percentage IS 'Percentage match with student profile (0-100)';
COMMENT ON COLUMN career_recommendations.ranking IS 'Ranking of this career (1=top recommendation)';
COMMENT ON COLUMN career_recommendations.is_backup IS 'Whether this is a backup/alternative option';

-- ============================================================================

-- Table 10: College Suggestions (Recommended Colleges)
-- Purpose: Store college recommendations
CREATE TABLE IF NOT EXISTS college_suggestions (
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

COMMENT ON TABLE college_suggestions IS 'Master data for recommended colleges';
COMMENT ON COLUMN college_suggestions.type IS 'Type of college (Government, Private, Deemed)';
COMMENT ON COLUMN college_suggestions.ranking IS 'Overall ranking';
COMMENT ON COLUMN college_suggestions.avg_package IS 'Average placement package in lakhs';

-- ============================================================================

-- Table 11: Career Reports (Generated Career Reports)
-- Purpose: Store generated assessment reports
CREATE TABLE IF NOT EXISTS career_reports (
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

COMMENT ON TABLE career_reports IS 'Generated career assessment reports';
COMMENT ON COLUMN career_reports.roadmap IS 'Career roadmap as JSON (steps, timeline, actions)';
COMMENT ON COLUMN career_reports.salary_prediction IS 'Salary prediction data as JSON (year, salary, role)';
COMMENT ON COLUMN career_reports.report_data IS 'Complete report data as JSON';

-- ============================================================================

-- Table 12: Assessment Progress (Track Assessment Steps)
-- Purpose: Track completion status of assessment steps
CREATE TABLE IF NOT EXISTS assessment_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  current_step INTEGER NOT NULL CHECK (current_step BETWEEN 0 AND 5),
  completed_steps TEXT NOT NULL,
  assessment_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

COMMENT ON TABLE assessment_progress IS 'Tracks assessment completion progress';
COMMENT ON COLUMN assessment_progress.current_step IS 'Current step in assessment (0-5)';
COMMENT ON COLUMN assessment_progress.completed_steps IS 'JSON array of completed step numbers';
COMMENT ON COLUMN assessment_progress.assessment_complete IS 'Overall assessment completion status';

-- ============================================================================
-- STEP 4: Create Indexes for Performance
-- ============================================================================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Student info indexes
CREATE INDEX IF NOT EXISTS idx_student_info_user_id ON student_info(user_id);
CREATE INDEX IF NOT EXISTS idx_student_info_email ON student_info(email);

-- Academic data indexes
CREATE INDEX IF NOT EXISTS idx_academic_data_user_id ON academic_data(user_id);
CREATE INDEX IF NOT EXISTS idx_academic_data_stream ON academic_data(stream);
CREATE INDEX IF NOT EXISTS idx_academic_data_created_at ON academic_data(created_at);

-- Academic marks indexes
CREATE INDEX IF NOT EXISTS idx_academic_marks_academic_data_id ON academic_marks(academic_data_id);
CREATE INDEX IF NOT EXISTS idx_academic_marks_subject ON academic_marks(subject);

-- Skill ratings indexes
CREATE INDEX IF NOT EXISTS idx_skill_ratings_user_id ON skill_ratings(user_id);

-- Interest responses indexes
CREATE INDEX IF NOT EXISTS idx_interest_responses_user_id ON interest_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_interest_responses_question_id ON interest_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_interest_responses_category ON interest_responses(category);
CREATE INDEX IF NOT EXISTS idx_interest_responses_created_at ON interest_responses(created_at);

-- Preferences indexes
CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_preferences_income_expectation ON preferences(income_expectation);

-- Career matches indexes
CREATE INDEX IF NOT EXISTS idx_career_matches_name ON career_matches(name);
CREATE INDEX IF NOT EXISTS idx_career_matches_employment_rate ON career_matches(employment_rate);
CREATE INDEX IF NOT EXISTS idx_career_matches_growth_rate ON career_matches(growth_rate);

-- Career recommendations indexes
CREATE INDEX IF NOT EXISTS idx_career_recommendations_user_id ON career_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_career_recommendations_career_id ON career_recommendations(career_id);
CREATE INDEX IF NOT EXISTS idx_career_recommendations_match_percentage ON career_recommendations(match_percentage);
CREATE INDEX IF NOT EXISTS idx_career_recommendations_ranking ON career_recommendations(ranking);

-- College suggestions indexes
CREATE INDEX IF NOT EXISTS idx_college_suggestions_name ON college_suggestions(name);
CREATE INDEX IF NOT EXISTS idx_college_suggestions_state ON college_suggestions(state);
CREATE INDEX IF NOT EXISTS idx_college_suggestions_ranking ON college_suggestions(ranking);
CREATE INDEX IF NOT EXISTS idx_college_suggestions_type ON college_suggestions(type);

-- Career reports indexes
CREATE INDEX IF NOT EXISTS idx_career_reports_user_id ON career_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_career_reports_test_date ON career_reports(test_date);
CREATE INDEX IF NOT EXISTS idx_career_reports_created_at ON career_reports(created_at);

-- Assessment progress indexes
CREATE INDEX IF NOT EXISTS idx_assessment_progress_user_id ON assessment_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_progress_current_step ON assessment_progress(current_step);
CREATE INDEX IF NOT EXISTS idx_assessment_progress_assessment_complete ON assessment_progress(assessment_complete);

-- ============================================================================
-- STEP 5: Create Trigger Functions for Automatic Updates
-- ============================================================================

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables with updated_at
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

-- ============================================================================
-- STEP 6: Sample Data Insertion
-- ============================================================================

-- Insert sample users
INSERT INTO users (email, password_hash, name, is_active) VALUES
  ('student1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/LLe', 'John Doe', true),
  ('student2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/LLe', 'Jane Smith', true),
  ('student3@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/LLe', 'Alex Johnson', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample career matches
INSERT INTO career_matches (id, name, description, education_path, employment_rate, growth_rate, jobs_available, min_salary, max_salary, salary_experience_years, related_fields) VALUES
  ('software-engineer', 'Software Engineer', 'Develop and maintain software applications', 'B.Tech Computer Science/IT', 92.00, 22.00, 450000, 6.00, 35.00, 5, 'Data Science,DevOps Engineer,Full Stack Developer'),
  ('data-scientist', 'Data Scientist', 'Analyze complex data and create data-driven solutions', 'B.Tech CS or B.Sc Mathematics', 87.00, 36.00, 150000, 8.00, 40.00, 5, 'Machine Learning Engineer,Business Analyst,AI Engineer'),
  ('civil-engineer', 'Civil Engineer', 'Design and oversee construction projects', 'B.Tech Civil Engineering', 78.00, 15.00, 200000, 5.00, 20.00, 5, 'Structural Engineer,Project Manager,Urban Planner'),
  ('mechanical-engineer', 'Mechanical Engineer', 'Design and develop mechanical systems', 'B.Tech Mechanical Engineering', 85.00, 12.00, 250000, 5.50, 25.00, 5, 'Automotive Engineer,Design Engineer'),
  ('chartered-accountant', 'Chartered Accountant', 'Provide financial and accounting services', 'CA Qualification', 90.00, 8.00, 100000, 4.00, 30.00, 5, 'Financial Analyst,Auditor,Tax Consultant')
ON CONFLICT (id) DO NOTHING;

-- Insert sample colleges
INSERT INTO college_suggestions (id, name, state, type, ranking, neet_cutoff, jee_advanced_cutoff, placement_rate, avg_package, relevant_courses) VALUES
  ('iit-bombay', 'IIT Bombay', 'Maharashtra', 'Government', 3, NULL, 50, 98.50, 25.00, 'Computer Science,Electrical,Mechanical,Aerospace'),
  ('iit-delhi', 'IIT Delhi', 'Delhi', 'Government', 2, NULL, 100, 99.00, 26.50, 'Computer Science,Electrical,Civil,Mechanical'),
  ('delhi-university', 'Delhi University', 'Delhi', 'Government', 5, 450, NULL, 85.00, 12.00, 'Science,Commerce,Arts'),
  ('bvu-pune', 'Bharati Vidyapeeth University', 'Maharashtra', 'Private', 25, 400, 300, 75.00, 8.50, 'Engineering,Science,Commerce'),
  ('kptl-pune', 'K.J. Somaiya College', 'Maharashtra', 'Private', 15, 450, 250, 88.00, 14.00, 'Engineering,Management,Science')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 7: Create Views (Optional but useful)
-- ============================================================================

-- View: Complete Student Profile
CREATE OR REPLACE VIEW v_student_profiles AS
SELECT 
  u.id as user_id,
  u.name,
  u.email,
  si.phone,
  si.date_of_birth,
  si.state,
  si.board,
  ad.stream,
  ad.current_class,
  ad.gpa,
  ad.result,
  COUNT(am.id) as subject_count,
  COUNT(ir.id) as interest_responses_count
FROM users u
LEFT JOIN student_info si ON u.id = si.user_id
LEFT JOIN academic_data ad ON u.id = ad.user_id
LEFT JOIN academic_marks am ON ad.id = am.academic_data_id
LEFT JOIN interest_responses ir ON u.id = ir.user_id
GROUP BY u.id, u.name, u.email, si.phone, si.date_of_birth, si.state, si.board, 
         ad.stream, ad.current_class, ad.gpa, ad.result;

-- View: Assessment Completion Statistics
CREATE OR REPLACE VIEW v_assessment_statistics AS
SELECT 
  COUNT(*) as total_users,
  SUM(CASE WHEN assessment_complete = true THEN 1 ELSE 0 END) as completed_assessments,
  SUM(CASE WHEN assessment_complete = false THEN 1 ELSE 0 END) as pending_assessments,
  ROUND(SUM(CASE WHEN assessment_complete = true THEN 1 ELSE 0 END)::numeric / 
           COUNT(*) * 100, 2) as completion_rate
FROM assessment_progress;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify tables created
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verify indexes created
-- SELECT schemaname, tablename, indexname FROM pg_indexes WHERE schemaname = 'public';

-- Verify sample data
-- SELECT COUNT(*) as user_count FROM users;
-- SELECT COUNT(*) as career_count FROM career_matches;
-- SELECT COUNT(*) as college_count FROM college_suggestions;

-- ============================================================================
-- END OF DATABASE SETUP SCRIPT
-- ============================================================================
-- To execute this script:
-- 1. Save this as database_setup.sql
-- 2. Run: psql -U postgres -d ai_student_assessment_db -f database_setup.sql
-- OR in psql console: \i database_setup.sql
-- ============================================================================
