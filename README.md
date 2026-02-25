# CareerGuide AI - Student Career Guidance Platform

A production-ready frontend application for an AI-based career guidance platform tailored for Indian students (10th, 11th, 12th grades). This platform helps students discover their perfect career path through intelligent assessment and personalized recommendations.

## 🚀 Features

- **Multi-Step Career Assessment**: Comprehensive 6-step assessment covering academics, interests, skills, and preferences
- **AI-Powered Career Recommendations**: Intelligent matching algorithm suggesting top career paths
- **Detailed Career Reports**: In-depth reports with salary projections, employer information, and career roadmaps
- **College Suggestions**: Personalized college recommendations based on career interests
- **Dark/Light Mode**: Full theme support with system preference detection
- **Responsive Design**: Mobile-first approach working seamlessly on all devices
- **Real-time Form Validation**: Type-safe forms with Zod validation
- **Smooth Animations**: Beautiful transitions using Framer Motion
- **Local Persistence**: Assessment data saved to localStorage for recovery

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui inspired custom components
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Auth group layout
│   │   ├── login/page.tsx         # Login page
│   │   └── register/page.tsx      # Registration page
│   ├── assessment/                # Assessment flow
│   │   ├── start/page.tsx         # Assessment introduction
│   │   ├── academic/page.tsx      # Academic marks input
│   │   ├── interests/page.tsx     # Interest questions
│   │   ├── skills/page.tsx        # Skills rating
│   │   ├── preferences/page.tsx   # Career preferences
│   │   └── review/page.tsx        # Review before submit
│   ├── dashboard/page.tsx         # Main dashboard
│   ├── report/page.tsx            # Career report display
│   ├── profile/page.tsx           # User profile
│   ├── settings/page.tsx          # Settings page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Global styles
│
├── components/
│   ├── ui/                        # Basic UI components
│   │   ├── Button.tsx             # Button component
│   │   ├── Input.tsx              # Text input
│   │   ├── Card.tsx               # Card container
│   │   ├── Badge.tsx              # Badge & Label & Select
│   │   ├── Checkbox.tsx           # Checkbox, Radio, RadioGroup
│   │   └── Slider.tsx             # Range slider
│   ├── layout/                    # Layout components
│   │   ├── Navbar.tsx             # Navigation bar
│   │   └── ThemeProvider.tsx      # Theme provider
│   ├── assessment/                # Assessment components
│   │   ├── Stepper.tsx            # Progress stepper
│   │   └── QuestionCard.tsx       # Question display
│   └── report/                    # Report components
│
├── stores/                        # Zustand stores
│   ├── assessmentStore.ts         # Assessment state & actions
│   └── themeStore.ts              # Theme state & actions
│
├── types/                         # TypeScript interfaces
│   └── index.ts                   # All type definitions
│
├── lib/                           # Utility functions
│   ├── schemas.ts                 # Zod validation schemas
│   ├── utils.ts                   # Helper functions
│   └── cn.ts                      # Class name merger
│
├── constants/                     # Mock data & constants
│   └── mockData.ts                # Career data, questions, colleges
│
├── hooks/                         # Custom hooks (if needed)
│
└── public/                        # Static assets

```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

4. **Run Type Check**
   ```bash
   npm run type-check
   ```

5. **Format Code**
   ```bash
   npm run format
   ```

## 📖 Usage Guide

### User Flow

1. **Landing Page** (`/`)
   - Overview of the platform
   - Sign up / Login CTA

2. **Authentication** (`/auth/login`, `/auth/register`)
   - Mock authentication with localStorage
   - Form validation with Zod

3. **Dashboard** (`/dashboard`)
   - Assessment progress tracking
   - Career report summary
   - Quick access to assessment

4. **Assessment Flow** (`/assessment/*`)
   - **Step 1 - Academic**: Enter stream, class, subject marks
   - **Step 2 - Interests**: Answer 10 interest questions
   - **Step 3 - Skills**: Rate 8 professional skills (1-10)
   - **Step 4 - Preferences**: Specify job preferences and goals
   - **Step 5 - Review**: Review all answers before submission
   - **Step 6 - Report**: View personalized career report

5. **Career Report** (`/report`)
   - Top 5 personalized career matches
   - Salary predictions graph
   - College suggestions
   - Career roadmap
   - Backup options

6. **Settings** (`/settings`)
   - Theme customization
   - Account management
   - Logout

## 🎨 Customization

### Colors & Theme
Edit `src/app/globals.css` for CSS variables:
```css
:root {
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  /* ... other colors ... */
}
```

### Career Data
Update mock careers in `src/constants/mockData.ts`:
```typescript
export const MOCK_CAREERS: CareerMatch[] = [
  // Add your career data
];
```

### Assessment Questions
Add or modify questions in `src/constants/mockData.ts`:
```typescript
export const MOCK_INTEREST_QUESTIONS: InterestQuestion[] = [
  // Customize questions
];
```

## 📊 Mock Data Features

- **500+ Career options** with detailed information
- **15 Interest questions** covering various domains
- **8 Professional skills** for rating
- **30+ Colleges** with placement data
- **Salary progression** over 10 years
- **Career roadmaps** with timelines and milestones
- **State-based college data** for Indian education system

## 🔐 Authentication

Currently uses **mock authentication** with localStorage:
- Email/Password validation
- Session persistence
- Auto-redirect based on auth status
- Can be easily replaced with real API integration

## 💾 State Management

**Zustand Stores**:
- `assessmentStore`: Manages all assessment data with localStorage persistence
- `themeStore`: Manages dark/light mode preference

**Data Structure**:
```typescript
AssessmentStore {
  studentInfo: StudentInfo
  academicData: AcademicData
  interests: InterestResponse[]
  skills: SkillRating
  preferences: Preferences
  currentStep: number
  completedSteps: number[]
  assessmentComplete: boolean
  careerReport: CareerReport
}
```

## 🎯 Key Components

### Assessment Components
- `Stepper`: Progress indicator for multi-step form
- `QuestionCard`: Single question display with options
- `MultiSelectQuestionCard`: Multiple choice question

### UI Components
- `Button`: Variants (default, secondary, outline, ghost, destructive, gradient)
- `Input`: Text input with validation error display
- `Card`: Container with elevation and glass effect variants
- `Badge`: Tag display with multiple color variants
- `Slider`: Range input for numeric ratings
- `Checkbox/Radio`: Form controls
- `RadioGroup`: Radio button group with descriptions

### Layout Components
- `Navbar`: Navigation with theme toggle
- `ThemeProvider`: Theme context provider

## 🔄 Form Validation

All forms use Zod schemas for type-safe validation:
```typescript
// Example from src/lib/schemas.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

## 🌍 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly UI elements
- Hamburger menu on mobile

## ♿ Accessibility

- ARIA labels where needed
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast compliance
- Form error messages

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Performance Optimizations

- Code splitting with Next.js App Router
- Lazy loading of components
- Image optimization
- CSS optimization with Tailwind
- Memoization with React.memo
- Zustand for efficient state updates

## 📝 Development Tips

1. **Add New Routes**: Create folders in `src/app` following Next.js conventions
2. **Add New Components**: Create in `src/components` with proper exports
3. **Add Validation**: Define schemas in `src/lib/schemas.ts` then use with `useForm`
4. **Add Mock Data**: Update `src/constants/mockData.ts`
5. **Update Types**: Add to `src/types/index.ts`

## 🐛 Troubleshooting

### State Not Persisting
- Check browser's localStorage is enabled
- Clear localStorage and restart: `localStorage.clear()`
- Verify Zustand persist middleware configuration

### Theme Not Changing
- Ensure `ThemeProvider` wraps your app
- Check browser's dark mode preferences
- Verify CSS variables are applied

### Forms Not Validating
- Check schema matches form data structure
- Verify `resolver` is properly passed to `useForm`
- Check browser console for validation errors

## 🔄 Future Enhancements

- [ ] Real backend API integration
- [ ] User authentication with OAuth
- [ ] Save and download PDF reports
- [ ] Social sharing of results
- [ ] Career counselor chat
- [ ] Job listings integration
- [ ] Course recommendations
- [ ] Blog & career articles
- [ ] Admin dashboard
- [ ] Analytics & insights

## 📄 License

This project is designed for educational purposes.

## 🤝 Contributing

This is a learning/portfolio project. Contributions welcome for improvements!

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for Indian Students | CareerGuide AI Platform**
