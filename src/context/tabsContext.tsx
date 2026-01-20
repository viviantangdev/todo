/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { TAB_VALUES, type TabType } from '../utils/constants/tabs';

export interface TabItem {
  title: TabType;
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
  const tabs: TabItem[] = TAB_VALUES.map((title) => ({ title }));
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const updateActiveTab = (type: TabType) => {
    setActiveTab(type);
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTab, updateActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};
