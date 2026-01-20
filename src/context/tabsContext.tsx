/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { TAB_CONFIG, TAB_VALUES, type TabType } from '../utils/tabs';

export interface TabItem {
  tabType: TabType;
  label: string;
}

type TabsContextType = {
  tabs: TabItem[];
  activeTab: TabType;
  updateActiveTab: (type: TabType) => void;
};

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined,
);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const tabs: TabItem[] = TAB_VALUES.map((tabType) => ({
    tabType,
    label: TAB_CONFIG[tabType].label,
  }));
  const [activeTab, setActiveTab] = useState<TabType>('ALL');

  const updateActiveTab = (type: TabType) => {
    setActiveTab(type);
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTab, updateActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};
