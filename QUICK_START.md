# API Integration Checklist & Quick Start

## ✅ Setup Checklist

Before you start using the API integration, ensure all these are completed:

### 1. Environment Setup
- [ ] `.env.local` file created with `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- [ ] Backend server running at `http://localhost:8000`
- [ ] Frontend running with `npm run dev`

### 2. Files Created
- [ ] `src/services/api.ts` - Core API client
- [ ] `src/services/auth.ts` - Authentication service
- [ ] `src/services/assessment.ts` - Assessment service
- [ ] `src/services/student.ts` - Student service
- [ ] `src/services/index.ts` - Service exports
- [ ] `src/hooks/useApi.ts` - Generic API hook
- [ ] `src/hooks/useAuth.ts` - Auth hook
- [ ] `src/hooks/useAssessment.ts` - Assessment hook
- [ ] `src/hooks/index.ts` - Hook exports
- [ ] Example components created

### 3. Documentation Ready
- [ ] `API_QUICK_REFERENCE.md` - API endpoints reference
- [ ] `API_INTEGRATION_GUIDE.md` - Complete integration guide
- [ ] `INTEGRATION_SUMMARY.md` - Files overview
- [ ] `DATABASE_SETUP.md` - Database schema

---

## 🚀 Quick Start (5 Steps)

### Step 1: Start Backend
```bash
# In your backend directory
python -m uvicorn main:app --reload
# Should see: Uvicorn running on http://127.0.0.1:8000
```

### Step 2: Start Frontend
```bash
# In your Next.js project
npm run dev
# Should see: ▲ Next.js started on localhost:3000
```

### Step 3: Test Health Check
```bash
# In browser or terminal, visit:
curl http://localhost:8000/api/health

# Or visit in browser:
http://localhost:8000/docs  # Swagger UI
```

### Step 4: Create a Test Component
```typescript
// app/test/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';

export default function TestPage() {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div>
      <h1>API Integration Test</h1>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      {user && <p>User: {user.name}</p>}
    </div>
  );
}
```

### Step 5: Run Your App
```bash
# Visit in browser:
http://localhost:3000/test

# Should show: "Authenticated: No" initially
```

---

## 📚 Common Tasks

### Task 1: Authentication Flow
```typescript
// Login user
import { useAuth } from '@/hooks/useAuth';

const { login, user } = useAuth();

await login({ 
  email: 'student@example.com', 
  password: 'password123' 
});

// User is now logged in and token is stored
```

### Task 2: Submit Assessment Data
```typescript
import { useAssessment } from '@/hooks/useAssessment';

const { submitAcademic } = useAssessment();

await submitAcademic({
  stream: 'Science',
  current_class: 12,
  gpa: 8.5,
  result: 'Pass',
  strong_subject: 'Physics',
  weak_subject: 'Biology',
});
```

### Task 3: Generate Report
```typescript
const { generateReport, careerReport } = useAssessment();

await generateReport();

// careerReport now contains:
// - top_careers (array of career matches)
// - colleges (recommended colleges)
// - roadmap (learning path)
// - salary_prediction (salary forecast)
```

### Task 4: Handle Errors
```typescript
try {
  await loginUser({ email: 'test@example.com', password: 'wrong' });
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Error ${error.status}: ${error.message}`);
  }
}
```

---

## 🐛 Troubleshooting

### Problem: "API is not responding"
```
✅ Solution:
1. Check backend is running: http://localhost:8000/docs
2. Check .env.local has NEXT_PUBLIC_API_URL set
3. Check no firewall blocking port 8000
```

### Problem: "401 Unauthorized"
```
✅ Solution:
1. Token may be expired, logout and login again
2. Check token is stored: localStorage.getItem('auth_token')
3. Verify backend JWT_SECRET matches
```

### Problem: "CORS error"
```
✅ Solution:
1. Check backend CORS_ORIGINS includes http://localhost:3000
2. Verify backend is sending correct CORS headers
3. Check browser console for exact error
```

### Problem: "Components not updating"
```
✅ Solution:
1. Add 'use client' directive at top of component
2. Ensure hooks are called at component level
3. Check for async/await issues
```

---

## 🧪 Testing Tools

### Test 1: Login Flow
```bash
# 1. Register user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123",
    "name":"Test User"
  }'

# 2. Copy the access_token from response

# 3. Use token to call protected endpoint
curl -X GET http://localhost:8000/api/users/me \
  -H "Authorization: Bearer {access_token}"
```

### Test 2: Using Swagger UI
```
1. Visit: http://localhost:8000/docs
2. Click "Authorize" button
3. Paste your token
4. Try endpoints from the UI
```

### Test 3: Using Postman
```
1. Import API collection from Swagger
2. Set variable: {{NEXT_PUBLIC_API_URL}} = http://localhost:8000/api
3. Set variable: {{token}} from login response
4. Use in requests: Authorization header = Bearer {{token}}
```

---

## 📱 Component Usage Examples

### Example 1: Simple Login Page
```typescript
// app/login/page.tsx
'use client';
import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}
```

### Example 2: Academic Form Page
```typescript
// app/assessment/academic/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';
import { AcademicForm } from '@/components/forms/ApiAcademicForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AcademicPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Academic Information</h1>
      <AcademicForm />
    </div>
  );
}
```

### Example 3: Dashboard with Multiple Forms
```typescript
// app/assessment/page.tsx
'use client';
import { AcademicForm } from '@/components/forms/ApiAcademicForm';
import { SkillsForm } from '@/components/assessment/SkillsForm';
import { PreferencesForm } from '@/components/forms/PreferencesForm';
import { useAssessment } from '@/hooks/useAssessment';
import { Button } from '@/components/ui/Button';

export default function AssessmentPage() {
  const { generateReport, loadingReport } = useAssessment();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Complete Your Assessment</h1>
      
      <AcademicForm />
      <SkillsForm />
      <PreferencesForm />
      
      <Button 
        onClick={() => generateReport()}
        disabled={loadingReport}
        className="w-full"
      >
        {loadingReport ? 'Generating Report...' : 'Generate My Report'}
      </Button>
    </div>
  );
}
```

---

## 🎯 Success Criteria

You'll know everything is working when:

- ✅ Frontend loads without errors
- ✅ Can see "Authenticated: No" on initial visit
- ✅ Login form works and redirects to dashboard
- ✅ Can submit academic data (see success toast)
- ✅ Can submit skills and preferences
- ✅ Can generate career report
- ✅ Report displays career recommendations
- ✅ No CORS or authorization errors in console

---

## 📞 Support Resources

### Docs in This Project
1. **API_INTEGRATION_GUIDE.md** - Complete integration reference
2. **API_QUICK_REFERENCE.md** - Quick endpoint reference
3. **DATABASE_SETUP.md** - Database schema
4. **INTEGRATION_SUMMARY.md** - Files overview

### External Resources
1. [Next.js Documentation](https://nextjs.org/docs)
2. [React Hooks Guide](https://react.dev/reference/react)
3. [TypeScript Handbook](https://www.typescriptlang.org/docs/)
4. [Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## ✨ You're All Set!

Everything is ready. The API integration is complete with:
- ✅ 4 services (api, auth, assessment, student)
- ✅ 3 hooks (useApi, useAuth, useAssessment)
- ✅ 4 example components
- ✅ Complete documentation
- ✅ Error handling built-in
- ✅ TypeScript support

**Start building your assessment features! 🚀**

Execute: `npm run dev` and visit `http://localhost:3000`
