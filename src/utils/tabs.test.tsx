import { describe, expect, it } from 'vitest';
import { getTab } from './tabs';

describe('getTab', () => {

  it('Should return ALL tab label with correct count and subtitle', () => {
    const result = getTab('ALL', { total: 10, active: 3, completed: 2 });
    expect(result.label).toBe('All');
    expect(result.subTitle).toBe('Todos: 2/10 completed');
  });

  it('Should return ACTIVE tab label with correct count and subtitle', () => {
    const result = getTab('ACTIVE', { total: 10, active: 3, completed: 2 });
    expect(result.label).toBe('Active');
    expect(result.subTitle).toBe('Active: 3 remaining');
  });
  
  it('Should return COMPLETED tab label with correct count and subtitle', () => {
    const result = getTab('COMPLETED', { total: 10, active: 3, completed: 2 });
    expect(result.label).toBe('Completed');
    expect(result.subTitle).toBe('Completed: 2/10');
  });
});
