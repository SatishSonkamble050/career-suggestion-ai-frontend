import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-purple-600/5">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
