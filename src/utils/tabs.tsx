/* eslint-disable react-refresh/only-export-components */
export const TAB_VALUES = ['ALL', 'ACTIVE', 'COMPLETED'] as const;
export type TabType = (typeof TAB_VALUES)[number];
type TabConfigKey = keyof typeof TAB_CONFIG;

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
  ALL: {
    label: 'All',
    getCount: ({ total }) => total,
    subtitle: ({ completed, total }) =>
      `Todos: ${completed}/${total} completed`,
  },
  ACTIVE: {
    label: 'Active',
    getCount: ({ active }) => active,
    subtitle: ({ active }) => `Active: ${active} remaining`,
  },
  COMPLETED: {
    label: 'Completed',
    getCount: ({ completed }) => completed,
    subtitle: ({ completed, total }) => `Completed: ${completed}/${total}`,
  },
};

export function getTab(
  key: TabConfigKey,
  count: {
    total: number;
    active: number;
    completed: number;
  },
) {
  const tabConfigKey = TAB_CONFIG[key];
  return {
    label: tabConfigKey.label,
    getCount: tabConfigKey.getCount(count),
    subTitle: tabConfigKey.subtitle(count),
  };
}
