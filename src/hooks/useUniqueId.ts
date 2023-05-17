import { useId } from 'react';

export function useUniqueId(prefix?: string) {
  const id = useId();
  const sanitizedId = id.replace(/:/g, '');
  return prefix ? `${prefix}-${sanitizedId}` : sanitizedId;
}
