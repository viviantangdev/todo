import { CircleCheckBig, Edit, Trash2 } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { getToastMessage } from './toastMessages';

describe('getToastMessage', () => {
  it('should return ADD toastType with correct content', () => {
    const result = getToastMessage('ADD', 'New todo');
    expect(result.text).toBe('Added: New todo');
    expect(result.Icon).toBe(CircleCheckBig);
  });
  it('should return EDIT toastType with correct content', () => {
    const result = getToastMessage('EDIT', 'Edited todo');
    expect(result.text).toBe('Edited: Edited todo');
    expect(result.Icon).toBe(Edit);
  });
  it('should return DELETE toastType with correct content', () => {
    const result = getToastMessage('DELETE', 'Deleted todo');
    expect(result.text).toBe('Deleted: Deleted todo');
    expect(result.Icon).toBe(Trash2);
  });
});
