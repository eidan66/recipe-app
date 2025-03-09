'use client';

import { ThemeProvider } from 'styled-components';

import Header from '@/components/Header';
import theme from '@/styles/theme';

import StyledComponentsRegistry from './styles/StyledComponentsRegistry';
import './styles/globals.css';
import Footer from './footer/page';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <div className="page-container">
              <Header />
              <div className="content">{children}</div>
              <Footer />
            </div>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
