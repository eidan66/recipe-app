'use client';

import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';

import client from '@/lib/apolloClient';
import Header from '@/components/Header';
import theme from '@/styles/theme';

import StyledComponentsRegistry from './styles/StyledComponentsRegistry';
import './styles/globals.css';
import Footer from './footer/page';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <StyledComponentsRegistry>
              <div className="page-container">
                <Header />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
                <div className="content">{children}</div>
                <Footer />
              </div>
            </StyledComponentsRegistry>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
