import type { Metadata } from 'next';
import '@css/global.css';


export const metadata: Metadata = {
  title: 'Break Timer',
  description: 'Set a break timer with a random duration!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
};