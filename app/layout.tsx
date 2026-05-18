import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Холбооны дурлалын товчоо',
  description: 'An animated FBI parody date invite site.',
  icons: {
    icon: '/badge.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
