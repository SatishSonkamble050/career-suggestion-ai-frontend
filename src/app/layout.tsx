import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerGuide AI - Student Career Guidance Platform',
  description:
    'AI-powered career guidance platform for Indian students. Get personalized career recommendations based on your academic performance, interests, and skills.',
  keywords: [
    'career guidance',
    'student assessment',
    'AI career recommendation',
    'career counseling',
    'education',
  ],
  authors: [{ name: 'CareerGuide AI' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://careerguide-ai.com',
    siteName: 'CareerGuide AI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            theme="system"
            richColors
            closeButton
            duration={5000}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
