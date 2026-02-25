# API Integration Reference Guide

Complete API documentation for the AI Student Career Assessment Platform with integration examples for both backend and frontend.

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Authentication](#authentication)
3. [Core Endpoints](#core-endpoints)
4. [Student Management](#student-management)
5. [Assessment API](#assessment-api)
6. [Frontend Integration](#frontend-integration)
7. [Python Backend Examples](#python-backend-examples)
8. [Error Handling](#error-handling)
9. [Status Codes](#status-codes)

---

## Quick Start

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Get Started (Next.js/React)
```typescript
// services/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },
  
  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },
};
```

---

## Authentication

### Register User
```
POST /auth/register
```

**Request:**
```json
{
  "email": "student@example.com",
  "password": "secure_password",
  "name": "John Doe"
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "student@example.com",
  "name": "John Doe",
  "access_token": "eyJhbGc..."
}
```

### Login
```
POST /auth/login
```

**Request:**
```json
{
  "email": "student@example.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "student@example.com",
    "name": "John Doe"
  }
}
```

### Frontend: Storing Token
```typescript
// services/auth.ts
export async function login(email: string, password: string) {
  const data = await api.post('/auth/login', { email, password });
  
  // Store token
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}
```

---

## Core Endpoints

### Get Current User
```
GET /users/me
Headers: Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "student@example.com",
  "name": "John Doe",
  "created_at": "2026-02-21T10:00:00Z"
}
```

---

## Student Management

### Get Student Profile
```
GET /students/{student_id}
```

**Response (200):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "John Doe",
  "email": "student@example.com",
  "phone": "9876543210",
  "date_of_birth": "2006-05-15",
  "state": "Maharashtra",
  "board": "CBSE"
}
```

### Create Student Info
```
POST /students/info
```

**Request:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "date_of_birth": "2006-05-15",
  "state": "Maharashtra",
  "board": "CBSE"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "John Doe",
  "created_at": "2026-02-21T10:00:00Z"
}
```

---

## Assessment API

### 1. Academic Data

#### Submit Academic Information
```
POST /assessments/academic
```

**Request:**
```json
{
  "stream": "Science",
  "current_class": 12,
  "gpa": 8.5,
  "result": "Pass",
  "strong_subject": "Physics",
  "weak_subject": "Biology"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "stream": "Science",
  "current_class": 12,
  "gpa": 8.5,
  "created_at": "2026-02-21T10:00:00Z"
}
```

#### Add Subject Marks
```
POST /assessments/academic/{academic_id}/marks
```

**Request:**
```json
{
  "marks": [
    {
      "subject": "Physics",
      "marks": 85,
      "max_marks": 100,
      "percentage": 85.0
    },
    {
      "subject": "Chemistry",
      "marks": 78,
      "max_marks": 100,
      "percentage": 78.0
    },
    {
      "subject": "Mathematics",
      "marks": 92,
      "max_marks": 100,
      "percentage": 92.0
    }
  ]
}
```

**Response (201):**
```json
{
  "academic_id": "uuid",
  "marks_added": 3
}
```

#### Get Academic Data
```
GET /assessments/academic
```

**Response (200):**
```json
{
  "id": "uuid",
  "stream": "Science",
  "current_class": 12,
  "gpa": 8.5,
  "result": "Pass",
  "subjects": [
    {
      "subject": "Physics",
      "marks": 85,
      "percentage": 85.0
    },
    {
      "subject": "Chemistry",
      "marks": 78,
      "percentage": 78.0
    },
    {
      "subject": "Mathematics",
      "marks": 92,
      "percentage": 92.0
    }
  ]
}
```

---

### 2. Skills Assessment

#### Submit Skill Ratings
```
POST /assessments/skills
```

**Request:**
```json
{
  "logical_reasoning": 9,
  "communication": 8,
  "analytical_thinking": 9,
  "problem_solving": 8,
  "teamwork": 7,
  "leadership": 7,
  "creativity": 8,
  "time_management": 8
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "skills": {...},
  "created_at": "2026-02-21T10:00:00Z"
}
```

#### Get Skills
```
GET /assessments/skills
```

**Response (200):** *(Same as request)*

---

### 3. Interests Assessment

#### Submit Interest Responses
```
POST /assessments/interests
```

**Request:**
```json
{
  "responses": [
    {
      "question_id": "q1",
      "selected_option": "Option A",
      "category": "Technology"
    },
    {
      "question_id": "q2",
      "selected_option": "Option B",
      "category": "Problem-Solving"
    }
  ]
}
```

**Response (201):**
```json
{
  "user_id": "uuid",
  "responses_added": 2
}
```

#### Get Interest Responses
```
GET /assessments/interests
```

**Response (200):**
```json
{
  "responses": [...]
}
```

---

### 4. Preferences

#### Submit Preferences
```
POST /assessments/preferences
```

**Request:**
```json
{
  "prefer_government_job": false,
  "willing_to_relocate": true,
  "income_expectation": 15,
  "work_life_balance": "high",
  "study_abroad": false,
  "entrepreneurship": true
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "preferences": {...},
  "created_at": "2026-02-21T10:00:00Z"
}
```

---

### 5. Career Report

#### Generate Career Report
```
POST /assessments/generate-report
```

**Request:** *(Empty body - uses stored assessment data)*
```json
{}
```

**Response (200):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "student_name": "John Doe",
  "test_date": "2026-02-21T10:00:00Z",
  "top_careers": [
    {
      "id": "software-engineer",
      "name": "Software Engineer",
      "match_percentage": 95,
      "description": "...",
      "salary": { "min": 6, "max": 35 }
    }
  ],
  "colleges": [
    {
      "name": "IIT Bombay",
      "ranking": 3,
      "placement_rate": 98.5,
      "avg_package": 25.0
    }
  ],
  "roadmap": [...]
}
```

#### Get Report
```
GET /assessments/report
```

**Response (200):** *(Same as generate)*

---

## Frontend Integration

### 1. React Hook for API Calls
```typescript
// hooks/useApi.ts
import { useState, useCallback } from 'react';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async (endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, call };
}
```

### 2. Academic Data Form (Next.js)
```typescript
// components/AcademicForm.tsx
'use client';
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';

export function AcademicForm() {
  const { call, loading, error } = useApi();
  const [formData, setFormData] = useState({
    stream: 'Science',
    current_class: 12,
    gpa: 8.5,
    result: 'Pass',
    strong_subject: 'Physics',
    weak_subject: 'Biology',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await call('/assessments/academic', 'POST', formData);
      console.log('Academic data saved:', result);
    } catch (err) {
      console.error('Failed to save academic data:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.stream}
        onChange={(e) => setFormData({...formData, stream: e.target.value})}
        placeholder="Stream"
      />
      {/* More fields... */}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
```

### 3. Assessment Progress Component
```typescript
// components/AssessmentStepper.tsx
'use client';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';

export function AssessmentStepper() {
  const { call } = useApi();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const data = await call('/assessments/progress', 'GET');
        setProgress(data);
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      }
    }
    fetchProgress();
  }, [call]);

  const steps = [
    { label: 'Student Info', completed: progress?.completed_steps?.includes(0) },
    { label: 'Academic', completed: progress?.completed_steps?.includes(1) },
    { label: 'Skills', completed: progress?.completed_steps?.includes(2) },
    { label: 'Interests', completed: progress?.completed_steps?.includes(3) },
    { label: 'Preferences', completed: progress?.completed_steps?.includes(4) },
    { label: 'Review', completed: progress?.completed_steps?.includes(5) },
  ];

  return (
    <div className="stepper">
      {steps.map((step, idx) => (
        <div key={idx} className={`step ${step.completed ? 'completed' : ''}`}>
          {step.label}
        </div>
      ))}
    </div>
  );
}
```

---

## Python Backend Examples

### Async Request (httpx)
```python
import httpx
import asyncio

async def submit_academic_data():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/api/assessments/academic",
            json={
                "stream": "Science",
                "current_class": 12,
                "gpa": 8.5,
                "result": "Pass",
                "strong_subject": "Physics",
                "weak_subject": "Biology"
            },
            timeout=30
        )
        return response.json()

result = asyncio.run(submit_academic_data())
print(result)
```

### Sync Request (requests)
```python
import requests

def get_student_profile(student_id):
    response = requests.get(
        f"http://localhost:8000/api/students/{student_id}",
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

profile = get_student_profile('550e8400-e29b-41d4-a716-446655440000')
print(profile)
```

### With Authentication
```python
import requests
from typing import Optional

class CareerAssessmentClient:
    def __init__(self, base_url: str = "http://localhost:8000/api"):
        self.base_url = base_url
        self.token: Optional[str] = None
        self.session = requests.Session()

    def register(self, email: str, password: str, name: str):
        response = self.session.post(
            f"{self.base_url}/auth/register",
            json={"email": email, "password": password, "name": name}
        )
        response.raise_for_status()
        data = response.json()
        self.token = data['access_token']
        self.session.headers.update({'Authorization': f'Bearer {self.token}'})
        return data

    def submit_academic(self, stream: str, current_class: int, gpa: float, **kwargs):
        response = self.session.post(
            f"{self.base_url}/assessments/academic",
            json={"stream": stream, "current_class": current_class, "gpa": gpa, **kwargs}
        )
        response.raise_for_status()
        return response.json()

    def generate_report(self):
        response = self.session.post(f"{self.base_url}/assessments/generate-report")
        response.raise_for_status()
        return response.json()

# Usage
client = CareerAssessmentClient()
client.register("student@example.com", "password123", "John Doe")
academic = client.submit_academic(
    stream="Science",
    current_class=12,
    gpa=8.5,
    result="Pass",
    strong_subject="Physics",
    weak_subject="Biology"
)
report = client.generate_report()
print(report)
```

---

## Error Handling

### Response Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Success - parse response |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check request JSON, field names |
| 401 | Unauthorized | Token missing or expired, login again |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 422 | Validation Error | Check field types and constraints |
| 500 | Server Error | Check server logs, retry later |

### Frontend Error Handling
```typescript
// services/errorHandler.ts
export function handleApiError(error: Response) {
  switch (error.status) {
    case 401:
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
      return 'Session expired, please login again';
    case 422:
      return 'Invalid input data';
    case 500:
      return 'Server error, please try again later';
    default:
      return `Error: ${error.statusText}`;
  }
}

// Usage
try {
  const response = await fetch(url);
  if (!response.ok) {
    const message = handleApiError(response);
    toast.error(message);
  }
} catch (error) {
  console.error('Network error:', error);
}
```

---

## Testing Tools

### Swagger UI
```
http://localhost:8000/docs
```

### ReDoc
```
http://localhost:8000/redoc
```

### cURL Commands
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","name":"John"}'

# Submit Academic Data
curl -X POST http://localhost:8000/api/assessments/academic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"stream":"Science","current_class":12,"gpa":8.5,"result":"Pass"}'

# Generate Report
curl -X POST http://localhost:8000/api/assessments/generate-report \
  -H "Authorization: Bearer {token}"
```

---

## Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_student_assessment_db
OPENAI_API_KEY=sk-proj-...
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
CORS_ORIGINS=http://localhost:3000
```

---

## Performance Guidelines

- **Response Time**: 1-3s for most endpoints, 10-20s for report generation
- **Token Lifespan**: 24 hours (refresh tokens for extended sessions)
- **Rate Limiting**: 100 requests/minute per user
- **Caching**: Cache static data (careers, colleges) for 24 hours
- **Pagination**: Support offset/limit for list endpoints

---

**For complete API documentation**: See `API_DOCUMENTATION.md`
