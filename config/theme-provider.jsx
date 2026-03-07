'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark']}
      suppressHydrationWarning
    >
      {children}
    </NextThemesProvider>
  );
}
