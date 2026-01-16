type TabButtonProps = {
  label: string;
  onClick: () => void;
  active: boolean;
};

export const TabButton = ({ label, onClick, active }: TabButtonProps) => {
  return (
    <button
       aria-label={label}
      onClick={onClick}
      className={`px-4 py-2 w-45 shadow-lg ${active ? 'activeTab' : 'tab'}`}
    >
      {label}
    </button>
  );
};
