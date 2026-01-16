/* eslint-disable react-refresh/only-export-components */
export const TAB_VALUES = ['All', 'Active', 'Completed'] as const;
export type TabType = (typeof TAB_VALUES)[number];

export const TAB_CONFIG: Record<
  TabType,
  {
    label: string;
    getCount: (counts: {
      total: number;
      active: number;
      completed: number;
    }) => number;
    subtitle: (counts: {
      total: number;
      active: number;
      completed: number;
    }) => string;
  }
> = {
  All: {
    label: 'All',
    getCount: ({ total }) => total,
    subtitle: ({ completed, total }) =>
      `Todos: ${completed}/${total} completed`,
  },
  Active: {
    label: 'All',
    getCount: ({ active }) => active,
    subtitle: ({ active }) => `Active: ${active} remaining`,
  },
  Completed: {
    label: 'All',
    getCount: ({ completed }) => completed,
    subtitle: ({ completed, total }) => `Completed: ${completed}/${total}`,
  },
};
