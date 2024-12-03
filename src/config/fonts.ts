import { Fira_Code as FontMono, Nunito as FontNunito } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = FontNunito({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const geistMono = localFont({
  src: '../../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
