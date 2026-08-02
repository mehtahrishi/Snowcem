import React from 'react';

export const metadata = {
  title: 'Snowcem Admin Panel | Paint Management System',
  description: 'Admin management dashboard for Snowcem Paints.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      {children}
    </div>
  );
}
