# API Integration Guide - Complete Setup

This guide shows how to integrate the API services into your Next.js project.

## 📁 File Structure

```
src/
├── services/
│   ├── api.ts              # Core API client
│   ├── auth.ts             # Authentication service
│   ├── assessment.ts       # Assessment endpoints
│   └── student.ts          # Student endpoints
├── hooks/
│   ├── useApi.ts           # Generic API hook
│   ├── useAuth.ts          # Authentication hook
│   └── useAssessment.ts    # Assessment hook
├── components/
│   ├── forms/
│   │   ├── LoginForm.tsx           # Login example
│   │   ├── ApiAcademicForm.tsx     # Academic form example
│   │   └── PreferencesForm.tsx     # Preferences form example
│   ├── assessment/
│   │   └── SkillsForm.tsx          # Skills assessment example
│   └── ...
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── ...
└── .env.local              # Environment variables
```

---

## 🚀 Quick Start

### 1. Install Dependencies (if needed)
```bash
npm install
```

### 2. Configure Environment
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Import and Use in Components

#### Example 1: Using Authentication Hook
```typescript
'use client';
import { useAuth } from '@/hooks/useAuth';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

#### Example 2: Using Assessment Hook
```typescript
'use client';
import { useAssessment } from '@/hooks/useAssessment';

export function MyAssessmentComponent() {
  const {
    academicData,
    loadingAcademic,
    errorAcademic,
    submitAcademic,
    fetchAcademic,
  } = useAssessment();

  return (
    <div>
      {/* Your component code */}
    </div>
  );
}
```

#### Example 3: Using Generic API Hook
```typescript
'use client';
import { useApi } from '@/hooks/useApi';
import { api } from '@/services/api';

export function MyCustomComponent() {
  const { data, loading, error, call } = useApi();

  async function handleFetch() {
    await call(
      () => api.get('/some-endpoint'),
      (data) => console.log('Success:', data),
      (error) => console.error('Error:', error)
    );
  }

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

## 📚 API Services Reference

### Authentication Service (`services/auth.ts`)

```typescript
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
} from '@/services/auth';

// Login
const { access_token, user } = await loginUser({
  email: 'student@example.com',
  password: 'password123',
});

// Register
const result = await registerUser({
  email: 'newstudent@example.com',
  password: 'password123',
  name: 'John Doe',
});

// Get current user
const user = getCurrentUser(); // From localStorage

// Check if authenticated
const isAuth = isAuthenticated();

// Logout
logoutUser();
```

### Assessment Service (`services/assessment.ts`)

```typescript
import {
  submitAcademicData,
  submitSkillRatings,
  submitInterestResponses,
  submitPreferences,
  generateCareerReport,
  getAcademicData,
  getSkillRatings,
  getPreferences,
  getCareerReport,
} from '@/services/assessment';

// Submit academic data
await submitAcademicData({
  stream: 'Science',
  current_class: 12,
  gpa: 8.5,
  result: 'Pass',
  strong_subject: 'Physics',
  weak_subject: 'Biology',
});

// Submit skills
await submitSkillRatings({
  logical_reasoning: 9,
  communication: 8,
  analytical_thinking: 9,
  problem_solving: 8,
  teamwork: 7,
  leadership: 7,
  creativity: 8,
  time_management: 8,
});

// Submit interests
await submitInterestResponses([
  {
    question_id: 'q1',
    selected_option: 'Option A',
    category: 'Technology',
  },
]);

// Generate report
const report = await generateCareerReport();
console.log(report.top_careers);
```

### Student Service (`services/student.ts`)

```typescript
import {
  createStudentInfo,
  getStudentProfile,
  getCurrentStudentInfo,
  updateStudentInfo,
} from '@/services/student';

// Create student info
await createStudentInfo({
  name: 'John Doe',
  phone: '9876543210',
  date_of_birth: '2006-05-15',
  state: 'Maharashtra',
  board: 'CBSE',
});

// Get current student
const info = await getCurrentStudentInfo();

// Update student info
await updateStudentInfo({
  phone: '9876543211',
});
```

---

## 🪝 Hooks Reference

### useAuth Hook
```typescript
const {
  user,              // Current user object or null
  isLoading,         // Loading state
  isAuthenticated,   // Boolean
  error,             // Error message or null
  login,             // (credentials) => Promise<void>
  register,          // (data) => Promise<void>
  logout,            // () => void
  refreshUser,       // () => Promise<void>
} = useAuth();
```

### useAssessment Hook
```typescript
const {
  // Data states
  academicData,
  skillRatings,
  interestResponses,
  preferences,
  careerReport,
  
  // Loading states
  loadingAcademic,
  loadingSkills,
  loadingInterests,
  loadingPreferences,
  loadingReport,
  
  // Error states
  errorAcademic,
  errorSkills,
  errorInterests,
  errorPreferences,
  errorReport,
  
  // Functions
  submitAcademic,
  fetchAcademic,
  submitSkills,
  fetchSkills,
  submitInterests,
  fetchInterests,
  submitPrefs,
  fetchPrefs,
  generateReport,
  fetchReport,
} = useAssessment();
```

### useApi Hook
```typescript
const {
  data,   // API response data
  loading,// Loading state
  error,  // Error message
  call,   // (apiFunction, onSuccess?, onError?) => Promise
  reset,  // () => void - Clear state
} = useApi<T>();
```

---

## 🔐 Error Handling

All API errors throw `ApiError` with status code and message:

```typescript
import { ApiError } from '@/services/api';

try {
  await loginUser({ email, password });
} catch (err) {
  if (err instanceof ApiError) {
    console.error(`Error ${err.status}: ${err.message}`);
  }
}
```

Common error handling pattern with hooks:

```typescript
const { user, error, login } = useAuth();

try {
  await login(credentials);
} catch (err) {
  // Error is also available in the `error` state
  console.error('Login failed:', error);
}
```

---

## 📋 Complete Page Example

```typescript
// app/assessment/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAssessment } from '@/hooks/useAssessment';
import { AcademicForm } from '@/components/forms/ApiAcademicForm';
import { SkillsForm } from '@/components/assessment/SkillsForm';
import { PreferencesForm } from '@/components/forms/PreferencesForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { careerReport, generateReport } = useAssessment();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Career Assessment</h1>

      <AcademicForm />
      <SkillsForm />
      <PreferencesForm />

      <button
        onClick={() => generateReport()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Report
      </button>

      {careerReport && (
        <div>
          <h2 className="text-2xl font-bold">Your Career Recommendations</h2>
          {careerReport.top_careers.map((career) => (
            <div key={career.id} className="border p-4 rounded mt-4">
              <h3 className="text-lg font-semibold">{career.name}</h3>
              <p>Match: {career.match_percentage}%</p>
              <p>Salary: {career.salary.min}L - {career.salary.max}L</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🧪 Testing API Calls

### Using Postman
1. Open Postman
2. Set base URL: `http://localhost:8000/api`
3. Add header: `Content-Type: application/json`
4. Add header: `Authorization: Bearer {token}` (after login)

### Using cURL
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","name":"John"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Submit academic data
curl -X POST http://localhost:8000/api/assessments/academic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"stream":"Science","current_class":12,"gpa":8.5,"result":"Pass"}'
```

---

## 🛠️ Troubleshooting

### Token not being sent
- Check `.env.local` has `NEXT_PUBLIC_API_URL` set
- Verify token is stored in localStorage
- Check browser DevTools Network tab for Authorization header

### 401 Unauthorized errors
- Token may be expired
- Try logging out and back in
- Check token is stored correctly: `localStorage.getItem('auth_token')`

### CORS errors
- Ensure backend has CORS enabled
- Check `CORS_ORIGINS` in backend `.env`
- Verify API URL is correct

### Components not updating
- Use `'use client'` directive in components
- Ensure hooks are called at component level
- Check for async/await issues in event handlers

---

## 📞 Next Steps

1. ✅ Run your backend: `python -m uvicorn main:app --reload`
2. ✅ Start Next.js dev server: `npm run dev`
3. ✅ Open browser: `http://localhost:3000`
4. ✅ Test login/registration flow
5. ✅ Test API integration with forms

---

## 📚 Additional Resources

- [API Documentation](./API_QUICK_REFERENCE.md)
- [Database Schema](./DATABASE_SETUP.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
