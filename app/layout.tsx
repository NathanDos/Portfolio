import './globals.css';
import { ThemeProvider } from '@/components/provider/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scrollbar-none'>
      <body className='bg-white text-black dark:bg-black dark:text-white'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
