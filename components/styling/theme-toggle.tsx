'use client';
//node_modules
import { Switch } from '@headlessui/react';
//Custom Theme Provider Component
import { useTheme } from '../provider/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === 'dark'}
      onClick={() =>
        setTheme(
          theme === 'light' ? 'dark' : theme === 'dark' ? 'light' : 'dark',
        )
      }
      className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600'
    >
      <span className='size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6' />
    </Switch>
  );
}
