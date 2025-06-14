'use client';

import { ThemeProvider } from 'next-themes';

export function NoFlashThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme"
      enableColorScheme={true}
    >
      {children}
    </ThemeProvider>
  );
}