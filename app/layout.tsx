import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Reown AI · A second life for your things', description: 'Local personal inventory and resale assistant MVP' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
