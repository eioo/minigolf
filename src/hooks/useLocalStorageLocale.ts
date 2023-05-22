import { useEffect } from 'react';
import { useT } from 'talkr';

/**
 * Reads local storage and sets locale if it's saved.
 */
export function useLocalStorageLocale() {
  const { setLocale } = useT();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');

    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);
}
