import { useTabs } from '../../hooks/useTabs';
import { getTab } from '../../utils/tabs';
import { TabButton } from './TabButton';

type TodoTabsProps = {
  counts: {
    total: number;
    active: number;
    completed: number;
  };
};

export const TodoTabs = ({ counts }: TodoTabsProps) => {
  const { tabs, activeTab, updateActiveTab } = useTabs();

  return (
    <div className='flex flex-wrap gap-2'>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.tabType;
        const { getCount } = getTab(tab.tabType, counts);

        return (
          <TabButton
            key={tab.tabType}
            label={`${tab.label} (${getCount})`}
            active={isActive}
            onClick={() => updateActiveTab(tab.tabType)}
          />
        );
      })}
    </div>
  );
};
