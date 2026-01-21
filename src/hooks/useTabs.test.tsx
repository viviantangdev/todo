import { renderHook } from '@testing-library/react';
import { TabsProvider } from '../context/tabsContext';
import { useTabs } from './useTabs';

describe('useTabs', () => {
  it('should throw error when used outside TabsProvider', () => {
    expect(() => renderHook(() => useTabs())).toThrowError(
      'useTabs must be used within a TabsProvider',
    );
  });

  it('should return context when used inside TodosProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TabsProvider>{children}</TabsProvider>
    );
    const { result } = renderHook(() => useTabs(), { wrapper });

    expect(result.current).toHaveProperty('tabs');
    expect(result.current).toHaveProperty('activeTab');
    expect(result.current).toHaveProperty('updateActiveTab');
  });
});
